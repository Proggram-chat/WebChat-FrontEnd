import { create } from 'zustand';

import { getMessagesByFilters, sendMessage } from '@/shared/api/controller/controller';
import type {
  ChatMessageDTO,
  MessageFiltersDTO,
  OnSendMessageDTO,
  PagedChatMessagesDTO,
} from '@/shared/api/model';

interface ChatStore {
  state: {
    chat: PagedChatMessagesDTO;
  };
  api: {
    getMessages: (filters: MessageFiltersDTO) => Promise<void>;
    appendMessages: (filters: MessageFiltersDTO) => Promise<void>;
    sendMessage: (onSendMessageDTO: OnSendMessageDTO) => Promise<void>;
  };
}
export const useChatStore = create<ChatStore>((set, get) => ({
  state: {
    chat: {
      messages: [],
      current_page: 0,
      total_pages: 0,
    },
  },
  api: {
    getMessages: async (filters: MessageFiltersDTO) => {
      try {
        const res = await getMessagesByFilters(filters);
        set({
          state: {
            chat: res,
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
    appendMessages: async (filters: MessageFiltersDTO) => {
      const chatData = get().state.chat;
      const oldMessages: ChatMessageDTO[] = get().state.chat.messages ?? [];
      try {
        const res = await getMessagesByFilters(filters);

        const newMessages =
          res?.messages?.filter(
            newMsg => !oldMessages.some(oldMsg => oldMsg.message_id === newMsg.message_id),
          ) ?? [];

        set({
          state: {
            chat: {
              ...chatData,
              messages: [...newMessages, ...oldMessages],
              current_page: filters.offset,
            },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
    sendMessage: async (onSendMessageDTO: OnSendMessageDTO) => {
      try {
        const currentMessages: ChatMessageDTO[] = get().state?.chat?.messages ?? [];
        await sendMessage(onSendMessageDTO);
        set({
          state: {
            chat: {
              ...get().state.chat,
              messages: [...currentMessages, onSendMessageDTO],
            },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
}));
