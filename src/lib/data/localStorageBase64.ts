import { Logger } from '~/lib/logger';
import { base64 } from '~/lib/data/base64';

const logger = new Logger('localStorageBase64');

export const localStorageBase64 = {
  get(key: string) {
    logger.debug('Попытка получить данные', { key });

    return base64.decode(localStorage.getItem(key) ?? '');
  },
  set(key: string, value: string) {
    logger.debug('Попытка сохранить данные', { key, value });

    localStorage.setItem(key, base64.encode(value));
  },
};
