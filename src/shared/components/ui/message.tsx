import Image from 'next/image';

import { Skeleton } from '@/shared/components/ui/skeleton';
import { cn } from '@/shared/lib/utils';

type MessageType = 'from' | 'to';

interface MessageProps {
  type?: MessageType;
  content?: string;
  avatar?: string;
  data?: string;
}

export default function Message({ type, avatar, data, content }: MessageProps) {
  return (
    <div className="flex gap-2">
      {avatar ? (
        <Image
          src={avatar}
          alt="avatar"
          width={32}
          height={32}
          className="rounded max-h-[32px] max-w-[32px] object-center object-cover"
        />
      ) : (
        <Skeleton className="rounded-full max-h-[32px] max-w-[32px]" />
      )}

      <div
        className={cn(
          type === 'from'
            ? 'right-0 mr-auto  bg-[#F2F2F7]'
            : 'right-0 mr-auto text-white bg-[#007AFF]',
          'relative p-2 rounded-xl w-fit',
        )}
      >
        <span className="text-[14px] flex flex-col">
          <p>{content}</p>
          <li className="text-[10px] flex items-center justify-end opacity-40 list-none">{data}</li>
        </span>
      </div>
    </div>
  );
}
