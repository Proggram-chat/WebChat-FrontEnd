'use client';

import { useEffect } from 'react';

import { ChatCard } from '@/entities/chat';
import { DeleteChat } from '@/features/chat/deleteChat';
import type { MemberChatsDTO } from '@/shared/api/model';
import { ContextMenuItem } from '@/shared/components/ui/context-menu';
import { useChatListStore } from '@/shared/store/chat';
import { useSidebar } from '@/widgets/sidebar/model';

export default function ChatList({ id }: { id: string }) {
  const { getChatList } = useSidebar();
  const { chatList } = useChatListStore();

  useEffect(() => {
    getChatList(id);
  }, []);

  return chatList?.map((chat: MemberChatsDTO, i: number) => (
    <ChatCard
      {...chat}
      contextMenuItems={
        <ContextMenuItem>{chat?.chat_id && <DeleteChat id={chat?.chat_id} />}</ContextMenuItem>
      }
      key={i}
    />
  ));
}
