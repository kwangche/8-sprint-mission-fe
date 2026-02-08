import React, { PropsWithChildren } from 'react';

import AuthHeader from '@/components/auth/AuthHeader';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto">{children}</main>
      <Footer />
    </div>
  );
}

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[540px] mx-auto">
        <AuthHeader />
        {children}
      </div>
    </div>
  );
}

const layouts = {
  DefaultLayout,
  AuthLayout,
};

export default layouts;