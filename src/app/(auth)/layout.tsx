import { AuthLayout } from '@/components/Layout';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
