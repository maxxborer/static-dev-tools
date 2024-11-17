import { Logger } from '~/lib/logger';
import { escapeHtml } from '~/lib/security';

import { type HashtagsConfig } from '../_model/schemas/hashtagsConfigSchema';

import { generateHashtags } from './generateHashtags';

export function prepareMessageList({
  hashtagsConfig,
  projectId,
  target,
  title,
  url,
}: {
  hashtagsConfig?: HashtagsConfig | null;
  projectId: number;
  target: string;
  title: string;
  url: string;
}) {
  const logger = new Logger('prepareMessageList');

  const hashtagsList = hashtagsConfig
    ? generateHashtags({
        config: hashtagsConfig,
        projectId: Number(projectId),
        targetBranch: target,
      })
    : [];

  logger.debug(`Список тегов ${hashtagsList.length ? 'сгенерирован' : 'не сгенерирован'}`, { hashtagsList });

  const messageList = [`MR to ${target} ${hashtagsList.join(' ')}`, escapeHtml(title), escapeHtml(url)];

  logger.debug('Список сообщений готов', { messageList });

  return messageList;
}
