import { DrupalFile } from 'next-drupal';

export type TextLongFormattedField = {
  value: string
  format: string
  processed: string
}

export type LinkField = {
  uri: string
  title: string
  options: any[]
}

export type ImageField = DrupalFile & {
  type: string
  id: string
  drupal_internal__fid: number
  uri: {
    value: string
    url: string
  }
}
