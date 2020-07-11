import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { Query } from '../graphql/types';
import Search from '../components/search';

import markdownStyles from '../styles/markdown.module.css';

interface Props extends PageProps {
  data: Query;
}

const IndexPage = ({ data }: Props) => {
  const siteTitle = data.site!.siteMetadata!.title!;

  return (
    <Layout showSearch={false} siteTitle={siteTitle} pageTitle={siteTitle}>
      <h1 className={markdownStyles.h3}>Recipe Search</h1>
      <Search />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
