import { DrupalNode, DrupalSearchApiJsonApiResponse } from "next-drupal"
import { Metadata } from "next"

import { ArticleShortTeaser } from "@/components/nodes/teaser/ArticleShortTeaser"
import { ArticlesSearchApiForm } from "@/components/forms/ArticlesSearchApiForm"
import { SearchApiPager } from "@/components/ui/SearchApiPager"
import { Link } from "@/components/navigation/Link"
import { drupal } from "@/lib/drupal"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Articles Search API",
  }
}

type ArticleSearchApiProps = {
  searchParams: Promise<Record<string, string | string[]>>
}

export default async function ArticleSearchApi({
  searchParams,
}: ArticleSearchApiProps) {
  const params = await searchParams
  const reqParams = Object.keys(params).reduce(
    (acc, key) => ({
      ...acc,
      [key]: Array.isArray(params[key]) ? params[key].join(",") : params[key],
    }),
    {}
  )

  const index = await drupal.getSearchIndex<DrupalSearchApiJsonApiResponse>(
    "articles",
    {
      deserialize: false,
      params: {
        include: "field_image,uid,field_tags",
        "page[limit]": 8,
        ...reqParams,
      },
    }
  )

  const articles = drupal.deserialize(index) as DrupalNode[]

  return (
    <main className="p-8">
      <h1 className="mb-10 text-6xl font-black">Articles search</h1>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Results: {index.meta.count}
        </h2>
        <div className="flex gap-4">
          <Link href={{ query: { ...params, sort: "-created" } }}>
            Recently created first
          </Link>
          <Link href={{ query: { ...params, sort: "-changed" } }}>
            Recently updated first
          </Link>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-1/4">
          <ArticlesSearchApiForm
            facets={index.meta.facets || []}
            defaultValues={params}
          />
        </div>
        <div className="w-3/4 flex flex-col gap-6">
          {articles.map((node) => (
            <ArticleShortTeaser key={node.id} node={node} />
          ))}

          <SearchApiPager
            elements_per_page={8}
            total_count={index.meta.count}
            current_offset={Number(params["page[offset]"]) || 0}
            param_key="page[offset]"
          />
        </div>
      </div>
    </main>
  )
}
