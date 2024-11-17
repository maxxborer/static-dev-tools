import { z } from 'zod';

import { getValidJSON } from '~/lib/validation/getValidJSON';

import { parseMergeRequestUrl } from '../../_lib/parseMergeRequestUrl';

import { type HashtagsConfig } from './hashtagsConfigSchema';

export const formSchema = z.object({
  token: z.string().min(1, 'Обязательное поле').max(100, 'Максимум 100 символов').trim(),
  url: z
    .string()
    .min(1, 'Обязательное поле')
    .url('Неверный URL')
    .max(255, 'Максимум 255 символов')
    .trim()
    .transform((value) => {
      try {
        return parseMergeRequestUrl(value);
      } catch {
        throw new Error('Неверный URL');
      }
    })
    .refine((data) => data !== null, { message: 'Неверный URL' }),
  hashtagsConfig: z
    .string()
    .max(1000, 'Максимум 1000 символов')
    .trim()
    .optional()
    .transform((fieldValue) => {
      if (!fieldValue) return undefined;

      const { value, valid } = getValidJSON<HashtagsConfig>(fieldValue);

      if (valid) {
        return value;
      } else {
        throw new Error('Поле конфигурации должно быть валидным JSON с правильно экранированными символами');
      }
    }),
});

export type FormFields = z.infer<typeof formSchema>;
