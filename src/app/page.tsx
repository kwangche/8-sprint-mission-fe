import React from 'react';

import HomePage from '@/components/pages/HomePage';
import { DefaultLayout } from '@/components/Layout';
export default function Home() {
  return (
    <DefaultLayout>
      <HomePage />
    </DefaultLayout>
  );
}