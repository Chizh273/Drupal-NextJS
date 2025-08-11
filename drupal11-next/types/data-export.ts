import { TextLongFormattedField } from '@/types/fields';

export interface ArticleDataExport {
  nid: string;
  uuid: string;
  langcode: string;
  status: string;
  uid: {
    name: string;
  };
  title: string;
  created: string;
  changed: string;
  promote: string;
  sticky: string;
  default_langcode: string;
  revision_default: string;
  revision_translation_affected: string;
  path: string;
  body: TextLongFormattedField;
  field_image: {
    uri: string
  };
  field_tags: {
    name: string
    path: string
  }[];
}

export type Facets = {
  [key: string]: FacetItem[];
}

export interface FacetItem {
  url: string;
  raw_value: string;
  values: {
    value: string
    count: number
  };
}

export interface Pager {
  current_page: any;
  total_items: number;
  total_pages: number;
  items_per_page: number;
}

export interface DrupalViewsDataExportResponse {
  data: ArticleDataExport[];
  facets: Facets;
  pager: Pager;
}
