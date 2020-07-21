import { useState, useEffect } from 'react';

import { Index } from './search-index';
import { SearchDocument } from './types';

type SearchState =
  | {
      status: 'inactive';
    }
  | {
      status: 'loading';
    }
  | {
      status: 'ok';
      data: SearchDocument[] | null;
    };

export function useSearch(searchIndex: Index, query: string) {
  let [state, setState] = useState<SearchState>({ status: 'inactive' });

  useEffect(() => {
    async function run() {
      if (!query) {
        return;
      }

      setState({ status: 'loading' });

      if (query) {
        let results = (await searchIndex.search(query)) as SearchDocument[];

        setState({ status: 'ok', data: results });
      }
    }

    run();
  }, [searchIndex, query]);

  return state;
}
