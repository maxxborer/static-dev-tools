'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Image from 'next/image';
import { Link } from '@nextui-org/react';

import { siteConfig } from '~/config/site';

export default function Home() {
  return (
    <section className="mx-auto grid w-fit gap-4 p-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {siteConfig.toolsList.map((tool) => (
        <Link key={tool.href} className="mx-auto" href={tool.href}>
          <Card className="w-72 py-4">
            <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
              <h4 className="text-large font-bold">
                {tool.emoji} {tool.name}
              </h4>
              <small className="text-default-500">{tool.description}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt={tool.name}
                className="rounded-xl object-cover"
                height={200}
                src={tool.screenshot}
                width={270}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </section>
  );
}
