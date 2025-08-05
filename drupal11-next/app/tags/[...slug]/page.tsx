import { drupal } from "@/lib/drupal"
import { ArticleTeaser } from "@/components/drupal/ArticleTeaser"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"
import { Metadata, ResolvingMetadata } from "next"
import { getEntityByPath } from "@/lib/getEntity"
import { notFound } from "next/navigation"

interface TagPageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata(
  props: TagPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return props.params
    .then(({ slug }) =>
      getEntityByPath<DrupalTaxonomyTerm>(`/tags/${slug.join("/")}`)
    )
    .then((term) => ({ title: term.name }))
    .catch(() => ({}))
}

export default async function TagPage(props: TagPageProps) {
  const slug = (await props.params)?.slug

  console.log(slug)

  // Try to get the term by its path.
  let term
  try {
    term = await getEntityByPath<DrupalTaxonomyTerm>(`/tags/${slug.join("/")}`)
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
      <h1 className="mb-10 text-6xl font-black">Term {term.name}</h1>
      {articles?.length ? (
        articles.map((node) => (
          <div key={node.id}>
            <ArticleTeaser node={node} />
            <hr className="my-20" />
          </div>
        ))
      ) : (
        <p className="py-4">No nodes found</p>
      )}
    </main>
  )
}
