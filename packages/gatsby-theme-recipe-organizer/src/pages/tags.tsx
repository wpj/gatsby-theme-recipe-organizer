import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { paramCase } from 'change-case';

import { Query } from '../graphql/types';
import Layout from '../components/layout';
import LinkList from '../components/link-list';

import markdownStyles from '../styles/markdown.module.css';

const TagsPage: FC<{ data: Query }> = ({ data }) => {
  const group = data!.allMarkdownRemark!.group;
  const siteTitle = data!.site!.siteMetadata!.title!;

  const links = group.map((tag) => {
    const fieldValue = tag.fieldValue!;
    const href = `/tag/${paramCase(fieldValue)}/`;
    const text = `${fieldValue} (${tag.totalCount})`;

    return { href, text };
  });

  const pageTitle = `${siteTitle} | Tags`;

  return (
    <Layout pageTitle={pageTitle} siteTitle={siteTitle}>
      <h1 className={markdownStyles.h1}>Tags</h1>
      <LinkList items={links} />
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
