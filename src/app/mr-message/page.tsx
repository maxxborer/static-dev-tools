'use client';

import React, { useCallback } from 'react';
import { Input, Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

import { SmartSpinner } from '~/components/smart-spinner';

import { getErrorMessage } from './_lib/getErrorMessage';
import { hashtagsConfigPlaceholder } from './_model/constants/hashtagsConfigPlaceholder';
import { MessageSnippet } from './_ui/MessageSnippet';
import { Instructions } from './_ui/Instructions';
import { HashtagsConfigTable } from './_ui/HashtagsConfigTable';
import { useMessageForm } from './_model/useMessageForm';
import { type FormFields } from './_model/schemas/formSchema';

export default function MrMessage() {
  const { isSavedFormLoading, isMessageLoading, messageList, form, onSubmit } = useMessageForm();

  const getFormFieldNextUiProps = useCallback(
    (name: keyof FormFields) => ({
      ...form.register(name),
      errorMessage: getErrorMessage(form.formState.errors, name),
      isInvalid: !!form.formState.errors[name],
    }),
    [form],
  );

  if (isSavedFormLoading) {
    return <SmartSpinner />;
  }

  return (
    <section className="mx-auto grid max-w-5xl grid-cols-12 gap-6 p-6">
      <div className="col-span-8 flex flex-col gap-4">
        <h2 className="font-bold">Настройки сообщения</h2>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            {...getFormFieldNextUiProps('token')}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            autoComplete="on"
            label="GitLab Token"
            type="password"
          />

          <Input {...getFormFieldNextUiProps('url')} label="GitLab MR URL" type="url" />

          <Textarea
            {...getFormFieldNextUiProps('hashtagsConfig')}
            label="Hashtags Config"
            placeholder={JSON.stringify(hashtagsConfigPlaceholder, null, 2)}
            rows={10}
          />

          <Button type="submit">Сгенерировать сообщение</Button>
        </form>
      </div>

      <MessageSnippet isLoading={isMessageLoading} messageList={messageList} />

      <Instructions />

      <HashtagsConfigTable />
    </section>
  );
}
