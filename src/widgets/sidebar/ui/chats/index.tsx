"use server";
import { ChatCard } from "@/entities/chat";
import { getAllChatsByMember } from "@/shared/api/controller/controller";

export default async function ChatList() {
  const chats = await getAllChatsByMember(
    "e0afeb8b-307e-4a4d-a8f4-9c9f5e34b2b3",
  );

  return (
    <div>
      {chats.map((chat, i) => (
        <ChatCard {...chat} key={i} />
      ))}
    </div>
  );
}
