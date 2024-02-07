import { SITE } from "@config";
import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z
        .string()
        .max(64, { message: "Title must be 64 characters or less" }),
      featured: z.boolean().optional(),
      draft: z.boolean().default(true).optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      relatedPosts: z.array(reference("blog")).optional(),
    }),
});

export const collections = { blog };
