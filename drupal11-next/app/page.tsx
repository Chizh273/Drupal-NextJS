import { drupal } from '@/lib/drupal';
import type { Metadata } from 'next';
import { DrupalNode } from 'next-drupal';
import { ArticleTeaserList } from '@/components/drupal/ArticleTeaserList';

export const metadata: Metadata = {
  description: 'A Next.js site powered by a Drupal backend.',
};

export default async function Home() {
  const nodes = await drupal.getResourceCollection<DrupalNode[]>(
    'node--article',
    {
      params: {
        'filter[status]': 1,
        'fields[node--article]': 'title,path,field_image,uid,created',
        include: 'field_image,uid',
        sort: '-created',
        'page[limit]': 8,
      },
      next: {
        revalidate: 3600,
      },
    },
  );

  return (
    <>
      <h1 className='mb-10 text-6xl font-black'>Latest news</h1>
      <ArticleTeaserList nodes={nodes}/>
    </>
  );
}
