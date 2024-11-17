import { type HashtagsConfig } from '../schemas/hashtagsConfigSchema';

export const hashtagsConfigPlaceholder: HashtagsConfig = {
  initial: ['#feature_branch'],
  rules: [
    {
      projectIds: [123, 321],
      targetRegex: '^(master|main)$',
      add: ['#master_branch'],
      remove: ['#feature_branch'],
    },
  ],
};
