"use server";
import { ChatCard } from "@/entities/chat";
import { getAllChatsByMember } from "@/shared/api/controller/controller";

export default async function ChatList() {
  const chats = await getAllChatsByMember(
    "e0afeb8b-307e-4a4d-a8f4-9c9f5e34b2b3",
  );
  console.log(chats);
  // const chats = Array.from(Array(20).keys()).map((_, i) => ({
  //   id: String(i),
  //   data: "91.321231",
  //   chatName: "Chat Name",
  //   lastMessage: "Чат создан нахуй",
  // }));

  return (
    <div>
      {/*{chats.map((chat, i) => (*/}
      {/*  <ChatCard*/}
      {/*    key={i}*/}
      {/*    id={chat.id}*/}
      {/*    data={chat.data}*/}
      {/*    chatName={chat.chatName}*/}
      {/*    lastMessage={chat.lastMessage}*/}
      {/*  />*/}
      {/*))}*/}
    </div>
  );
}
