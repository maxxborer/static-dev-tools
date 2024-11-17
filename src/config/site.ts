export type SiteConfig = typeof siteConfig;

const toolsList = [
  {
    name: 'GitLab MR Message',
    href: '/mr-message',
    description: 'Генератор сообщений в мессенджер из GitLab MR.',
    emoji: '💬',
    screenshot: '/preview/mr-message.jpg',
  },
] as const;

export const siteConfig = {
  name: 'Static Dev Tools',
  description: 'Инструменты для уменьшения рутины',
  sources: 'https://github.com/maxxborer/static-dev-tools',
  toolsList,
};
