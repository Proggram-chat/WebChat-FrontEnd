"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Skeleton } from "@/shared/components/ui/skeleton";
import Link from "next/link";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/shared/components/ui/context-menu";
import type { MemberChatsDTO } from "@/shared/api/model";

export const ChatCard = ({
  chat_id,
  chat_name,
  chat_type,
  sent_at,
  member_nickname,
  text_preview,
  message_id,
}: MemberChatsDTO) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          href={`/client/${chat_id}`}
          className={
            "w-full flex items-center gap-4 px-4 py-4 hover:bg-black/5 transition duration-100 justify-center"
          }
        >
          <Avatar>
            <AvatarImage src={member_nickname} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {text_preview ? (
            <div className="w-full">
              <span className="flex w-full justify-between">
                <h3 className="text-[14px] font-bold">{chat_name}</h3>
                <p className="text-[12px] opacity-50">{sent_at}</p>
              </span>

              <p className="text-[12px]">{text_preview}</p>
            </div>
          ) : (
            <div className="gap-2 flex-col flex">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          )}
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
