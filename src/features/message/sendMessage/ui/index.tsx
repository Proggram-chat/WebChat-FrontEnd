import { zodResolver } from '@hookform/resolvers/zod';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import type { ZodType } from 'zod';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { useChatStore } from '@/shared/store/chat/chat';

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
    formState: { errors },
  } = useForm<Message>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Message) => {
    try {
      await api.sendMessage({
        chat_id: 'c04eacda-2d6e-4f98-bbc2-3fbcad3e81c5',
        author_id: 'e0afeb8b-307e-4a4d-a8f4-9c9f5e34b2b3',
        content: data.content,
      });
    } catch {
      console.log('Message not sent');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        {...register('content')}
        className="resize-none h-full"
        onKeyDown={handleKeyDown}
        action={
          <Button type="submit" size="icon">
            <PaperPlaneIcon />
          </Button>
        }
        placeholder="Enter your message"
      />
    </form>
  );
};
