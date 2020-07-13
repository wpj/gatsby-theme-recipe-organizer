import cc from 'classcat';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import Nav from '../nav';

import { map as mapTw } from '../../styles/tw';

const Layout: FC<{
  showSearch?: boolean;
  siteTitle: string;
  pageTitle: string;
}> = ({ showSearch = true, siteTitle, pageTitle, children }) => {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div>
        <header>
          <Nav showSearch={showSearch} siteTitle={siteTitle} />
        </header>
        <main
          className={cc(mapTw(['container', 'mx-auto', 'px-4', 'sm:px-1']))}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
