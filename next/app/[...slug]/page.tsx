import type { DrupalNode } from "next-drupal"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"

import { getEntityByPathTranslation, translatePath } from "@/lib/getEntity"
import { resolver, RESOURCE_TYPES } from "@/components/nodes"
import {
  ParamsWithSlug,
  prepareGenerateMetadata,
  PropsWithSlug,
} from "@/lib/metatags"
import { drupal } from "@/lib/drupal"

type NodePageProps = PropsWithSlug & {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const generateMetadata = prepareGenerateMetadata<DrupalNode>(
  async ({ title }) => ({ title })
)

export async function generateStaticParams(): Promise<ParamsWithSlug[]> {
  return drupal
    .getResourceCollectionPathSegments(RESOURCE_TYPES)
    .then((resources) =>
      resources.map((resource) => ({ slug: resource.segments }))
    )
}

export default async function NodePage(props: NodePageProps) {
  const { slug } = await props.params

  const draft = await draftMode()
  const isDraftMode = draft.isEnabled

  try {
    const path = `/${slug.join("/")}`
    const pathTranslation = await translatePath(path)
    const { Component, params } = resolver(
      pathTranslation.jsonapi?.resourceName as string
    )

    const node = await getEntityByPathTranslation<DrupalNode>(
      path,
      pathTranslation,
      params
    )

    if (!isDraftMode && node?.status === false) {
      notFound()
    }

    return <Component node={node} />
  } catch (e) {
    // If translatePath throws an error, tell Next.js the path is 404.
    notFound()
  }
}
