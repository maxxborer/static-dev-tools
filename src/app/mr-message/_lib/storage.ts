import { localStorageBase64 } from '~/lib/data/localStorageBase64';
import { getValidJSON } from '~/lib/validation/getValidJSON';
import { Logger } from '~/lib/logger';

import { type FormFields } from '../_model/schemas/formSchema';

const STORAGE_FORM_KEY = 'mr-message-form';

export function saveFormInStorage(form: FormFields) {
  const logger = new Logger('saveFormInStorage');

  logger.debug('Попытка сохранить данные в localStorage', { form });

  try {
    localStorageBase64.set(STORAGE_FORM_KEY, JSON.stringify(form));
    logger.debug('Данные успешно сохранены в localStorage');
  } catch (error) {
    logger.error('Ошибка при сохранении данных в localStorage:', error);
  }
}

export function loadFormFromStorage(): FormFields | null {
  const logger = new Logger('loadFormFromStorage');

  try {
    const formString = localStorageBase64.get(STORAGE_FORM_KEY);

    logger.debug('Получены данные из localStorage', { formString });

    if (formString) {
      const { value, valid } = getValidJSON<FormFields>(formString);

      const result = valid ? value : null;

      logger.debug('Данные успешно загружены из localStorage', { result });

      return result;
    }
  } catch (error) {
    logger.error('Ошибка при загрузке данных из localStorage:', error);
  }

  logger.debug('Данные не найдены в localStorage');

  return null;
}
