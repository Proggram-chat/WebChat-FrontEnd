import { cn } from "@/shared/lib/utils";

type MessageType = "from" | "to";

interface MessageProps {
  type: MessageType;
  content: string;
  avatar: string;
  data: string;
}

export default function Message({ type, avatar, data, content }: MessageProps) {
  return (
    <div
      className={cn(
        type === "from"
          ? "right-0 mr-auto  bg-[#F2F2F7]"
          : "left-0 ml-auto text-white bg-[#007AFF]",
        "relative  p-2 rounded-md w-[50%]",
      )}
    >
      {content}
    </div>
  );
}
