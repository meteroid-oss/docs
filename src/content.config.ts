import { defineCollection } from "astro:content";
import { docsLoader, docsSchema } from "perseid-docs/content";

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
