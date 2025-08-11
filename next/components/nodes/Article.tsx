import type { JsonApiParams } from "next-drupal"
import Image from "next/image"

import { NodeFullPageProps } from "@/components/nodes/types"
import { absoluteUrl, formatDate } from "@/lib/utils"

export const params: JsonApiParams = {
  include: ["field_image", "field_tags", "uid"].join(","),
}

export default function Article({ node, ...props }: NodeFullPageProps) {
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_image && (
        <figure>
          <Image
            className="h-[400px] w-auto mx-auto my-0"
            src={absoluteUrl(node.field_image.uri.url)}
            width={768}
            height={400}
            alt={node.field_image.resourceIdObjMeta.alt || ""}
            priority
          />
          {node.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {node.body?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.body?.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
      {node.field_tags?.length > 0 && (
        <div className="mt-8">
          <h4 className="mb-2 text-lg font-semibold">Tags:</h4>
          <ul className="flex flex-wrap gap-2">
            {node.field_tags.map((tag: any) => (
              <li
                key={tag.id}
                className="px-3 py-1 bg-gray-100 rounded text-sm"
              >
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
