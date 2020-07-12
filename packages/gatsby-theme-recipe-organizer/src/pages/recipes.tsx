import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { Query } from '../graphql/types';
import LinkList from '../components/link-list';

import markdownStyles from '../styles/markdown.module.css';

interface Props extends PageProps {
  data: Query;
}

const RecipeIndex = ({ data }: Props) => {
  const siteTitle = data.site!.siteMetadata!.title!;
  const items = data.allMarkdownRemark.edges.map(({ node }) => {
    const href = node.fields!.slug!;
    const text = node.frontmatter?.title || href;
    return { href, text };
  });

  const pageTitle = `${siteTitle} | Recipes`;

  return (
    <Layout siteTitle={siteTitle} pageTitle={pageTitle}>
      <h1 className={markdownStyles.h1}>All recipes</h1>
      <LinkList items={items} />
    </Layout>
  );
};

export default RecipeIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
