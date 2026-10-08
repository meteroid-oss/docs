# Meteroid documentation

The source of [docs.meteroid.com](https://docs.meteroid.com), built with
[perseid-docs](https://www.npmjs.com/package/perseid-docs).

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # static site in dist/
```

- Guides are Markdown and MDX under `src/content/docs/`; navigation and the header are in
  `astro.config.mjs`.
- `api/` holds the OpenAPI spec and each SDK's names, signatures and samples
  (`perseid docs-data`). The SDKs' orchestrator writes it with a pull request when the SDKs are
  released: don't edit it by hand.
- Every merge to `main` builds and deploys the site.
