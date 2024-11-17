import { Logger } from '~/lib/logger';

import { type HashtagsConfig } from '../_model/schemas/hashtagsConfigSchema';

export function generateHashtags({
  config,
  projectId,
  targetBranch,
}: {
  config: HashtagsConfig;
  projectId: number;
  targetBranch: string;
}) {
  const logger = new Logger('generateHashtags');

  logger.debug('Получены данные для генерации тегов', { config, projectId, targetBranch });

  const hashtags = new Set(config.initial || []);

  logger.debug('Теги получены', { hashtags });

  config.rules.forEach((rule) => {
    try {
      const { projectIds, targetRegex, add, remove } = rule;

      if (!projectIds?.length) {
        return;
      }

      const projectIdMatches = projectIds.includes(projectId);

      let branchMatches = true;

      if (targetRegex) {
        try {
          const regex = new RegExp(targetRegex);

          branchMatches = regex.test(targetBranch);
        } catch (error) {
          const errorMessage = `Некорректное регулярное выражение в targetRegex: ${targetRegex} ${error instanceof Error ? error.message : String(error)}`;

          logger.error(errorMessage);
          throw new Error(errorMessage);
        }
      }

      if (projectIdMatches && branchMatches) {
        if (add) {
          add.forEach((tag) => hashtags.add(tag));
        }
        if (remove) {
          remove.forEach((tag) => hashtags.delete(tag));
        }
      }
    } catch (error) {
      logger.error('Ошибка при обработке правила', { error });
    }
  });

  logger.debug('Теги сгенерированы', { hashtags });

  return [...hashtags];
}
