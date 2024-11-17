import { type FieldValues, type FieldErrors } from 'react-hook-form';

export function getErrorMessage<T extends FieldValues>(errors: FieldErrors<T>, fieldName: keyof T) {
  const error = errors[fieldName]?.message ?? (errors[fieldName]?.type === 'required' ? 'Поле обязательно' : '');

  return error;
}
