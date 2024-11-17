import { Logger } from '~/lib/logger';

import { type FormFields } from '../_model/schemas/formSchema';

import { api } from './api';
import { prepareMessageList } from './prepareMessageList';

export async function fetchMessage({
  token,
  url,
  hashtagsConfig,
}: FormFields): Promise<{ data: string[] | null; error: Error | null }> {
  const logger = new Logger('fetchMessage');

  const { gitlabDomain, projectPath, iid } = url;

  logger.debug('Получены данные MR', {
    url,
    hashtagsConfig,
  });

  if (!iid) {
    logger.error('MR не найден');

    return { data: null, error: new Error('MR не найден') };
  }

  const projectId = await api.getProjectId(token, { gitlabDomain, projectPath });

  logger.debug('Получены данные проекта', { projectId });

  if (!projectId) {
    logger.error('Проект не найден');

    return { data: null, error: new Error('Проект не найден') };
  }

  const mrData = await api.getMergeRequestData(token, { gitlabDomain, projectId, iid: Number(iid) });

  logger.debug('Получены данные MR', { mrData });

  if (!mrData) {
    logger.error('MR не найден');

    return { data: null, error: new Error('MR не найден') };
  }

  logger.debug('Получены данные MR', { mrData });

  const { target_branch, title, web_url } = mrData;

  logger.debug('Получены данные MR', { target_branch, title, web_url });

  const resultMessage = prepareMessageList({
    hashtagsConfig,
    projectId,
    target: target_branch,
    title,
    url: web_url,
  });

  logger.debug('Список сообщений готов', { resultMessage });

  return { data: resultMessage, error: null };
}
