

import { ReactNode } from 'react';
import { DefaultLayout } from '@/components/Layout';

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return <DefaultLayout>{children}</DefaultLayout>;
}