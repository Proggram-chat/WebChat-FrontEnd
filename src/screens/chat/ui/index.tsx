"use client";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { FromMessage, ToMessage } from "@/entities/message";
import { ChatInfo } from "@/widgets/chatInfo/ui";
import { sendMessage } from "@/shared/api/controller/controller";

export const Chat = ({ id }: { id: string }) => {
  return (
    <div className="max-h-screen">
      <ChatInfo />
      <div className="relative p-4 flex-col flex-grow justify-between flex ">
        <div className="max-h-screen h-full flex flex-col gap-4 relative">
          <FromMessage />
          <ToMessage />
        </div>
        <div className="relative bottom-0 h-[80px] mb-auto w-full ">
          <Textarea
            className="resize-none h-full"
            placeholder="Enter your message"
            action={
              <Button
                onClick={() =>
                  sendMessage({
                    chat_id: "c04eacda-2d6e-4f98-bbc2-3fbcad3e81c5",
                    author_id: "e0afeb8b-307e-4a4d-a8f4-9c9f5e34b2b3",
                    content: "dwqdwq",
                  })
                }
                size="icon"
              >
                <PaperPlaneIcon />
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
