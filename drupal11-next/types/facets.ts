import { DrupalSearchApiJsonApiResponse } from 'next-drupal';

export type JsonApiResourceWithFacets<T> = DrupalSearchApiJsonApiResponse & {
  data: {
    attributes: T
  }[],
}
