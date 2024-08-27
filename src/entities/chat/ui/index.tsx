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

interface ChatCardProps {
  avatar?: string;
  id: string;
  chatName?: string;
  lastMessage?: string;
  data?: string;
}

export const ChatCard = ({
  avatar,
  chatName,
  lastMessage,
  data,
  id,
}: ChatCardProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          href={`/client/${id}`}
          className={
            "w-full flex items-center gap-4 px-4 py-4 hover:bg-black/5 transition duration-100 justify-center"
          }
        >
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {lastMessage ? (
            <div className="w-full">
              <span className="flex w-full justify-between">
                <h3 className="text-[14px] font-bold">{chatName}</h3>
                <p className="text-[12px] opacity-50">011.2.233</p>
              </span>

              <p className="text-[12px]">{lastMessage}</p>
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
