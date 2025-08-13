# Drupal + Next.js

This project integrates Drupal as a backend CMS with Next.js as a frontend application.

To set up the local environment:
1. Start ddev (`ddev start`)
2. Install Drupal dependencies (`ddev composer install`)
3. Install Drupal site with demo content (`ddev drush si --existing-config`)
4. Create a node with `/home` alias
5. Copy `.env.example` to `.env` in the `./next` folder and set your connection parameters
6. Starts a shell session (`ddev ssh`)
7. Install Next.js dependencies in the `./next` folder (`cd next && npm install`)
8. Start Next.js dev server (`ddev run dev`)

## [Setup Drupal and NextJS](https://github.com/Chizh273/Drupal-NextJS/tree/00-setup-drupal-and-nextjs)
Prepares a Drupal site and Next.js application for local development.

## [Paragraphs page example](https://github.com/Chizh273/Drupal-NextJS/tree/01-paragraphs-page-example)
Demonstrates rendering a Drupal dynamic page with Paragraphs in Next.js.

## [Views integration](https://github.com/Chizh273/Drupal-NextJS/tree/02-views-integration)
Integrates Drupal Views with Next.js for dynamic listings.

## [Menu integration](https://github.com/Chizh273/Drupal-NextJS/tree/03-menu-integration)
Syncs Drupal menus items with into `HeaderNav` component.

## [Search API](https://github.com/Chizh273/Drupal-NextJS/tree/04-search-api)
Implements full-text and facets search using Drupal Search API.

## [Webform](https://github.com/Chizh273/Drupal-NextJS/tree/05-webform)
Integrates Drupal Contact Webform submissions in Next.js.
