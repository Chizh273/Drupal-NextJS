import { ArticleTeaser } from "@/components/drupal/ArticleTeaser"
import { drupal } from "@/lib/drupal"
import type { Metadata } from "next"
import { DrupalNode } from "next-drupal"

export const metadata: Metadata = {
  description: "A Next.js site powered by a Drupal backend.",
}

export default async function Home() {
  const nodes = await drupal.getResourceCollection<DrupalNode[]>(
    "node--article",
    {
      params: {
        "filter[status]": 1,
        "fields[node--article]": "title,path,field_image,uid,created",
        include: "field_image,uid",
        sort: "-created",
      },
      next: {
        revalidate: 3600,
      },
    }
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {nodes?.length ? (
        nodes.map((node) => (
          <div key={node.id} className="h-auto">
            <ArticleTeaser node={node} />
          </div>
        ))
      ) : (
        <p className="py-4">No nodes found</p>
      )}
    </div>
  )
}
