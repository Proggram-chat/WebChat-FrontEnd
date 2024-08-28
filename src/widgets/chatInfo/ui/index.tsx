interface ChatInfoProps {
  name?: string;
  lastSeen?: string;
  members?: string[];
}

export const ChatInfo = ({ name, members, lastSeen }: ChatInfoProps) => {
  return <div className="flex justify-center shadow-sm w-full h-[50px]">ChatInfo</div>;
};
