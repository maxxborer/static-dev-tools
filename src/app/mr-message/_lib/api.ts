import { Logger } from '~/lib/logger';

interface GetProjectIdParams {
  gitlabDomain: string;
  projectPath: string;
}

interface ProjectData {
  id: number;
  [key: string]: unknown;
}

async function getProjectId(
  gitlabToken: string,
  { gitlabDomain, projectPath }: GetProjectIdParams,
): Promise<number | null> {
  const logger = new Logger('api/getProjectId');
  const requestUrl = `${gitlabDomain}/api/v4/projects/${encodeURIComponent(projectPath)}`;

  logger.debug('Запрос данных проекта', { projectPath, requestUrl });
  const response = await fetch(requestUrl, {
    headers: { 'Private-Token': gitlabToken },
    method: 'GET',
  });

  logger.debug('Получены данные проекта', { response });
  if (!response.ok) {
    logger.debug('Статус не 200', { response });
    const errorText = await response.text();

    logger.error('Текст ответа', { errorText });
    throw new Error(`Не удалось получить данные проекта: ${response.status} ${response.statusText}. ${errorText}`);
  }

  logger.debug('Получены данные проекта', { response });
  const data = (await response.json()) as ProjectData;
  const id = data.id ?? null;

  if (!id) {
    logger.error('Проект не найден', { data });
    throw new Error('Проект не найден');
  }
  logger.debug('Идентификатор проекта', { id });

  return id;
}

interface GetMergeRequestDataParams {
  gitlabDomain: string;
  projectId: number;
  iid: number;
}

interface MergeRequestData {
  target_branch: string;
  title: string;
  web_url: string;
  [key: string]: unknown;
}

async function getMergeRequestData(
  gitlabToken: string,
  { gitlabDomain, projectId, iid }: GetMergeRequestDataParams,
): Promise<MergeRequestData | null> {
  const logger = new Logger('api/getMergeRequestData');
  const requestUrl = `${gitlabDomain}/api/v4/projects/${projectId}/merge_requests/${iid}`;

  logger.debug('Запрос данных MR', { projectId, iid, requestUrl });
  const response = await fetch(requestUrl, {
    headers: { 'Private-Token': gitlabToken },
    method: 'GET',
  });

  logger.debug('Получены данные MR', { response });
  if (!response.ok) {
    logger.debug('Статус не 200', { response });
    const errorText = await response.text();

    logger.error('Текст ответа', { errorText });
    throw new Error(`Не удалось получить данные MR: ${response.status} ${response.statusText}. ${errorText}`);
  }

  logger.debug('Получены данные MR', { response });
  const data = (await response.json()) as MergeRequestData;
  const result = data ?? null;

  logger.debug('Данные MR', { result });

  return result;
}

export const api = {
  getProjectId,
  getMergeRequestData,
};
