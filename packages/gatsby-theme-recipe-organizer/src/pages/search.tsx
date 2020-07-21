import React, { FC } from 'react';
import { graphql, PageProps } from 'gatsby';
import { parse as parseQueryString } from 'query-string';

import MainLayout from '../components/layouts/main';
import { Query } from '../graphql/types';
import Search from '../components/search';
import { Box } from '../ds';
import Results from '../components/search/results';

interface LocationState {}

const SearchPage: FC<PageProps<Query, null, LocationState>> = ({
  data,
  location,
}) => {
  let siteTitle = data.site!.siteMetadata!.title!;

  let params = parseQueryString(location.search);
  let query = params.q as string;

  return (
    <MainLayout showSearch={false} siteTitle={siteTitle} pageTitle={siteTitle}>
      <Box mt="large">
        <Search query={query} preset="standalone" />
      </Box>
      <Box py="medium">
        <Results query={query!} />
      </Box>
    </MainLayout>
  );
};

export default SearchPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
