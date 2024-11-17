import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Code } from '@nextui-org/code';

export const HashtagsConfigTable: React.FC = () => (
  <div className="col-span-8 mt-8 flex flex-col gap-4">
    <h2 className="font-bold">API конфигурации хештегов</h2>

    <Table removeWrapper aria-label="Hashtags Config Table">
      <TableHeader>
        <TableColumn>Attribute</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Description</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>initial</TableCell>
          <TableCell>
            <Code>string[]</Code>
          </TableCell>
          <TableCell>Инициализационные хештеги, которые будут добавлены к ответу по умолчанию</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>rules</TableCell>
          <TableCell>
            <Code>Rule[]</Code>
          </TableCell>
          <TableCell>Правила для обработки хештегов</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>rules[].projectIds</TableCell>
          <TableCell>
            <Code>number[]</Code>
          </TableCell>
          <TableCell>Идентификаторы проектов, для которых будут применяться правила</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>rules[].targetRegex</TableCell>
          <TableCell>
            <Code>string</Code>
          </TableCell>
          <TableCell>Регулярное выражение для определения ветки слияния</TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell>rules[].add</TableCell>
          <TableCell>
            <Code>string[]</Code>
          </TableCell>
          <TableCell>Хештеги, которые будут добавлены к ответу при соответствии правилу</TableCell>
        </TableRow>
        <TableRow key="6">
          <TableCell>rules[].remove</TableCell>
          <TableCell>
            <Code>string[]</Code>
          </TableCell>
          <TableCell>Хештеги, которые будут удалены из ответа при соответствии правилу</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);
