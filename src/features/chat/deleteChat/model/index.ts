import { useChatListStore } from '@/shared/store/chat';

export const useDeleteChat = (id: string) => {
  const { api } = useChatListStore();

  const deleteChatHandler = () => {
    api.deleteChat(id).catch(console.error);
  };

  return {
    deleteChatHandler,
  };
};
