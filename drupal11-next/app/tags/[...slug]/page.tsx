import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"
import { notFound } from "next/navigation"

import { ArticleTeaserList } from "@/components/drupal/ArticleTeaserList"
import { prepareGenerateMetadata, PropsWithSlug } from "@/lib/metatags"
import { getEntityByPath } from "@/lib/getEntity"
import { drupal } from "@/lib/drupal"

export const generateMetadata = prepareGenerateMetadata<DrupalTaxonomyTerm>(
  async ({ name }) => ({
    title: `Tag - ${name}`,
    description: `Articles tagged with ${name}`,
  })
)

export default async function TagPage(props: PropsWithSlug) {
  const slug = (await props.params)?.slug

  // Try to get the term by its path.
  let term
  try {
    term = await getEntityByPath<
      DrupalTaxonomyTerm & { description: { processed: string } }
    >(`/tags/${slug.join("/")}`)
  } catch (e) {
    notFound()
  }

  // Try to get the articles for the term.
  let articles: DrupalNode[] = []
  try {
    const response = await drupal.getView<DrupalNode[]>(
      "taxonomy_term--page_1",
      {
        params: {
          "views-argument": [term.drupal_internal__tid],
          include: "field_image,uid",
        },
      }
    )
    articles = response.results
  } catch (e) {
    console.error("Error fetching articles:", e)
  }

  return (
    <main className="p-8">
      <h1 className="mb-10 text-6xl font-black">[View] - {term.name} term</h1>

      {term.description?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: term.description?.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}

      <ArticleTeaserList nodes={articles} />
    </main>
  )
}
