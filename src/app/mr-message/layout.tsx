import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GitLab MR Message',
};

export default function MrMessageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
