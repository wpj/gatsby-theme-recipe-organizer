import { useEffect, useMemo } from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import { Query } from '../../graphql/types';

interface Props {
  setSearchIndex: (searchIndex: any) => void;
}

const INDEX_FIELDS = ['source', 'tags', 'title'];

export default function WithIndex({ setSearchIndex }: Props) {
  const queryResult = useStaticQuery<Query>(graphql`
    query SearchIndexQuery {
      allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }) {
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
    let documents = queryResult.allMarkdownRemark.nodes.map((node) => {
      return {
        source: node?.frontmatter?.source,
        slug: node?.fields?.slug,
        tags: node?.frontmatter?.tags,
        title: node?.frontmatter?.title,
      };
    });

    return { documents, indexFields: INDEX_FIELDS };
  }, [queryResult]);

  useEffect(() => {
    setSearchIndex(searchIndex);
  }, [searchIndex]);

  return null;
}
