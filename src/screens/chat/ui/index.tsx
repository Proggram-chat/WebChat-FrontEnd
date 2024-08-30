'use client';
import Scrollbars from 'react-custom-scrollbars-2';

import { SendMessageForm } from '@/features/message/sendMessage';
import { useChat } from '@/screens/chat/model';
import Message from '@/shared/components/ui/message';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { formatDate } from '@/shared/lib/helpers/formatData';
import { ChatInfo } from '@/widgets/chatInfo';

const SkeletonMessage = () => <Skeleton className="w-full h-full flex space-x-4" />;

export const Chat = ({ id }: { id: string }) => {
  const { loading, handleScroll, scrollbarRef, state, user_id } = useChat({
    chat_id: id,
  });

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
                    type={user_id === message.sender_id ? 'to' : 'from'}
                    avatar=""
                    content={message.content}
                    data={formatDate(message.sent_at)}
                  />
                ))}
          </div>
        </Scrollbars>
        <div className="flex-shrink-0">
          <SendMessageForm />
        </div>
      </div>
    </div>
  );
};
