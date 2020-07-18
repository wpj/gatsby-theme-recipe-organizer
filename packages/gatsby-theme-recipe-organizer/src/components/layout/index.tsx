// This must be imported first and it must be done here and not in
// gatsby-browser.js.
import '../../ds/reset';

import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { TreatProvider } from 'react-treat';

import { Box } from '../../ds';
import * as layoutStyle from './layout.treat';
import theme from '../../ds/theme/theme.treat';
import Nav from '../nav';

interface Props {
  showSearch?: boolean;
  siteTitle: string;
  pageTitle: string;
}

const Layout: FC<Props> = ({
  showSearch = true,
  siteTitle,
  pageTitle,
  children,
}) => {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Box as="header">
        <Nav showSearch={showSearch} siteTitle={siteTitle} />
      </Box>
      <Box mx="auto" className={layoutStyle.root} as="main">
        <Box mx="large">{children}</Box>
      </Box>
    </>
  );
};

const Provider: FC<Props> = (props) => {
  return (
    <TreatProvider theme={theme}>
      <Layout {...props} />
    </TreatProvider>
  );
};

export default Provider;
