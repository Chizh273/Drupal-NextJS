import type { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"
import type { Metadata } from "next"

import { ArticlesViewExposedForm } from "@/components/forms/ArticlesViewExposedForm"
import { ArticleTeaserList } from "@/components/nodes/teaser/ArticleTeaserList"
import { PropsWithSearchParams } from "@/types"
import { Pager } from "@/components/ui/Pager"
import { drupal } from "@/lib/drupal"

export const metadata: Metadata = {
  title: "Views Articles Page",
  description: "A Next.js site powered by a Drupal backend.",
}

type ViewsArticlesPageProps = PropsWithSearchParams
export default async function ViewsArticlesPage({
  searchParams,
}: ViewsArticlesPageProps) {
  const params = await searchParams
  const terms = await drupal.getResourceCollection<DrupalTaxonomyTerm[]>(
    "taxonomy_term--tags",
    {
      params: {
        "filter[status]": 1,
        sort: "-weight",
      },
    }
  )

  const view = await drupal.getView<DrupalNode[]>("articles--page", {
    params: {
      include: "field_image,uid",
      ...params,
    },
  })

  return (
    <>
      <h1 className="mb-10 text-6xl font-black">Articles views page</h1>
      <ArticlesViewExposedForm terms={terms} />
      <ArticleTeaserList nodes={view.results} />
      <Pager
        param_key={"page"}
        elements_per_page={8}
        current_page={Number(params["page"]) || 0}
        total_count={view.meta.count}
      />
    </>
  )
}
