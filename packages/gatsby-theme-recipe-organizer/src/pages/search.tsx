import React, { lazy, useEffect, FC, Suspense } from 'react';
import { graphql, PageProps } from 'gatsby';
import { parse as parseQueryString } from 'query-string';
import { navigate } from '@reach/router';

import MainLayout from '../components/layouts/main';
import { Query } from '../graphql/types';
import SearchForm from '../components/search/form';
import { Box } from '../ds';

const Search = lazy(() => import('../components/search/search'));

const Null = () => null;

const SearchPage: FC<PageProps<Query, null, null>> = ({ data, location }) => {
  let siteTitle = data.site!.siteMetadata!.title!;

  let query = parseQueryString(location.search).q as string | undefined;

  let pageTitle = `${siteTitle} | Search Results`;

  // Restore param that gatsby removes when it force refreshes the page after a
  // service worker update.
  useEffect(() => {
    try {
      let queryBackup = sessionStorage.getItem('queryBackup');
      sessionStorage.removeItem('queryBackup');

      if (!query && queryBackup) {
        navigate(`?q=${queryBackup}`, { replace: true });
      }
    } catch (e) {}
  }, [query]);

  return (
    <MainLayout showSearch={false} siteTitle={siteTitle} pageTitle={pageTitle}>
      <Box mt="large">
        <SearchForm initialQuery={query} preset="standalone" />
      </Box>
      <Box py="medium">
        {query ? (
          <Suspense fallback={<Null />}>
            <Search query={query!} />
          </Suspense>
        ) : null}
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
