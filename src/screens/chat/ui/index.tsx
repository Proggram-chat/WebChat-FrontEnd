"use client";
import { ChatInfo } from "@/widgets/chatInfo/ui";

import Message from "@/shared/components/ui/message";
import { SendMessageForm } from "@/features/message/sendMessage";

export const Chat = ({ id }: { id: string }) => {
  return (
    <div className="max-h-screen flex flex-col h-full">
      <ChatInfo />
      <div className="relative p-4 flex flex-col flex-grow justify-between h-full">
        <div className="flex-grow flex flex-col gap-4 overflow-auto">
          <Message type={"from"} content={"csdadsa"} avatar={""} data={""} />
          <Message type={"to"} content={"csdadsa"} avatar={""} data={""} />
        </div>
        <div className="flex-shrink-0">
          <SendMessageForm />
        </div>
      </div>
    </div>
  );
};
