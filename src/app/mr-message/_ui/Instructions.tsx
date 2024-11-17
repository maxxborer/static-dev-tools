import React from 'react';
import { Chip } from '@nextui-org/chip';
import { Link } from '@nextui-org/react';
import NextLink from 'next/link';

export const Instructions: React.FC = () => (
  <div className="col-span-8 mt-8 flex flex-col gap-4">
    <h2 className="font-bold">Инструкции</h2>

    <div className="inline-flex flex-wrap items-center gap-2">
      <Chip>1</Chip>
      <p>
        <Link
          as={NextLink}
          className="text-primary"
          href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html"
          rel="noopener noreferrer"
          target="_blank"
        >
          Сгенерируйте Personal Access Token
        </Link>
      </p>
    </div>

    <div className="inline-flex flex-wrap items-center gap-2">
      <Chip>2</Chip>
      <p>Введите Personal Access Token и URL Merge Request</p>
    </div>

    <div className="inline-flex flex-wrap items-center gap-2">
      <Chip>3</Chip>
      <p>(опционально) Введите JSON конфиг для обработки хештегов</p>
    </div>
  </div>
);
