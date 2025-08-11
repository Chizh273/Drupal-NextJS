import Image from "next/image"

import { DrupalTextAndMediaParagraph } from "@/types"
import { Link } from "@/components/navigation/Link"
import { absoluteUrl } from "@/lib/utils"

type TextAndMediaParagraph = {
  paragraph: DrupalTextAndMediaParagraph
}
export default function TextAndMediaParagraph({
  paragraph,
}: TextAndMediaParagraph) {
  const { field_image, field_title, field_body, field_cta } = paragraph

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div>
        {field_image?.field_media_image?.uri?.url && (
          <Image
            src={absoluteUrl(field_image?.field_media_image?.uri?.url)}
            width={field_image?.field_media_image?.resourceIdObjMeta?.width}
            height={field_image?.field_media_image?.resourceIdObjMeta?.height}
            alt={field_image?.field_media_image?.resourceIdObjMeta?.alt || ""}
            className="w-full h-auto rounded"
          />
        )}
      </div>
      <div>
        {field_title && (
          <h2 className="text-xl font-bold mb-2">{field_title}</h2>
        )}
        {field_body.processed && (
          <div
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: field_body.processed }}
          />
        )}
        {field_cta?.uri && (
          <Link
            href={field_cta?.uri}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {field_cta.title || "Read more"}
          </Link>
        )}
      </div>
    </div>
  )
}
