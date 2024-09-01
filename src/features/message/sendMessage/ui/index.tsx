import { PaperPlaneIcon } from '@radix-ui/react-icons';

import { Button } from '@/shared/components/ui/button';

export const SendMessage = () => {
  return (
    <div>
      <Button type="submit" className="rounded-[50%]" variant="ghost" size="icon">
        <PaperPlaneIcon color="black" />
      </Button>
    </div>
  );
};
