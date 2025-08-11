import { JsonApiResource } from 'next-drupal';

export type EntityWithMetatags = JsonApiResource & {
  metadata?: MetaTag[];
}

export type MetaTag = {
  tag: string;
  attribute: {
    name: string;
    content: string;
  }
}
