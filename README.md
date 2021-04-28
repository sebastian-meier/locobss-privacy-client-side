This repo is part of the LoCobSS research project. More details about the project and dependencies to other repos can be found [here](https://github.com/sebastian-meier/LoCobSS-documentation).

# locobss-privacy-client-side
An explorable explanation for showing how to collection survey statistics without violating individuals' privacy.

This project is part of the research project LoCobSS. Learn more about the project in the central [documentation repository](https://github.com/sebastian-meier/locobss-documentation).

The live version is available here: [https://privacy.locobss.vislab.io](https://privacy.locobss.vislab.io)

## Install

```bash
npm install
```

Create a `.env` file from the .env-sample template. Paste your [Mapbox](https://www.mapbox.com) API Key.

The website is build using [Svelte](https://svelte.dev/), written in [TypeScript](https://www.typescriptlang.org).

## Run

During development:

```bash
npm run dev
```

Build for deploy:

```bash
npm run build
```

## ToDo

For better transparency and interaction flow, the request to the browser's geolocation feature could have a step in-between, with a modal informing the user that a security popup will show up asking for permission.
