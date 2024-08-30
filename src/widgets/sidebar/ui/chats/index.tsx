'use client';

import { useEffect } from 'react';

import { ChatCard, useChatListStore } from '@/entities/chat';
import { DeleteChat } from '@/features/chat/deleteChat';
import type { MemberChatsDTO } from '@/shared/api/model';
import { ContextMenuItem } from '@/shared/components/ui/context-menu';
import { useSidebar } from '@/widgets/sidebar/model';

export default function ChatList() {
  const { getChatList } = useSidebar();
  const { chatList } = useChatListStore();

  useEffect(() => {
    getChatList('');
  }, []);

  return chatList?.map((chat: MemberChatsDTO, i: number) => (
    <ChatCard
      {...chat}
      contextMenuItems={
        <ContextMenuItem>
          {chat?.chat_id && <DeleteChat key={chat.chat_id} id={chat?.chat_id} />}
        </ContextMenuItem>
      }
      key={i}
    />
  ));
}
