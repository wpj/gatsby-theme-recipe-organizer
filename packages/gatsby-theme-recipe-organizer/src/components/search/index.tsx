import React, { lazy, useMemo, useState } from 'react';

import SearchForm from './form';
import { FormPreset, SearchIndex } from './types';
import { Index } from './search-index';

const WithIndex = lazy(() => import('./with-index'));

const NullPlaceholder = () => null;

interface Props {
  preset?: FormPreset;
}

export default function Search({ preset }: Props) {
  let [isActivated, setIsActivated] = useState(false);
  let [searchIndexConfig, setSearchIndexConfig] = useState<SearchIndex | null>(
    null,
  );

  let searchIndex = useMemo(() => {
    if (searchIndexConfig === null) {
      return null;
    } else {
      let searchIndex = new Index(searchIndexConfig);

      return searchIndex;
    }
  }, [searchIndexConfig]);

  function init() {
    setIsActivated(true);
  }

  return (
    <>
      {isActivated && (
        <React.Suspense fallback={<NullPlaceholder />}>
          <WithIndex setSearchIndex={setSearchIndexConfig} />
        </React.Suspense>
      )}
      <SearchForm searchIndex={searchIndex} init={init} preset={preset} />
    </>
  );
}
