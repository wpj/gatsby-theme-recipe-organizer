import React from 'react';

import { useSearch } from './use-search';
import Results from './results';

interface Props {
  query: string;
}

export default function Search({ query }: Props) {
  let result = useSearch(query);

  if (result.status !== 'ok') {
    return null;
  }

  return <Results items={result.data} />;
}
