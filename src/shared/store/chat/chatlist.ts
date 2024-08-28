import { create } from 'zustand';

import { deleteChat, getAllChatsByMember } from '@/shared/api/controller/controller';
import type { MemberChatsDTO } from '@/shared/api/model';

interface ChatListApi {
  getChatList: (id: string) => Promise<void>;
  deleteChat: (id: string) => Promise<void>;
  joinChat: (id: string) => Promise<void>;
  createChat: (id: string) => Promise<void>;
  setChatList: (newChats: MemberChatsDTO[]) => void;
  updateChatList: (updatedChats: MemberChatsDTO[]) => void;
}

export interface ChatState {
  chatList: MemberChatsDTO[];
  api: ChatListApi;
}

export const useChatListStore = create<ChatState>((set, get) => ({
  chatList: [],
  api: {
    setChatList: (newChats: MemberChatsDTO[]) => {
      set({ chatList: newChats });
    },
    updateChatList: (updatedChats: MemberChatsDTO[]) => {
      const currentChatList = get().chatList;
      set({ chatList: [...currentChatList, ...updatedChats] });
    },
    getChatList: async (id: string) => {
      try {
        const response = await getAllChatsByMember(id);
        get().api.setChatList(response);
      } catch (error) {
        console.error(error);
      }
    },
    deleteChat: async (id: string) => {
      try {
        await deleteChat(id);
        console.log('Chat deleted successfully');
        const currentChatList = get().chatList;
        const updatedChatList = currentChatList.filter(chat => chat.chat_id !== id);
        get().api.setChatList(updatedChatList);
      } catch (error) {
        console.error(error);
      }
    },
    joinChat: async (id: string) => {
      try {
      } catch (error) {
        console.error(error);
      }
    },
    createChat: async (id: string) => {
      try {
      } catch (error) {
        console.error(error);
      }
    },
  },
}));
