'use client';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useRef } from 'react';

import type { MemberChatsDTO } from '@/shared/api/model';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from '@/shared/components/ui/context-menu';
import { formatDate } from '@/shared/lib/helpers/formatData';
import { trimText } from '@/shared/lib/helpers/trimText';

interface ChatCardProps extends MemberChatsDTO {
  contextMenuItems?: ReactNode;
  isCompact?: boolean;
}

export const ChatCard = ({
  chat_id,
  chat_name,
  chat_type,
  sent_at,
  member_nickname,
  text_preview,
  message_id,
  isCompact,
  contextMenuItems,
}: ChatCardProps) => {
  const containerRef = useRef<HTMLAnchorElement>(null);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          href={`/client/${chat_id}`}
          ref={containerRef}
          className="w-full flex items-center gap-4 px-4 py-4 hover:bg-black/5 transition duration-100 justify-center"
        >
          <Avatar>
            <AvatarImage src={member_nickname} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {!isCompact && text_preview ? (
            <div className="w-full">
              <span className="flex w-full flex-wrap justify-between">
                <h3 className="text-[14px] font-bold">{chat_name}</h3>
                <p className="text-[12px] opacity-50">{formatDate(sent_at)}</p>
              </span>
              <p className="text-[12px] break-words break-all  flex">
                {trimText(text_preview, 35)}
              </p>
            </div>
          ) : null}
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>{contextMenuItems}</ContextMenuContent>
    </ContextMenu>
  );
};
