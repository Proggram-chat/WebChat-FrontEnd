import { zodResolver } from '@hookform/resolvers/zod';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import type { ZodType } from 'zod';
import { z } from 'zod';

import { useChatStore } from '@/entities/chat/model/chat';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

type Message = {
  content: string;
};

const schema: ZodType<Message> = z.object({
  content: z.string().min(1, {
    message: 'Message must be at least 1 character.',
  }),
});

export const SendMessageForm = () => {
  const { api } = useChatStore();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Message>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Message) => {
    try {
      await api.sendMessage({
        chat_id: 'c04eacda-2d6e-4f98-bbc2-3fbcad3e81c5',
        sender_id: 'e0afeb8b-307e-4a4d-a8f4-9c9f5e34b2b3',
        content: data.content,
      });
      resetField('content');
    } catch {
      console.log('Message not sent');
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('content')}
        autoComplete="off"
        className="h-[40px]"
        action={
          <Button type="submit" variant="ghost" size="icon">
            <PaperPlaneIcon color="black" />
          </Button>
        }
        placeholder="Enter your message"
      />
    </form>
  );
};
