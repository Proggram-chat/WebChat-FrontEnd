import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import type { ZodType } from 'zod';
import { z } from 'zod';

import { Input } from '@/shared/components/ui/input';

type Message = {
  content: string;
};

const schema: ZodType<Message> = z.object({
  content: z.string().min(1, {
    message: 'Message must be at least 1 character.',
  }),
});

interface SendMessageFormProps {
  actions: ReactNode;
  preview?: ReactNode;
  onUploadFiles?: () => void;
  onSubmit: (data: Message) => void;
  onSendMessageSuccess?: () => void;
}

export const SendMessageForm = ({ actions, onSubmit, preview }: SendMessageFormProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Message>({
    resolver: zodResolver(schema),
  });
  const handleOnSubmit = (data: Message) => {
    onSubmit(data);
    resetField('content');
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(handleOnSubmit)}>
      {preview}
      <Input
        {...register('content')}
        autoComplete="off"
        className="h-[40px]"
        action={actions}
        placeholder="Enter your message"
      />
    </form>
  );
};
