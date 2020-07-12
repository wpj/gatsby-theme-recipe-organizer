import cc from 'classcat';
import React from 'react';
import { Link } from 'gatsby';

import { map as mapTw } from '../../styles/tw';

import { SearchDocument } from './types';

interface Props {
  items: SearchDocument[];
}

function Result({ slug, title, tags }: SearchDocument) {
  return (
    <div>
      <Link to={slug}>{title}</Link>
      {tags ? (
        <ul>
          {tags.map((tag) => (
            <li key={tag}>
              <span>{tag}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function Results({ items }: Props) {
  return (
    <div>
      <ul className={cc(mapTw(['list-none', 'px-1']))}>
        {items.map((item) => (
          <li
            className={cc(
              mapTw([
                'border-b',
                'border-gray-400',
                'pt-3',
                'pb-3',
                'last:border-none',
              ]),
            )}
            key={item.slug}
          >
            <Result title={item.title} slug={item.slug} />
          </li>
        ))}
      </ul>
    </div>
  );
}
