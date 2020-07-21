import { useState, useEffect, useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { SearchIndexDataQuery } from '../../graphql/types';
import { Index } from './search-index';
import { SearchDocument } from './types';

const INDEX_FIELDS = ['source', 'tags', 'title'];

type QueryState =
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

export function useSearch(query: string) {
  let [queryState, setQueryState] = useState<QueryState>({
    status: 'inactive',
  });

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

  useEffect(() => {
    async function run() {
      if (!query) {
        return;
      }

      setQueryState({ status: 'loading' });

      if (query) {
        let results = (await searchIndex.search(query)) as SearchDocument[];

        setQueryState({ status: 'ok', data: results });
      }
    }

    run();
  }, [searchIndex, query]);

  return queryState;
}
