import { z } from 'zod';

export const hashtagsConfigSchema = z.object({
  initial: z.array(z.string().max(100).trim()),
  rules: z.array(
    z.object({
      projectIds: z.array(z.string().transform((id) => parseInt(id, 10))),
      targetRegex: z.string().max(100).trim(),
      add: z.array(z.string().max(100).trim()),
      remove: z.array(z.string().max(100).trim()),
    }),
  ),
});

export type HashtagsConfig = z.infer<typeof hashtagsConfigSchema>;
