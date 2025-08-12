import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

import { ArticleTeaserList } from "@/components/nodes/teaser/ArticleTeaserList"
import { PropsWithSearchParams, PropsWithSlug } from "@/types"
import { prepareGenerateMetadata } from "@/lib/metatags"
import { getEntityByPath } from "@/lib/getEntity"
import { Pager } from "@/components/ui/Pager"
import { drupal } from "@/lib/drupal"

export const generateMetadata = prepareGenerateMetadata<DrupalTaxonomyTerm>(
  async ({ name }) => ({
    title: `Tag - ${name}`,
    description: `Articles tagged with ${name}`,
  })
)

type TagsPageProps = PropsWithSearchParams & PropsWithSlug
export default async function TagPage(props: TagsPageProps) {
  const params = await props.params
  const searchParams = await props.searchParams

  const term = await getEntityByPath<
    DrupalTaxonomyTerm & { description: { processed: string } }
  >(`/tags/${params.slug.join("/")}`)

  const view = await drupal.getView<DrupalNode[]>("taxonomy_term--page_1", {
    params: {
      "views-argument": [term.drupal_internal__tid],
      include: "field_image,uid",
    },
  })

  return (
    <main className="p-8">
      <h1 className="mb-10 text-6xl font-black">{term.name} tag</h1>

      {term.description?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: term.description?.processed }}
          className="mt-6 font-serif text-xl leading-loose"
        />
      )}

      <ArticleTeaserList nodes={view.results} />
      <Pager
        param_key={"page"}
        elements_per_page={8}
        current_page={Number(searchParams["page"]) || 0}
        total_count={view.meta.count}
      />
    </main>
  )
}
