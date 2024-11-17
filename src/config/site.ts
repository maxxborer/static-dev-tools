export type SiteConfig = typeof siteConfig;

const toolsList = [
  {
    name: 'GitLab MR Message',
    href: '/mr-message',
    description: 'Генератор сообщений GitLab MR.',
    emoji: '💬',
    screenshot: '/preview/mr-message.png',
  },
] as const;

export const siteConfig = {
  name: 'Static Dev Tools',
  description: 'Инструменты для уменьшения рутины',
  toolsList,
};
