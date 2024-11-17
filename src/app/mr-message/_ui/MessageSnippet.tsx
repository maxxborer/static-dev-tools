import React from 'react';
import { Snippet } from '@nextui-org/snippet';
import { Skeleton } from '@nextui-org/react';
import clsx from 'clsx';

interface Props {
  isLoading: boolean;
  messageList: string[];
}

export const MessageSnippet: React.FC<Props> = ({ isLoading, messageList }) => {
  return (
    <div className="col-span-4 flex flex-col gap-4">
      <h2 className="font-bold">Сообщение</h2>
      {isLoading ? (
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
      ) : (
        <Snippet hideSymbol classNames={{ pre: clsx('min-h-12 text-wrap') }} variant="solid">
          {messageList?.length ? messageList.map((line, index) => <p key={index}>{line}</p>) : '...'}
        </Snippet>
      )}
    </div>
  );
};
