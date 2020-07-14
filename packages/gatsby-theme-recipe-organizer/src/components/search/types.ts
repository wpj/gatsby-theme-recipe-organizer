export interface SearchDocument {
  slug: string;
  tags?: string[];
  title?: string;
}

type FieldIndex = string | string[];

export interface SearchIndex {
  documents: SearchDocument[];
  indexFields: FieldIndex[];
}
