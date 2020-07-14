import cc from 'classcat';
import React, { useState, SyntheticEvent } from 'react';

import tw, { map as mapTw } from '../../styles/tw';
import Results from './results';
import { SearchDocument } from './types';
import { Index } from './search-index';

import styles from './form.module.css';

interface Props {
  init: () => void;
  searchIndex: Index | null;
}

export default function SearchForm({ init, searchIndex }: Props) {
  let [results, setResults] = useState<SearchDocument[] | null>(null);

  function handleFocus() {
    init();
  }

  const handleClick = handleFocus;

  function handleMouseOver() {
    init();
  }

  function handleChange(e: SyntheticEvent<HTMLInputElement>) {
    if (!searchIndex) {
      return;
    }

    let query = e.currentTarget.value;

    let results = searchIndex.search(query) as SearchDocument[];

    setResults(results);
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className={tw('relative')}>
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
