import cc from 'classcat';
import React, { FC, ButtonHTMLAttributes } from 'react';
import { graphql } from 'gatsby';

import { Query } from '../graphql/types';
import Layout from '../components/layout';
import { map as mapTw } from '../styles/tw';

import markdownStyles from '../styles/markdown.module.css';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={cc([
        className,
        mapTw([
          'bg-blue-500',
          'hover:bg-blue-700',
          'text-white',
          'font-bold',
          'py-2',
          'px-4',
          'rounded',
          'whitespace-no-wrap',
        ]),
      ])}
      {...props}
    />
  );
};

async function clearCacheStorage() {
  if (!('caches' in window)) {
    return;
  }

  let caches = await window.caches.keys();

  return Promise.all(
    caches.map((cacheName) => {
      return window.caches.delete(cacheName);
    }),
  );
}

async function removeServiceWorker() {
  if (!('serviceWorker' in window.navigator)) {
    return;
  }

  let registrations = await window.navigator.serviceWorker.getRegistrations();

  return Promise.all(
    registrations.map((registration) => {
      console.log('Removing service worker registration:', registration);
      return registration.unregister();
    }),
  );
}

async function forceRefresh() {
  await Promise.all([removeServiceWorker(), clearCacheStorage()]);

  window.location.reload();
}

const CardHeading: FC = ({ children }) => {
  return (
    <h3
      className={cc(
        mapTw(['text-xl', 'leading-snug', 'font-semibold', 'mb-2']),
      )}
    >
      {children}
    </h3>
  );
};

const Card: FC = ({ children }) => {
  return (
    <div
      className={cc(
        mapTw([
          'rounded-lg',
          'bg-gray-100',
          'py-2',
          'px-3',
          'sm:py-4',
          'sm:px-6',
        ]),
      )}
    >
      {children}
    </div>
  );
};

function ForceRefresh() {
  function onClick() {
    forceRefresh();
  }

  return (
    <Card>
      <div
        className={cc(
          mapTw([
            'sm:flex',
            'justify-between',
            'items-center',
            'sm:space-x-2',
            'space-y-4',
            'sm:space-y-0',
          ]),
        )}
      >
        <div>
          <CardHeading>Force refresh</CardHeading>

          <p>
            Clears out offline storage and reloads a fresh copy of the site.
          </p>
        </div>

        <div>
          <Button
            className={cc(mapTw(['sm:w-auto', 'w-full']))}
            onClick={onClick}
          >
            Force refresh
          </Button>
        </div>
      </div>{' '}
    </Card>
  );
}

function SiteInfo({
  commit,
  themeVersion,
}: {
  commit: string;
  themeVersion: string;
}) {
  return (
    <Card>
      <CardHeading>Site Info</CardHeading>

      <p>
        <span>Commit:</span> <span>{commit}</span>
      </p>

      <p>
        <span>Theme version:</span> <span>{themeVersion}</span>
      </p>
    </Card>
  );
}

const SettingsPage: FC<{ data: Query }> = ({ data }) => {
  const siteMetadata = data!.site!.siteMetadata!;

  const commit = siteMetadata.commit!;
  const siteTitle = siteMetadata.title!;
  const themeVersion = siteMetadata.themeVersion!;

  const pageTitle = `${siteTitle} | Settings`;

  return (
    <Layout pageTitle={pageTitle} siteTitle={siteTitle}>
      <h1 className={markdownStyles.h1}>Settings</h1>
      <div className={cc(mapTw(['space-y-4']))}>
        <SiteInfo commit={commit} themeVersion={themeVersion} />
        <ForceRefresh />
      </div>
    </Layout>
  );
};

export default SettingsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        commit
        themeVersion
        title
      }
    }
  }
`;
