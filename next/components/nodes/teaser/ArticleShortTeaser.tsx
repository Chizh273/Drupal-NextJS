import type { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

import { Link } from "@/components/navigation/Link"
import { formatDate } from "@/lib/utils"

interface ArticleShortTeaserProps {
  node: DrupalNode
}

export function ArticleShortTeaser({
  node,
  ...props
}: ArticleShortTeaserProps) {
  return (
    <article {...props}>
      <Link
        href={node?.path?.alias}
        className="no-underline hover:text-blue-600"
      >
        <h2 className="mb-4 text-4xl font-bold">{node.title}</h2>
      </Link>
      {node.uid?.display_name ? (
        <div className="mb-4 text-gray-600">
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
          <span> - {formatDate(node.created)}</span>
        </div>
      ) : null}
      {node.field_tags?.length ? (
        <div className="mb-4 text-gray-600">
          <div className="mb-2 flex flex-wrap gap-2">
            {node.field_tags.map((tag: DrupalTaxonomyTerm) => (
              <Link
                key={tag.id}
                href={tag.path?.alias || "#"}
                className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs hover:bg-blue-200 transition"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  )
}
