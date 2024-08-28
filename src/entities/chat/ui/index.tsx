'use client';
import moment from 'moment';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Simulate } from 'react-dom/test-utils';

import type { MemberChatsDTO } from '@/shared/api/model';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from '@/shared/components/ui/context-menu';
import { trimText } from '@/shared/lib/helpers/trimText';
import resize = Simulate.resize;

interface ChatCardProps extends MemberChatsDTO {
  contextMenuItems?: ReactNode;
}

export const ChatCard = ({
  chat_id,
  chat_name,
  chat_type,
  sent_at,
  member_nickname,
  text_preview,
  message_id,
  contextMenuItems,
}: ChatCardProps) => {
  const [isCompact, setIsCompact] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (containerRef.current) {
      setIsCompact(containerRef.current.offsetWidth < 140);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  const formatDate = (date?: string) => {
    const now = moment();
    const commentDate = moment(date);
    if (now.diff(commentDate, 'hours') < 24) {
      return commentDate.fromNow();
    } else {
      return commentDate.subtract(10, 'days').calendar();
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          href={`/client/${chat_id}`}
          className="w-full flex items-center gap-4 px-4 py-4 hover:bg-black/5 transition duration-100 justify-center"
        >
          <Avatar>
            <AvatarImage src={member_nickname} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {!isCompact && text_preview ? (
            <div className="w-full" ref={containerRef}>
              <span className="flex w-full justify-between">
                <h3 className="text-[14px] font-bold">{chat_name}</h3>
                <p className="text-[12px] opacity-50">{formatDate(sent_at)}</p>
              </span>
              <p className="text-[12px]">
                <span className="opacity-60">Last message:</span> {trimText(text_preview, 35)}
              </p>
            </div>
          ) : null}
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>{contextMenuItems}</ContextMenuContent>
    </ContextMenu>
  );
};
