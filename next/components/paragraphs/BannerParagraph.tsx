import { DrupalBannerParagraph } from "@/types"

type BannerParagraphProps = {
  paragraph: DrupalBannerParagraph
}

export default function BannerParagraph({ paragraph }: BannerParagraphProps) {
  const styleMap: Record<string, string> = {
    red: "bg-red-600 text-white",
    green: "bg-green-600 text-white",
    blue: "bg-blue-600 text-white",
  }
  const styleClass = styleMap[paragraph.field_style] || "bg-gray-200"

  return (
    <section className={`rounded-lg shadow ${styleClass}`}>
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-3/4 w-full p-8">
          {paragraph.field_title && (
            <h2 className="text-2xl font-bold mb-4">{paragraph.field_title}</h2>
          )}
          {paragraph.field_body?.processed && (
            <div
              className="mb-6 text-lg"
              dangerouslySetInnerHTML={{
                __html: paragraph.field_body.processed,
              }}
            />
          )}
        </div>
        <div className="md:w-1/4 w-full flex items-center justify-center p-8">
          {paragraph.field_cta?.uri && (
            <a
              href={paragraph.field_cta.uri}
              className="inline-block px-6 py-3 bg-white text-black font-semibold rounded shadow hover:bg-opacity-80 transition"
            >
              {paragraph.field_cta.title || "Learn more"}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
