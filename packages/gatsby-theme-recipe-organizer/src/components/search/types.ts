export interface SearchDocument {
  slug: string;
  tags?: string[];
  title?: string;
}

export interface SearchIndex {
  documents: SearchDocument[];
}
