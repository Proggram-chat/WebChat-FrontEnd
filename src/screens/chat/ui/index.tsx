'use client';
import { CopyIcon, Pencil1Icon, ResetIcon } from '@radix-ui/react-icons';
import Scrollbars from 'react-custom-scrollbars-2';

import { SendMessage } from '@/features/chat/sendMessage';
import { UploadFiles } from '@/features/chat/uploadFiles';
import { Preview } from '@/features/message/preview';
import { useChat } from '@/screens/chat/model';
import { ContextMenuContent, ContextMenuItem } from '@/shared/components/ui/context-menu';
import Message from '@/shared/components/ui/message';
import { SendMessageForm } from '@/shared/components/ui/send-message-form';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { WithIcon } from '@/shared/components/ui/with-icon';
import { formatDate } from '@/shared/lib/helpers/formatData';
import { ChatInfo } from '@/widgets/chatInfo';

const SkeletonMessage = () => <Skeleton className="w-full h-full flex space-x-4" />;

export const Chat = ({ id }: { id: string }) => {
  const { loading, api, handleScroll, scrollbarRef, state, user_id, sendContent } = useChat({
    chat_id: id,
  });

  const messages = state.chat?.messages ?? [];

  return (
    <div className="max-h-screen flex flex-col h-full">
      <ChatInfo />
      <div className="relative gap-4 p-4 flex flex-col flex-grow justify-between h-full">
        <Scrollbars ref={scrollbarRef} style={{ width: '100%' }} universal onScroll={handleScroll}>
          <div className="flex-grow flex flex-col gap-4 py-2 overflow-auto">
            {loading
              ? Array.from({ length: 10 }).map((_, index) => <SkeletonMessage key={index} />)
              : messages.map((message, index) => {
                  const isLastInSequence =
                    index === messages.length - 1 ||
                    messages[index + 1]?.sender_id !== message.sender_id;

                  const showAvatar = isLastInSequence
                    ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/640px-PNG_transparency_demonstration_1.png'
                    : '';

                  return (
                    <Message
                      contextMenu={
                        <ContextMenuContent className="w-fit">
                          <ContextMenuItem>
                            <WithIcon icon={<CopyIcon />}>Copy</WithIcon>
                          </ContextMenuItem>
                          <ContextMenuItem>
                            <WithIcon icon={<ResetIcon />}>Reply</WithIcon>
                          </ContextMenuItem>
                          {user_id === message.sender_id ? (
                            <ContextMenuItem
                              onClick={() => {
                                api.setAction('edit');
                                api.setSelectMessage(message);
                              }}
                            >
                              <WithIcon icon={<Pencil1Icon />}>Edit</WithIcon>
                            </ContextMenuItem>
                          ) : null}
                        </ContextMenuContent>
                      }
                      key={message.message_id}
                      type={user_id === message.sender_id ? 'to' : 'from'}
                      avatar={showAvatar ? showAvatar : ''}
                      content={message.content}
                      data={formatDate(message.sent_at)}
                    />
                  );
                })}
          </div>
        </Scrollbars>
        <div className="flex-shrink-0">
          <SendMessageForm
            preview={<Preview />}
            onSubmit={sendContent}
            actions={
              <div className="flex gap-2">
                <UploadFiles />
                <SendMessage />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};
