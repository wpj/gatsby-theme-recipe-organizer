import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { Query } from '../graphql/types';
import Search from '../components/search';
import { Box, Heading } from '../ds';

interface Props extends PageProps {
  data: Query;
}

const IndexPage = ({ data }: Props) => {
  const siteTitle = data.site!.siteMetadata!.title!;

  return (
    <Layout showSearch={false} siteTitle={siteTitle} pageTitle={siteTitle}>
      <Box py={['medium', 'large']}>
        <Heading level="1">Recipe Search</Heading>
      </Box>
      <Search preset="standalone" />
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
