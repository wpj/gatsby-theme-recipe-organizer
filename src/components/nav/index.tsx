import cc from 'classcat';
import React, { FC } from 'react';
import { Link } from 'gatsby';

import Search from '../search';

import tw, { map as mapTw } from '../../styles/tw';

const Nav: FC<{ siteTitle: string; showSearch: boolean }> = ({
  siteTitle,
  showSearch,
}) => {
  return (
    <nav
      className={cc(
        mapTw([
          'block',
          'sm:flex',
          'items-center',
          'justify-between',
          'flex-wrap',
          'bg-purple-600',
          'p-4',
        ]),
      )}
    >
      <div
        className={cc([
          showSearch && mapTw(['mb-4', 'sm:mb-0']),
          mapTw(['flex', 'justify-between', 'text-white']),
        ])}
      >
        <h1 className={cc(mapTw(['sm:mr-6', 'mr-2']))}>
          <Link to="/">{siteTitle}</Link>
        </h1>
        <ul className={cc(mapTw(['flex', 'sm:mr-6', 'mr-2']))}>
          <li className={tw('mr-6')}>
            <h2>
              <Link to="/tags/">Tags</Link>
            </h2>
          </li>
          <li>
            <h2>
              <Link to="/recipes/">All recipes</Link>
            </h2>
          </li>
        </ul>
      </div>
      {showSearch ? (
        <div className={cc(mapTw(['flex-1', 'w-full', 'sm:w-auto']))}>
          <Search />
        </div>
      ) : null}
    </nav>
  );
};

export default Nav;
