import React, { useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Box, Text, Stack } from '../../ds';
import { Link } from '../link';
import { SearchIndexDataQuery } from '../../graphql/types';
import { SearchDocument } from './types';
import { Index } from './search-index';
import { useSearch } from './use-search';

function Result({ slug, title }: Pick<SearchDocument, 'slug' | 'title'>) {
  return (
    <Box>
      <Link to={slug}>
        <Text>{title}</Text>
      </Link>
    </Box>
  );
}

const INDEX_FIELDS = ['source', 'tags', 'title'];

interface Props {
  query: string;
}

function ResultsSummary({ items }: { items: SearchDocument[] | null }) {
  let summary =
    items !== null ? (
      <Text>
        {items.length} {items.length === 1 ? 'result' : 'results'} found
      </Text>
    ) : (
      <Text>No results found</Text>
    );

  return (
    <Box my="medium">
      <Text fontStyle="italic" color="darkgray">
        {summary}
      </Text>
    </Box>
  );
}

export default function Results({ query }: Props) {
  const queryResult = useStaticQuery<SearchIndexDataQuery>(graphql`
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

  let result = useSearch(searchIndex, query);

  if (result.status === 'loading' || result.status === 'inactive') {
    return null;
  }

  return (
    <Box px="small">
      <ResultsSummary items={result.data} />
      {result.data !== null ? (
        <Stack as="ul" divide="xxsmall" divideColor="gray">
          {result.data.map((item) => (
            <li key={item.slug}>
              <Box py="medium">
                <Result title={item.title} slug={item.slug} />
              </Box>
            </li>
          ))}
        </Stack>
      ) : null}
    </Box>
  );
}
