import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

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
    setMessages: (message: ChatMessageDTO) => void;
    getMessages: (filters: MessageFiltersDTO) => Promise<void>;
    appendMessages: (filters: MessageFiltersDTO) => Promise<void>;
    sendMessage: (onSendMessageDTO: OnSendMessageDTO) => Promise<void>;
  };
}

export const useChatStore = create<ChatStore>()(
  immer((set, get) => ({
    state: {
      chat: {
        messages: [],
        current_page: 0,
        total_pages: 0,
      },
    },
    api: {
      setMessages: (message: ChatMessageDTO) => {
        set(state => {
          console.log(message);
          if (state.state.chat.messages) {
            state.state.chat.messages.push(message);
          }
        });
      },
      getMessages: async (filters: MessageFiltersDTO) => {
        try {
          const res = await getMessagesByFilters(filters);
          set(state => {
            state.state.chat = res;
          });
        } catch (e) {
          console.error(e);
        }
      },
      appendMessages: async (filters: MessageFiltersDTO) => {
        const chatData = get().state.chat;
        const oldMessages: ChatMessageDTO[] = chatData.messages ?? [];
        try {
          const res = await getMessagesByFilters(filters);

          const newMessages =
            res?.messages?.filter(
              newMsg => !oldMessages.some(oldMsg => oldMsg.message_id === newMsg.message_id),
            ) ?? [];
          set(state => {
            state.state.chat.messages = [...newMessages, ...oldMessages];
            state.state.chat.current_page = filters.offset;
          });
        } catch (e) {
          console.error(e);
        }
      },
      sendMessage: async (onSendMessageDTO: OnSendMessageDTO) => {
        try {
          await sendMessage(onSendMessageDTO);
        } catch (e) {
          console.error(e);
        }
      },
    },
  })),
);
