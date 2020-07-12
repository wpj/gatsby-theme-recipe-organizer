import React from 'react';
import { Link } from 'gatsby';

import tw from '../../styles/tw';
import markdownStyles from '../../styles/markdown.module.css';

interface LinkItem {
  href: string;
  text: string;
}

function IndexItem({ text, href }: LinkItem) {
  return (
    <article>
      <header>
        <h3 className={markdownStyles.h3}>
          <Link to={href}>{text}</Link>
        </h3>
      </header>
    </article>
  );
}

const PostIndex = ({ items }: { items: LinkItem[] }) => {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li className={tw('my-5')} key={item.href}>
            <IndexItem text={item.text} href={item.href} />
          </li>
        );
      })}
    </ul>
  );
};

export default PostIndex;
