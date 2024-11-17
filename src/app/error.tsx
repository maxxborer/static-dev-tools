'use client';

import { useEffect } from 'react';
import { Button, ButtonGroup } from '@nextui-org/button';
import NextLink from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative m-auto flex flex-col">
      <h2 className="mb-2 text-center text-2xl">Произошла ошибка</h2>

      <ButtonGroup variant="bordered">
        <Button onClick={reset}>Попробовать еще раз</Button>
        <Button as={NextLink} href="/">
          На главную
        </Button>
      </ButtonGroup>
    </main>
  );
}
