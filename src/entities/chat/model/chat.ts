import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { getMessagesByFilters, sendMessage } from '@/shared/api/controller/controller';
import { modifyMessage } from '@/shared/api/message-controller/message-controller';
import type {
  ChatMessageDTO,
  MessageFiltersDTO,
  OnModifyMessageDTO,
  OnSendMessageDTO,
  PagedChatMessagesDTO,
} from '@/shared/api/model';

export type Action = 'edit' | 'delete' | 'reply' | 'send';

interface ChatStore {
  state: {
    selectMessage: ChatMessageDTO | null;
    chat: PagedChatMessagesDTO;
    action: Action;
  };
  api: {
    setMessages: (message: ChatMessageDTO) => void;
    getMessages: (filters: MessageFiltersDTO) => Promise<void>;
    appendMessages: (filters: MessageFiltersDTO) => Promise<void>;
    sendMessage: (onSendMessageDTO: OnSendMessageDTO) => Promise<void>;
    setSelectMessage: (message: ChatMessageDTO | null) => void;
    setAction: (action: Action) => void;
    resetSelectMessage: () => void;
    editMessage: (onEditMessageDTO: OnModifyMessageDTO) => Promise<void>;
  };
}

export const useChatStore = create<ChatStore>()(
  immer((set, get) => ({
    state: {
      action: 'send',
      selectMessage: null,
      chat: {
        messages: [],
        current_page: 0,
        total_pages: 0,
      },
    },
    api: {
      resetSelectMessage: () => {
        set(state => {
          state.state.selectMessage = null;
          state.state.action = 'send';
        });
      },
      setAction: (action: Action) => {
        set(state => {
          state.state.action = action;
        });
      },
      setSelectMessage: (message: ChatMessageDTO | null) => {
        set(state => {
          state.state.selectMessage = message;
        });
      },
      editMessage: async (onEditMessageDTO: OnModifyMessageDTO) => {
        try {
          await modifyMessage(onEditMessageDTO);
          set(state => {
            state.state.chat.messages = state.state.chat.messages?.map(message =>
              message.message_id === onEditMessageDTO.message_id
                ? { ...message, content: onEditMessageDTO.content }
                : message,
            );
          });
        } catch (e) {
          console.error(e);
        }
      },
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
