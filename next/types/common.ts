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

export type ParamsWithSlug = {
  slug: string[]
}
export type PropsWithSlug = {
  params: Promise<ParamsWithSlug>
}

export type PropsWithSearchParams = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

