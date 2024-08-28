import { create } from 'zustand';

import type { ChatMessageDTO, MessageFiltersDTO, PagedChatMessagesDTO } from '@/shared/api/model';

interface ChatStore {
  state: {
    chat: PagedChatMessagesDTO;
    messages: ChatMessageDTO[];
  };
  api: {
    getChat: (filters: MessageFiltersDTO) => Promise<void>;
    setChat: (chat: PagedChatMessagesDTO) => void;
    addMessage: (messages: ChatMessageDTO[]) => Promise<void>;
  };
}

export const useChatStore = create<ChatStore>((set, get) => ({
  state: {
    chat: {},
    messages: [],
  },
  api: {
    getChat: async (filters: MessageFiltersDTO) => {
      try {
      } catch (error) {
        console.error(error);
      }
    },
    setChat: (chat: PagedChatMessagesDTO) => {
      return '';
    },
    addMessage: async (messages: ChatMessageDTO[]) => {
      try {
      } catch (error) {
        console.error(error);
      }
    },
  },
}));
