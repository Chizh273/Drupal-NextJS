import { JsonApiParams } from "next-drupal"

import ParagraphsPage, {
  params as paragraphsPageParams,
} from "@/components/nodes/ParagraphsPage"
import BasicPage, {
  params as basicPageParams,
} from "@/components/nodes/BasicPage"
import Article, { params as articleParams } from "@/components/nodes/Article"
import { NodeFullPageProps } from "@/components/nodes/types"

type MappingEntry = {
  Component: React.ComponentType<NodeFullPageProps>
  params: JsonApiParams
}

const mapping = new Map<string, MappingEntry>([
  ["node--page", { Component: BasicPage, params: basicPageParams }],
  ["node--article", { Component: Article, params: articleParams }],
  [
    "node--paragraphs_page",
    { Component: ParagraphsPage, params: paragraphsPageParams },
  ],
])

export function resolver(type: string) {
  if (mapping.has(type)) {
    return mapping.get(type) as MappingEntry
  } else {
    throw new Error("Unknown resource type: " + type)
  }
}

export const RESOURCE_TYPES = mapping.keys().toArray()
