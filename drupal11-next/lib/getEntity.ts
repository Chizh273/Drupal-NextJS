import { JsonApiParams, JsonApiResource } from "next-drupal"
import { getDraftData } from "next-drupal/draft"
import { drupal } from "@/lib/drupal"

export async function getEntityByPath<T extends JsonApiResource>(
  path: string,
  params: JsonApiParams = {}
): Promise<T> {
  const draftData = await getDraftData()
  if (draftData.path === path) {
    params.resourceVersion = draftData.resourceVersion
  }

  // Translating the path also allows us to discover the entity type.
  const translatedPath = await drupal.translatePath(path)
  if (!translatedPath) {
    throw new Error("Resource not found", { cause: "NotFound" })
  }

  const type = translatedPath.jsonapi?.resourceName!
  const uuid = translatedPath.entity.uuid
  const tag = `${translatedPath.entity.type}:${translatedPath.entity.id}`

  if (type === "node--article") {
    params.include = "field_image,uid"
  }

  const resource = await drupal.getResource<T>(type, uuid, {
    params,
    cache: "force-cache",
    next: {
      revalidate: 3600,
      // Replace `revalidate` with `tags` if using tag based revalidation.
      // tags: [tag],
    },
  })

  if (!resource) {
    throw new Error(
      `Failed to fetch resource: ${translatedPath?.jsonapi?.individual}`,
      {
        cause: "DrupalError",
      }
    )
  }

  return resource
}
