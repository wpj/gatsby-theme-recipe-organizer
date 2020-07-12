import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { Query } from '../graphql/types';

import styles from '../styles/markdown.module.css';

interface Props extends PageProps {
  data: Query;
}

const RecipeTemplate = ({ data }: Props) => {
  const recipe = data.markdownRemark!;
  const frontmatter = recipe.frontmatter!;
  const siteTitle = data.site!.siteMetadata!.title!;

  const pageTitle = `${siteTitle} | Recipe - ${frontmatter.title}`;

  return (
    <Layout pageTitle={pageTitle} siteTitle={siteTitle}>
      <article>
        <header>
          <h1 className={styles.h1}>{frontmatter.title}</h1>
        </header>
        <section
          className={styles.markdown}
          dangerouslySetInnerHTML={{ __html: recipe.html! }}
        />
      </article>
    </Layout>
  );
};

export default RecipeTemplate;

export const pageQuery = graphql`
  query RecipeBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
    }
  }
`;
