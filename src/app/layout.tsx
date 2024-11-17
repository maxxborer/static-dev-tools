import '~/styles/globals.css';

import { type Metadata } from 'next';
import clsx from 'clsx';

import { siteConfig } from '~/config/site';
import { fontSans } from '~/config/fonts';
import { Navbar } from '~/components/navbar';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="ru">
      <head>
        <link href="/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <meta content="MR Gen" name="apple-mobile-web-app-title" />
        <link href="/site.webmanifest" rel="manifest" />
      </head>
      <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
