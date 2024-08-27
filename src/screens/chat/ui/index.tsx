import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { FromMessage, ToMessage } from "@/entities/message";

export const Chat = ({ id }: { id: string }) => {
  return (
    <div className="relative p-4 flex-col justify-between flex h-screen">
      <div className="h-screen flex flex-col gap-4 relative">
        <FromMessage />
        <ToMessage />
      </div>
      <div className="relative h-[80px] w-full ">
        <Textarea
          className="resize-none h-full"
          placeholder="Enter your message"
          action={
            <Button size="icon">
              <PaperPlaneIcon />
            </Button>
          }
        />
      </div>
    </div>
  );
};
