import { Metadata } from "next"

import { drupal } from "@/lib/drupal"
import { DrupalViewsDataExportResponse } from '@/types/data-export';
import { ArticlesSearchForm } from '@/components/data-export/ArticlesSearchForm';
import { ArticleShortTeaser } from '@/components/data-export/ArticleShortTeaser';
import { Pager } from '@/components/data-export/Pager';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "[Views Data Export - Search API] Articles",
  }
}

type ArticleSearchApiProps = {
  searchParams: Promise<Record<string, string | string[]>>
}

export default async function ArticleSearchApi({
  searchParams,
}: ArticleSearchApiProps) {
  const params = await searchParams
  const filters = Object.keys(params)
    .filter((key) => key.startsWith("filter["))
    .reduce(
      (acc, key) => ({
        ...acc,
        [key.replace("filter[", "").replace("]", "")]: params[key],
      }),
      {}
    )

  const url = drupal.buildUrl("/api/search-api-article/data-export", filters)
  const response = await drupal.fetch(url.toString(), {})
  const { data, pager, facets } = await response.json() as DrupalViewsDataExportResponse
console.log(data, pager, facets);
  return (
    <main className="p-8">
      <h1 className="mb-10 text-6xl font-black">
        Views Data Export - Articles search
      </h1>
      <h2 className="mb-6 text-xl font-semibold text-gray-700">Results: { pager.total_items }</h2>
      <div className="flex gap-8">
        <div className="w-1/4">
          <ArticlesSearchForm
            defaultValues={params}
            facets={facets || {}}
          />
        </div>
        <div className="w-3/4 flex flex-col gap-6">
          {data.map((node) => (
            <ArticleShortTeaser key={node.nid} node={node}/>
          ))}
        </div>

        <Pager
          current_page={pager.current_page}
          total_items={pager.total_items}
          total_pages={pager.total_pages}
          items_per_page={pager.items_per_page}
        />
      </div>
    </main>
  )
}
