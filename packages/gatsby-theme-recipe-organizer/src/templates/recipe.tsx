import cc from 'classcat';
import React, { FC } from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { Query } from '../graphql/types';

import { map as mapTw } from '../styles/tw';

interface RecipeProps {
  content: string;
  title: string;
}

export const Recipe: FC<RecipeProps> = ({ content, title }) => {
  return (
    <article>
      <header>
        <div className={cc(mapTw(['sm:my-6', 'my-4']))}>
          <h1
            className={cc(
              mapTw([
                'sm:text-4xl',
                'font-semibold',
                'text-2xl',
                'text-center',
              ]),
            )}
          >
            {title}
          </h1>
        </div>
      </header>
      <section
        className={cc(mapTw(['prose', 'prose-sm', 'md:prose-lg', 'mx-auto']))}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
};

interface RecipeTemplateProps extends PageProps {
  data: Query;
}

const RecipeTemplate = ({ data }: RecipeTemplateProps) => {
  const recipe = data.markdownRemark!;
  const frontmatter = recipe.frontmatter!;
  const title = frontmatter.title!;
  const siteTitle = data.site!.siteMetadata!.title!;

  const pageTitle = `${siteTitle} | Recipe - ${title}`;

  return (
    <Layout pageTitle={pageTitle} siteTitle={siteTitle}>
      <Recipe title={title} content={recipe.html!} />
    </Layout>
  );
};

export default RecipeTemplate;

export const pageQuery = graphql`
  query RecipeBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
    }
  }
`;
