type MessageType = "from" | "to";

interface Message {
  type: MessageType;
  сontent: string;
  avatar: string;
  data: string;
}

export default function Message() {}
