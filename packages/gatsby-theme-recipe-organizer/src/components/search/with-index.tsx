import { useEffect, useMemo } from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import { Query } from '../../graphql/types';

interface Props {
  setSearchIndex: (searchIndex: any) => void;
}

export default function WithIndex({ setSearchIndex }: Props) {
  const queryResult = useStaticQuery<Query>(graphql`
    query SearchIndexQuery {
      allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }) {
        nodes {
          fields {
            slug
          }
          frontmatter {
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
        title: node?.frontmatter?.title,
        tags: node?.frontmatter?.tags,
        slug: node?.fields?.slug,
      };
    });

    return { documents };
  }, [queryResult]);

  useEffect(() => {
    setSearchIndex(searchIndex);
  }, [searchIndex]);

  return null;
}
