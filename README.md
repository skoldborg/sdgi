# About

Website source code for the SDG Impact Assessment Tool.

[Production website](https://sdgimpactassessmenttool.org/)

## Install

```bash
npm install
```

Create a `.env.local` file based on `.env.example`. Access tokens and secrets will be provided by a developer.

## Development

```bash
npm run dev
```

Development server expects a local MongoDB at: mongodb://localhost:27017/siat

App will be available at [http://localhost:3000](http://localhost:3000).

## Authentication

Authentication is built on Auth0 and follows the strategies detailed [here](https://developer.auth0.com/resources/guides/web-app/nextjs/basic-authentication)
