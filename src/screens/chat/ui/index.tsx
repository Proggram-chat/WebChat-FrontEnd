'use client';
import { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import { SendMessageForm } from '@/features/message/sendMessage';
import Message from '@/shared/components/ui/message';
import { useChatStore } from '@/shared/store/chat/chat';
import { useSessionStore } from '@/shared/store/session';
import { ChatInfo } from '@/widgets/chatInfo';

const SkeletonMessage = () => <div className="animate-pulse flex space-x-4" />;

export const Chat = ({ id }: { id: string }) => {
  const { api, state } = useChatStore();
  const { user_id } = useSessionStore();

  const current_page = state.chat.current_page ?? 1;
  const total_pages = state.chat.total_pages ?? 1;

  const [currentPage, setCurrentPage] = useState<number>(current_page);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const scrollbarRef = useRef<Scrollbars>(null);

  useEffect(() => {
    api
      .getMessages({ limit: 20, chat_id: id, offset: 0, message: '', saved: false })
      .then(() => setLoading(false))
      .catch(error => {
        console.error('Failed to fetch initial messages:', error);
        setLoading(false);
      });
  }, [id, api]);

  useEffect(() => {
    const scrollbar = scrollbarRef.current;
    if (scrollbar) {
      scrollbar.scrollToBottom();
    }
  }, [loading]);

  const handleLoadMoreMessages = async () => {
    if (!loadingMore && currentPage < total_pages + 1) {
      setLoadingMore(true);
      const scrollbar = scrollbarRef.current;

      const previousScrollHeight = scrollbar?.getScrollHeight() ?? 0;
      const previousScrollTop = scrollbar?.getScrollTop() ?? 0;

      try {
        await api.appendMessages({
          limit: 20,
          chat_id: id,
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

  return (
    <div className="max-h-screen flex flex-col h-full">
      <ChatInfo />
      <div className="relative gap-4 p-4 flex flex-col flex-grow justify-between h-full">
        <Scrollbars ref={scrollbarRef} style={{ width: '100%' }} universal onScroll={handleScroll}>
          <div className="flex-grow flex flex-col gap-4 py-2 overflow-auto">
            {loading
              ? Array.from({ length: 10 }).map((_, index) => <SkeletonMessage key={index} />)
              : state.chat.messages?.map(message => (
                  <Message
                    key={message.message_id}
                    type={
                      // @ts-expect-error
                      user_id === message.author_id || user_id === message.sender_id ? 'to' : 'from'
                    }
                    avatar=""
                    content={message.content}
                    data={message.sent_at}
                  />
                ))}
            {loadingMore && <SkeletonMessage />}
          </div>
        </Scrollbars>
        <div className="flex-shrink-0">
          <SendMessageForm />
        </div>
      </div>
    </div>
  );
};
