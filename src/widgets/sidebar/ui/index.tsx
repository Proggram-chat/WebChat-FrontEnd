import { ChatCard } from "@/entities/chat";

export const SideBar = () => {
  return (
    <div className="w-full h-screen overflow-scroll overflow-x-auto">
      {Array.from(Array(10).keys()).map((_, i) => (
        <ChatCard
          key={i}
          id={String(i)}
          data={"91.321231"}
          chatName={"Chat Name"}
          lastMessage={"Чат создан нахуй"}
        />
      ))}
    </div>
  );
};
