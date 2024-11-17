'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { loadFormFromStorage, saveFormInStorage } from '../_lib/storage';
import { fetchMessage } from '../_lib/fetchMessage';

import { type FormFields, formSchema } from './schemas/formSchema';

export const useMessageForm = () => {
  const [isSavedFormLoading, setIsSavedFormLoading] = useState(true);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [messageList, setMessageList] = useState<string[]>([]);

  const form = useForm<FormFields>({
    disabled: isSavedFormLoading || isMessageLoading,
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const savedForm = loadFormFromStorage();

    if (savedForm) {
      const initialValues = {
        token: String(savedForm.token),
        url: `${savedForm.url.gitlabDomain}/${savedForm.url.projectPath}/-/merge_requests/${savedForm.url.iid}`,
        hashtagsConfig: JSON.stringify(savedForm.hashtagsConfig, null, 2),
      };

      // @ts-expect-error
      form.reset(initialValues);
    }

    setIsSavedFormLoading(false);
  }, [form, form.reset]);

  async function onSubmit(formValues: FormFields) {
    setIsMessageLoading(true);

    try {
      saveFormInStorage(formValues);
    } catch (error) {
      toast.error('Ошибка при сохранении данных в localStorage: ' + String(error));
    }

    try {
      const { data, error } = await fetchMessage(formValues);

      if (error) {
        throw new Error('Ошибка при загрузке данных: ' + error.message);
      }

      if (!data) {
        throw new Error('Не удалось получить данные.');
      }

      await navigator.clipboard.writeText(data.join('\n\n'));
      toast.success('Сообщение скопировано в буфер обмена.');
      setMessageList(data);
    } catch (error) {
      toast.error(String(error));
    } finally {
      setIsMessageLoading(false);
    }
  }

  return {
    isSavedFormLoading,
    isMessageLoading,
    messageList,
    form,
    onSubmit,
  };
};
