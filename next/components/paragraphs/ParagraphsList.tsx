import TextAndMediaParagraph from "@/components/paragraphs/TextAndMediaParagraph"
import BannerParagraph from "@/components/paragraphs/BannerParagraph"
import HeroParagraph from "@/components/paragraphs/HeroParagraph"
import {
  DrupalBannerParagraph,
  DrupalHeroParagraph,
  DrupalTextAndMediaParagraph,
} from "@/types"

export type ParagraphsListProps = {
  paragraphs: (
    | DrupalHeroParagraph
    | DrupalTextAndMediaParagraph
    | DrupalBannerParagraph
  )[]
}

export function ParagraphsList({ paragraphs }: ParagraphsListProps) {
  return (
    <>
      {paragraphs.map((paragraph) => {
        switch (paragraph.type) {
          case "paragraph--hero":
            return (
              <HeroParagraph
                key={paragraph.id}
                paragraph={paragraph as DrupalHeroParagraph}
              />
            )
          case "paragraph--text_media":
            return (
              <TextAndMediaParagraph
                key={paragraph.id}
                paragraph={paragraph as DrupalTextAndMediaParagraph}
              />
            )
          case "paragraph--banner":
            return (
              <BannerParagraph
                key={paragraph.id}
                paragraph={paragraph as DrupalBannerParagraph}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}
