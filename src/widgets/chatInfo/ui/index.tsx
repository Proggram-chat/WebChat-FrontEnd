interface ChatInfoProps {
  name?: string;
  lastSeen?: string;
  members?: string[];
}

export const ChatInfo = ({ name, members, lastSeen }: ChatInfoProps) => {
  return (
    <div className="flex justify-center shadow-sm w-full h-full items-center max-h-[50px]">
      ChatInfo
    </div>
  );
};
