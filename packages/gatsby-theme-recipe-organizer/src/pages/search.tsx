import React, { FC } from 'react';
import { graphql, PageProps } from 'gatsby';
import { parse as parseQueryString } from 'query-string';

import MainLayout from '../components/layouts/main';
import { Query } from '../graphql/types';
import SearchForm from '../components/search/form';
import { Box } from '../ds';
import Search from '../components/search/search';

interface LocationState {}

const SearchPage: FC<PageProps<Query, null, LocationState>> = ({
  data,
  location,
}) => {
  let siteTitle = data.site!.siteMetadata!.title!;

  let params = parseQueryString(location.search);
  let query = params.q as string;

  let pageTitle = `${siteTitle} | Search Results`;

  return (
    <MainLayout showSearch={false} siteTitle={siteTitle} pageTitle={pageTitle}>
      <Box mt="large">
        <SearchForm initialQuery={query} preset="standalone" />
      </Box>
      <Box py="medium">
        <Search query={query!} />
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
