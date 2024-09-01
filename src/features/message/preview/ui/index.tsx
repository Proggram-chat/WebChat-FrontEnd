import { Cross1Icon } from '@radix-ui/react-icons';
import type { ReactNode } from 'react';

import { useChatStore } from '@/entities/chat';
import { Button } from '@/shared/components/ui/button';

const PreviewLayout = ({ children }: { children: ReactNode }) => {
  return <div className="px-4 py-1 w-full border-black/10">{children}</div>;
};

export const Preview = () => {
  const { state, api } = useChatStore();

  return state.action === 'edit' ? (
    <PreviewLayout>
      <span className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-[12px] text-blue/70 font-bold">Edit message: </p>
          <p className="text-[14px]">{state.selectMessage?.content}</p>
        </div>
        <Button type="button" variant="ghost" onClick={() => api.resetSelectMessage()} size="icon">
          <Cross1Icon />
        </Button>
      </span>
    </PreviewLayout>
  ) : state.action === 'send' ? null : state.action === 'reply' ? (
    <>Replying...</>
  ) : null;
};
