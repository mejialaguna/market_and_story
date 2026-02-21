import type { FC, JSX, ReactNode } from 'react';

import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import { ChatAssistant } from './chat-assistant';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />

      {children}

      <SiteFooter />
      <ChatAssistant />
    </div>
  );
};
