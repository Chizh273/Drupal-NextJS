import { DrupalMedia as OriginalDrupalMedia } from 'next-drupal';
import { ImageField } from '@/types/fields';

export type DrupalMedia = OriginalDrupalMedia & {
  type: string
  id: string
  langcode: string
  revision_created: string
  status: boolean
  default_langcode: boolean
  revision_translation_affected: boolean
  path: {
    alias: any
    pid: any
    langcode: string
  }
  links: {
    self: {
      href: string
    }
  }
  resourceIdObjMeta: {
    drupal_internal__target_id: number
  }
  bundle: {
    type: string
    id: string,
    resourceIdObjMeta: {
      drupal_internal__target_id: string
    }
  }
  revision_user: any
  uid: {
    type: string
    id: string,
    resourceIdObjMeta: {
      drupal_internal__target_id: string
    }
  }
  relationshipNames: string[]
}

export type ImageMedia = {
  thumbnail: ImageField;
  field_media_image: ImageField;
}
