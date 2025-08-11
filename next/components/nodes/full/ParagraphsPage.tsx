import type { JsonApiParams } from "next-drupal"

import { ParagraphsList } from "@/components/paragraphs/ParagraphsList"
import { NodeFullPageProps } from "@/components/nodes/full/types"

export const params: JsonApiParams = {
  include: [
    "field_paragraphs",
    "field_paragraphs.field_image.field_media_image",
    "field_paragraphs.field_background.field_media_image",
  ].join(","),
}

export default function ParagraphsPage({ node }: NodeFullPageProps) {
  return <ParagraphsList paragraphs={node.field_paragraphs} />
}
