import cc from 'classcat';
import React, { useState, SyntheticEvent } from 'react';
import { useStyles } from 'react-treat';
import { Search as SearchIcon } from 'react-feather';

import { Box, Text } from '../../ds';
import Results from './results';
import { FormPreset, SearchDocument } from './types';
import { Index } from './search-index';

import * as formRefs from './form.treat';
import { useReset } from '../../ds/hooks';

interface Props {
  init: () => void;
  searchIndex: Index | null;
  preset?: FormPreset;
}

export default function SearchForm({
  init,
  searchIndex,
  preset = 'inline',
}: Props) {
  let [results, setResults] = useState<SearchDocument[] | null>(null);
  let formStyles = useStyles(formRefs);
  let reset = useReset('input');

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
    <Box position="relative">
      <form onSubmit={handleSubmit}>
        <Box
          borderRadius="medium"
          border={preset === 'standalone' ? 'weak' : undefined}
          borderColor="gray"
          display="flex"
          backgroundColor="white"
          overflow="hidden"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="small"
          >
            <Text color="darkgray" size="small">
              <SearchIcon
                className={formStyles.icon}
                width="1em"
                height="1em"
              />
            </Text>
          </Box>
          <label className={formStyles.hide} htmlFor="search-text">
            Search
          </label>
          <input
            id="search-text"
            className={cc([
              reset,
              formStyles.input,
              preset === 'standalone' ? formStyles.large : formStyles.small,
            ])}
            onChange={handleChange}
            onClick={handleClick}
            onFocus={handleFocus}
            onMouseOver={handleMouseOver}
            type="search"
          />
        </Box>
      </form>
      {results != null && results.length ? (
        <Box
          position="absolute"
          width="full"
          mt={preset === 'standalone' ? 'small' : 'xsmall'}
          px="medium"
          backgroundColor="white"
          borderRadius="medium"
          zIndex="low"
          className={cc([formStyles.shadow, formStyles.top100])}
        >
          <Results items={results} />
        </Box>
      ) : null}
    </Box>
  );
}
