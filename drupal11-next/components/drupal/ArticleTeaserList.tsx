import type { DrupalNode } from 'next-drupal';
import { ArticleTeaser } from '@/components/drupal/ArticleTeaser';

interface ArticleTeaserListProps {
  nodes: DrupalNode[];
}

export function ArticleTeaserList({ nodes }: ArticleTeaserListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
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
  );
}
