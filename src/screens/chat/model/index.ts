import { useEffect, useRef, useState } from 'react';
import type Scrollbars from 'react-custom-scrollbars-2';

import { useChatStore } from '@/entities/chat';
import type { OnSendMessageDTO } from '@/shared/api/model';
import { useSessionStore } from '@/shared/store/session';

interface useChatProps {
  chat_id: string;
}

export const useChat = ({ chat_id }: useChatProps) => {
  const { api, state } = useChatStore();
  const { user_id } = useSessionStore();
  const current_page = state.chat.current_page ?? 1;
  const total_pages = state.chat.total_pages ?? 1;

  const [currentPage, setCurrentPage] = useState<number>(current_page);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const scrollbarRef = useRef<Scrollbars>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        api.resetSelectMessage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const sendContent = async (data: OnSendMessageDTO) => {
    api.setSelectMessage(null);
    api.setAction('send');
    if (state.action === 'edit') {
      await api.editMessage({
        message_id: state.selectMessage?.message_id ?? '',
        content: data.content,
      });

      return;
    } else if (state.action === 'send') {
      await api.sendMessage({
        chat_id: chat_id,
        content: data.content,
        attachments: [],
        sender_id: user_id!,
      });
    }
  };

  useEffect(() => {
    api
      .getMessages({ limit: 20, chat_id: chat_id, offset: 0, message: '', saved: false })
      .then(() => setLoading(false))
      .catch(error => {
        console.error('Failed to fetch initial messages:', error);
        setLoading(false);
      });
  }, [chat_id, api]);

  useEffect(() => {
    const scrollbar = scrollbarRef.current;
    if (scrollbar) {
      scrollbar.scrollToBottom();
    }
  }, [loading, state.chat.messages?.length]);

  const handleLoadMoreMessages = async () => {
    if (!loadingMore && currentPage < total_pages) {
      setLoadingMore(true);
      const scrollbar = scrollbarRef.current;

      const previousScrollHeight = scrollbar?.getScrollHeight() ?? 0;
      const previousScrollTop = scrollbar?.getScrollTop() ?? 0;

      try {
        await api.appendMessages({
          limit: 20,
          chat_id: chat_id,
          offset: currentPage,
          message: '',
          saved: false,
        });
        setCurrentPage(prevState => prevState + 1);
      } catch (error) {
        console.error('Failed to load more messages:', error);
      } finally {
        setLoadingMore(false);
        if (scrollbar) {
          const newScrollHeight = scrollbar.getScrollHeight();
          scrollbar.scrollTop(previousScrollTop + (newScrollHeight - previousScrollHeight));
        }
      }
    }
  };

  const handleScroll = () => {
    const scrollbar = scrollbarRef.current;
    if (scrollbar) {
      const { scrollTop, scrollHeight } = scrollbar.getValues();
      if (scrollTop < scrollHeight * 0.25 && !loadingMore) {
        handleLoadMoreMessages().catch(error =>
          console.log('Error while loading more messages:', error),
        );
      }
    }
  };

  return {
    handleScroll,
    sendContent,
    loadingMore,
    loading,
    api,
    scrollbarRef,
    state,
    user_id,
  };
};
