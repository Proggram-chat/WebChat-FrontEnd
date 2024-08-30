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
        <Skeleton className="w-[32px] h-[32px] bg-gray-300 rounded" />
      ) : (
        <Skeleton className="w-[32px] h-[32px] bg-gray-300 rounded" />
      )}

      <div className="flex flex-col">
        <li className="text-[10px] list-none">{data}</li>
        <div
          className={cn(
            type === 'from'
              ? 'right-0 mr-auto  bg-[#F2F2F7]'
              : 'right-0 mr-auto text-white bg-[#007AFF]',
            'relative p-2 rounded-xl w-fit',
          )}
        >
          <p className="text-[14px]">{content}</p>
        </div>
      </div>
    </div>
  );
}
