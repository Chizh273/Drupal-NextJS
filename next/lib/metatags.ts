import type { Metadata, ResolvingMetadata } from "next"

import { getEntityByPath, translatePath } from "@/lib/getEntity"
import { EntityWithMetatags } from "@/types"

export type ParamsWithSlug = {
  slug: string[]
}
export type PropsWithSlug = {
  params: Promise<ParamsWithSlug>
}

export async function prepareGenerateMetadata<T>(
  fallback: (entity: T) => Promise<Metadata>
) {
  return async function generateMetadata(
    props: PropsWithSlug,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    return props.params
      .then(({ slug }) =>
        Promise.all([
          Promise.resolve(`/${slug.join("/")}`),
          translatePath(`/${slug.join("/")}`),
        ])
      )
      .then(([path, translatePath]) =>
        getEntityByPath<EntityWithMetatags & T>(path, translatePath)
      )
      .then((entity) =>
        entity?.metadata
          ? entity?.metadata.reduce(
              (acc, metaItem) => ({
                ...acc,
                [metaItem.attribute.name]: metaItem.attribute.content,
              }),
              {} as Record<string, string>
            )
          : fallback(entity)
      )
      .catch(() => ({ title: "Drupal Entity" }))
  }
}
