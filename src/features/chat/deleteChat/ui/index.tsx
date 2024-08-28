import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react';

import { useDeleteChat } from '@/features/chat/deleteChat/model';

export const DeleteChat = ({ id }: { id: string }) => {
  const { deleteChatHandler } = useDeleteChat(id);

  return (
    <span
      onClick={() => deleteChatHandler()}
      className="flex items-center text-red-500 gap-2 w-full"
    >
      <TrashIcon className="text-red-500" />
      <span>Delete</span>
    </span>
  );
};
