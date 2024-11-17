import { Logger } from '~/lib/logger';

export function parseMergeRequestUrl(url: string) {
  const logger = new Logger('parseMergeRequestUrl');

  logger.debug('Попытка разбора URL', { url });

  try {
    const parsedUrl = new URL(url);
    const pathnameParts = parsedUrl.pathname.split('/');
    const projectPath = pathnameParts.slice(1, -3).join('/');
    const iid = pathnameParts[pathnameParts.length - 1];
    const gitlabDomain = parsedUrl.origin;

    const result = { gitlabDomain, projectPath, iid };

    logger.debug('URL разобран', { result });

    return result;
  } catch (error) {
    logger.error('URL не удалось разобрать', { error });

    throw error;
  }
}
