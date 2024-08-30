'use server';
import type { ReactNode } from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/shared/components/ui/resizable';
import { SideBar } from '@/widgets/sidebar';
import ChatList from '@/widgets/sidebar/ui/chats';

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} className="max-w-[400px] min-w-[80px]">
          <SideBar chats={<ChatList />} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
