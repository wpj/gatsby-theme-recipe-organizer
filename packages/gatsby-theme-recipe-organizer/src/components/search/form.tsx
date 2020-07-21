import cc from 'classcat';
import React, { useRef, SyntheticEvent } from 'react';
import { useStyles } from 'react-treat';
import { Search as SearchIcon } from 'react-feather';
import { navigate } from 'gatsby-link';

import { FormPreset } from './types';
import { Box, Text } from '../../ds';
import * as formRefs from './form.treat';
import { useReset } from '../../ds/hooks';

interface Props {
  initialQuery?: string;
  preset: FormPreset;
}

function search(query: string) {
  navigate(`/search/?q=${query}`);
}

export default function SearchForm({ preset, initialQuery = '' }: Props) {
  let inputRef = useRef<HTMLInputElement>(null);
  let formStyles = useStyles(formRefs);
  let reset = useReset('input');

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    let query = inputRef.current?.value;

    if (query) {
      search(query);
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
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
            <SearchIcon className={formStyles.icon} width="1em" height="1em" />
          </Text>
        </Box>
        <label className={formStyles.hide} htmlFor="search-text">
          Search
        </label>
        <input
          autoCapitalize="off"
          autoCorrect="off"
          className={cc([
            reset,
            formStyles.input,
            preset === 'standalone' ? formStyles.large : formStyles.small,
          ])}
          defaultValue={initialQuery}
          id="search-text"
          inputMode="search"
          placeholder="Search recipes"
          ref={inputRef}
          tabIndex={1}
          type="search"
        />
      </Box>
    </form>
  );
}
