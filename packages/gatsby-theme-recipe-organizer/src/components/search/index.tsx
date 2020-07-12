import cc from 'classcat';
import React, { lazy, useMemo, useState, SyntheticEvent } from 'react';

import { Search as SearchApi } from 'js-search';

import tw, { map as mapTw } from '../../styles/tw';
import Results from './results';
import { SearchDocument, SearchIndex } from './types';

import styles from './search.module.css';

const WithIndex = lazy(() => import('./with-index'));

function Null() {
  return null;
}

export default function Search() {
  let [isActivated, setIsActivated] = useState(false);
  let [searchIndex, setSearchIndex] = useState<SearchIndex | null>(null);

  let [results, setResults] = useState<SearchDocument[] | null>(null);

  let search = useMemo(() => {
    if (searchIndex === null) {
      return null;
    } else {
      let s = new SearchApi('slug');

      s.addIndex('title');
      s.addIndex('tags');

      s.addDocuments(searchIndex.documents);

      return s;
    }
  }, [searchIndex]);

  function init() {
    setIsActivated(true);
  }

  function handleFocus() {
    init();
  }

  const handleClick = handleFocus;

  function handleMouseOver() {
    init();
  }

  function handleChange(e: SyntheticEvent<HTMLInputElement>) {
    if (!search) {
      return;
    }

    let query = e.currentTarget.value;
    let results = search.search(query) as SearchDocument[];

    setResults(results);
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className={tw('relative')}>
      {isActivated && (
        <React.Suspense fallback={<Null />}>
          <WithIndex setSearchIndex={setSearchIndex} />
        </React.Suspense>
      )}
      <form onSubmit={handleSubmit} className={tw('block')}>
        <input
          className={cc(
            mapTw([
              'bg-white',
              'border',
              'border-gray-300',
              'rounded-lg',
              'py-2',
              'px-4',
              'block',
              'w-full',
              'appearance-none',
              'leading-normal',
            ]),
          )}
          onChange={handleChange}
          onClick={handleClick}
          onFocus={handleFocus}
          onMouseOver={handleMouseOver}
          type="search"
        />
      </form>
      {results != null && results.length ? (
        <div
          className={cc([
            styles['top-100'],
            mapTw([
              'absolute',
              'bg-white',
              'w-full',
              'rounded-md',
              'mt-1',
              'px-2',
              'border',
              'border-gray-400',
            ]),
          ])}
        >
          <Results items={results} />
        </div>
      ) : null}
    </div>
  );
}
