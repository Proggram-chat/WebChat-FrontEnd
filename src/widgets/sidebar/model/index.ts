import { useChatListStore } from '@/entities/chat';

export const useSidebar = () => {
  const { api } = useChatListStore();

  const getChatList = (id?: string) => {
    api.getChatList(!id ? 'e0afeb8b-307e-4a4d-a8f4-9c9f5e34b2b3' : '').catch(console.error);
  };

  return { getChatList };
};
