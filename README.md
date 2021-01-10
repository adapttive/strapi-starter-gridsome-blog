# strapi-starter-gridsome-blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/c9301dbc-4569-42b0-a46f-b9e7f5f83a3d/deploy-status)](https://app.netlify.com/sites/strapi-starter-gridsome-blog/deploys)

This is the git repository for adapttive.com. Based on gridsome.org.

## Setup

Install Gridsome CLI to start run the project.

```shell script
npm install -g @gridsome/cli
```

## Development

- ESLint

```shell script
npm install eslint eslint-plugin-gridsome vue-eslint-parser -D

./node_modules/.bin/eslint --fix --ext .vue --ext .js ./src/
```

## Deploying the App

Click this button to deploy the app to the DigitalOcean App Platform.

 [![Deploy to DO](https://mp-assets1.sfo2.digitaloceanspaces.com/deploy-to-do/do-btn-blue-ghost.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/adapttive/strapi-starter-gridsome-blog/tree/main)

## Linting Markdown

We use [markdownlint-cli](https://www.npmjs.com/package/markdownlint-cli) to enforce style consistency rules on the documentation. The linter runs automatically on every push and pull request via [GitHub Actions](https://docs.github.com/en/actions).

To install the linter on your machine, run the following:

```shell
npm install -g markdownlint-cli@0.23.2
```

You can check your changes for linter errors by running:

```shell
markdownlint '**/*.md' --ignore node_modules
```

The linter can automatically fix certain classes of failure. To accept these fixes, run:

```shell
markdownlint '**/*.md' --ignore node_modules --fix
```
