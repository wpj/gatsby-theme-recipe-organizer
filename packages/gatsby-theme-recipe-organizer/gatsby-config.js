const pkg = require('./package.json');
const child_process = require('child_process');

module.exports = ({ contentPath = 'recipes', icon = `assets/icon.png` }) => {
  let commitSha = child_process
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim();

  return {
    siteMetadata: {
      commit: commitSha,
      description: `An offline application for browsing recipes`,
      themeVersion: pkg.version,
      title: `Recipe browser`,
    },
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: contentPath,
          name: `recipes`,
        },
      },
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 590,
              },
            },
            {
              resolve: `gatsby-remark-responsive-iframe`,
              options: {
                wrapperStyle: `margin-bottom: 1.0725rem`,
              },
            },
            `gatsby-remark-copy-linked-files`,
            `gatsby-remark-smartypants`,
          ],
        },
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `Note Browser`,
          short_name: `NoteBrowser`,
          start_url: `/`,
          background_color: `#ffffff`,
          theme_color: `#663399`,
          display: `minimal-ui`,
          icon,
          cache_busting_mode: `none`,
        },
      },
      `gatsby-plugin-react-helmet`,

      {
        resolve: `gatsby-plugin-postcss`,
        options: {
          cssLoaderOptions: {
            camelCase: false,
          },
          postCssPlugins: [
            require('tailwindcss')(require.resolve('./tailwind.config')),
          ],
        },
      },

      {
        resolve: `gatsby-plugin-offline`,
        options: {
          workboxConfig: {
            runtimeCaching: [],
            globPatterns: ['**/*'],
            globIgnores: ['admin/**/*'],
          },
        },
      },

      `gatsby-plugin-netlify-cms`,
    ],
  };
};
