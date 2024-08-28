"use client";
import { ChatCard } from "@/entities/chat";

export async function ChatList() {
  return (
    <div>
      {Array.from(Array(20).keys()).map((_, i) => (
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
}
