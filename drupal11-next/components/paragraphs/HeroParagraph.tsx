import { DrupalHeroParagraph } from "@/types"
import { absoluteUrl } from "@/lib/utils"
import Image from "next/image"

interface HeroParagraphProps {
  paragraph: DrupalHeroParagraph
}

export default function HeroParagraph({ paragraph }: HeroParagraphProps) {
  const { field_background, field_title, field_body, field_cta } = paragraph

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center py-16 px-4 md:px-8 mb-2"
      style={{ minHeight: "400px" }}
    >
      {field_background?.field_media_image?.uri?.url && (
        <Image
          src={absoluteUrl(field_background?.field_media_image?.uri?.url)}
          width={field_background?.field_media_image?.resourceIdObjMeta?.width}
          height={
            field_background?.field_media_image?.resourceIdObjMeta?.height
          }
          alt={
            field_background?.field_media_image?.resourceIdObjMeta?.alt || ""
          }
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
        />
      )}
      <div className="relative z-10 max-w-2xl mx-auto">
        {field_title && (
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            {field_title}
          </h1>
        )}
        {field_body?.processed && (
          <div
            className="mb-6 text-lg md:text-xl text-white drop-shadow-lg"
            dangerouslySetInnerHTML={{ __html: field_body.processed }}
          />
        )}
        {field_cta?.uri && (
          <a
            href={field_cta.uri}
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
          >
            {field_cta.title || "Learn more"}
          </a>
        )}
      </div>
    </section>
  )
}
