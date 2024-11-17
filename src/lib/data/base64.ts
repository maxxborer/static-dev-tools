import { Logger } from '~/lib/logger';

const logger = new Logger('base64');

export const base64 = {
  decode(value: string) {
    logger.debug('Декодирование', { value });

    return Buffer.from(value, 'base64').toString('utf-8');
  },
  encode(value: string) {
    logger.debug('Кодирование', { value });

    return Buffer.from(value).toString('base64');
  },
};
