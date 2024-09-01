'use client';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { ImperativePanelHandle } from 'react-resizable-panels';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/shared/components/ui/resizable';
import { SideBar } from '@/widgets/sidebar';
import ChatList from '@/widgets/sidebar/ui/chats';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const panelRef = useRef<ImperativePanelHandle>(null);
  const [isCompact, setIsCompact] = useState(false);

  const checkPanelSize = () => {
    if (panelRef.current) {
      const panelWidth = panelRef.current.getSize();
      if (panelWidth < 22 && !isCompact) {
        setIsCompact(true);
      } else if (panelWidth >= 22 && isCompact) {
        setIsCompact(false);
      }
    }
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsCompact(true);
    }
  }, []);

  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          maxSize={25}
          minSize={5}
          onResize={() => checkPanelSize()}
          ref={panelRef}
          defaultSize={25}
          style={{ maxWidth: isCompact ? '24px' : '400px' }}
          className="min-w-[80px]"
        >
          <SideBar isCompact={isCompact} chats={<ChatList isCompact={isCompact} />} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
