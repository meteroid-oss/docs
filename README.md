# Meteroid documentation

The source of [docs.meteroid.com](https://docs.meteroid.com), built with
[perseid-docs](https://www.npmjs.com/package/perseid-docs).

```sh
npm install
npm run dev          # http://localhost:4321
npm run reference    # rebuild the API reference from the live spec and the SDKs' perseid.toml
npm run build        # static site in dist/
```

- Pages are Markdown and MDX under `src/content/docs/`; navigation and the header are in
  `astro.config.mjs`.
- The API reference comes from `reference.json`: the OpenAPI spec plus each SDK's names,
  signatures and samples, from `perseid docs-data`. CI rebuilds it on every run, daily, and
  when an SDK is released (`repository_dispatch` of type `sdk-released`).
