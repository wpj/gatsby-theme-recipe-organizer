# gatsby-theme-recipe-organizer

Gatsby theme for authoring, editing, and viewing markdown recipes with
[netlify-cms](https://www.netlifycms.org/).

**WARNING**: This project is in very early stages; breaking changes may be
introduced in the future.

## Install

`yarn add gatsby-theme-recipe-organizer`

## How to use

Add the plugin to your `gatsy-config.js`:

```javascript
plugins: [`gatsby-theme-recipe-organizer`];
```

## Options

- `contentPath`: (default: `"recipes"`) path to a directory of markdown files.
  This path must be relative to the root of your Gatsby site. When you first
  start or build your Gatsby site, if this directory doesn't exist on the file
  system, this theme will create the directory and place an example recipe
  inside.

- `icon`: (default: `"assets/icon.jpg"`) path to an image to use as the site's
  icon. When you first start or build your Gatsby site, if the path doesn't
  exist on the file system, this theme will write its default icon to that path.
