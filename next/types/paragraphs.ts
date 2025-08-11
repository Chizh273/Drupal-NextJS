import { ImageMedia } from '@/types/media';
import { LinkField, TextLongFormattedField } from '@/types/fields';

export type DrupalParagraph = {
  type: string
  id: string
  drupal_internal__id: number
  drupal_internal__revision_id: number
  langcode: string
  status: boolean
  created: string
  parent_id: string
  parent_type: string
  parent_field_name: string
  behavior_settings: any[]
  default_langcode: boolean
  revision_translation_affected: any
  paragraph_type: {
    type: string;
    id: string;
  }
  relationshipNames: string[];
  resourceIdObjMeta: {
    target_revision_id: number
    drupal_internal__target_id: number
  }
  links: {
    self: {
      href: string;
    }
  }
}

export type DrupalHeroParagraph = DrupalParagraph & {
  field_body: TextLongFormattedField;
  field_cta: LinkField;
  field_title: string;
  field_background: ImageMedia;
}

export type DrupalTextAndMediaParagraph = DrupalParagraph & {
  field_body: TextLongFormattedField
  field_cta: LinkField
  field_title: string
  field_image: ImageMedia
}

export type DrupalBannerParagraph = DrupalParagraph & {
  field_body: TextLongFormattedField
  field_cta: LinkField
  field_style: string
  field_title: string
}
