import { MainLayout } from '@/components/mainLayout';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return <MainLayout>{children}</MainLayout>;
}
