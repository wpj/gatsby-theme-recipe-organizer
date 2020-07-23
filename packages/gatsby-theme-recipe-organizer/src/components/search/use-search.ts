import { useState, useCallback, useEffect, useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { SearchIndexDataQuery } from '../../graphql/types';
import { Index } from './search-index';

const INDEX_FIELDS = ['source', 'tags', 'title'];

type QueryState<Data> =
  | {
      status: 'loading';
    }
  | {
      status: 'ok';
      data: Data;
    }
  | {
      status: 'error';
      error: Error;
    };

function useQuery<Data>(fetcher: () => Promise<Data>) {
  let [queryState, setQueryState] = useState<QueryState<Data>>({
    status: 'loading',
  });

  useEffect(() => {
    async function run() {
      try {
        let data = await fetcher();
        setQueryState({ status: 'ok', data });
      } catch (e) {
        setQueryState({ status: 'error', error: e });
      }
    }

    run();
  }, [fetcher]);

  return queryState;
}

export function useSearch(query: string) {
  let queryResult = useStaticQuery<SearchIndexDataQuery>(graphql`
    query SearchIndexData {
      indexData: allMarkdownRemark(
        sort: { fields: [frontmatter___title], order: ASC }
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            source
            tags
            title
          }
        }
      }
    }
  `);

  let searchIndex = useMemo(() => {
    let documents = queryResult.indexData.nodes.map((node) => ({
      slug: node!.fields!.slug as string,
      source: node?.frontmatter?.source as string | null,
      tags: node?.frontmatter?.tags as string[] | null,
      title: node?.frontmatter?.title as string | null,
    }));

    return new Index({ documents, indexFields: INDEX_FIELDS });
  }, [queryResult]);

  let fetchSearchResults = useCallback(() => {
    return query ? searchIndex.search(query) : Promise.resolve(null);
  }, [searchIndex, query]);

  return useQuery(fetchSearchResults);
}
