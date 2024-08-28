import { PaperPlaneIcon } from '@radix-ui/react-icons';

import { sendMessage } from '@/shared/api/controller/controller';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';

export const SendMessageForm = () => {
  return (
    <Textarea
      className="resize-none h-full"
      placeholder="Enter your message"
      action={
        <Button
          onClick={() =>
            sendMessage({
              chat_id: 'c04eacda-2d6e-4f98-bbc2-3fbcad3e81c5',
              author_id: 'e0afeb8b-307e-4a4d-a8f4-9c9f5e34b2b3',
              content: 'dwqdwq',
            })
              .then(() => console.log('Message sent'))
              .catch(() => console.log('Message not sent'))
          }
          size="icon"
        >
          <PaperPlaneIcon />
        </Button>
      }
    />
  );
};
