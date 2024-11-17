import { Logger } from './logger';

export function escapeHtml(input: string) {
  const logger = new Logger('escapeHtml');

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  const output = input.replace(/[&<>"']/g, (m) => String(map?.[m as keyof typeof map] ?? m));

  logger.debug('Текст успешно экранирован', { input, output });

  return output;
}
