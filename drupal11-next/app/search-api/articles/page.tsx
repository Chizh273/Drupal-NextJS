import { ArticleShortTeaser } from '@/components/drupal/ArticleShortTeaser';
import { ArticlesSearchForm } from '@/components/ArticlesSearchForm';
import { DrupalNode } from 'next-drupal';
import { JsonApiResourceWithFacets } from '@/types';
import { Metadata } from 'next';
import { drupal } from '@/lib/drupal';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '[Search API] Articles',
  };
}

type ArticleSearchApiProps = {
  searchParams: Promise<Record<string, string | string[]>>
}

export default async function ArticleSearchApi({
  searchParams,
}: ArticleSearchApiProps) {
  const params = await searchParams;
  const filter = Object.keys(params)
    .filter(key => key.startsWith('filter['))
    .reduce((acc, key) => ({
      ...acc,
      [key]: Array.isArray(params[key]) ? params[key].join(',') : params[key],
    }), {});

  const index = await drupal.getSearchIndex<
    JsonApiResourceWithFacets<DrupalNode>
  >('articles', {
    deserialize: false,
    params: { include: 'field_image,uid,field_tags', ...filter },
  });

  const articles = drupal.deserialize(index) as DrupalNode[];

  console.log(articles);

  return (
    <main className="p-8">
      <h1 className="mb-10 text-6xl font-black">Articles search</h1>
      <h2 className="mb-6 text-xl font-semibold text-gray-700">
        Results: {index.data.length}
      </h2>
      <div className="flex gap-8">
        <div className="w-1/4">
          <ArticlesSearchForm
            facets={index.meta.facets || []}
            defaultValues={params}
          />
        </div>
        <div className="w-3/4 flex flex-col gap-6">
          {articles.map((node) => (
            <ArticleShortTeaser key={node.id} node={node}/>
          ))}
        </div>
      </div>
    </main>
  );
}
