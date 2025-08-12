import { DrupalNode } from "next-drupal"

import { ArticleTeaser } from "@/components/nodes/teaser/ArticleTeaser"
import { drupal } from "@/lib/drupal"

type MoreFromAuthorViewProps = {
  authorDrupalId: string
  currentArticleNodeId: number | string
}
export default async function MoreArticlesFromAuthorView({
  authorDrupalId,
  currentArticleNodeId,
}: MoreFromAuthorViewProps) {
  const view = await drupal.getView<DrupalNode[]>(
    "articles--more_from_author",
    {
      params: {
        include: "field_image,uid",
        "views-argument": [authorDrupalId, currentArticleNodeId],
      },
    }
  )

  return (
    <div className="py-8">
      <h2 className="mb-4 text-3xl font-bold">More from this author</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {view.results.map((item) => (
          <ArticleTeaser key={item.id} node={item} />
        ))}
      </div>
    </div>
  )
}
