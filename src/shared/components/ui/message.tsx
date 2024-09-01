import Image from 'next/image';

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
    <div className="flex gap-2 items-start">
      {avatar ? (
        <Image
          src={avatar}
          alt="avatar"
          width={32}
          height={32}
          className="rounded max-h-[32px] max-w-[32px] object-center object-cover"
        />
      ) : null}

      <div
        className={cn(
          type === 'from' ? 'bg-[#F2F2F7]' : 'text-white bg-[#007AFF]',
          'relative p-2 rounded-xl w-fit',
        )}
        style={{
          marginLeft: avatar ? '0' : '40px', // Додаємо відступ, коли аватар відсутній
        }}
      >
        <span className="text-[14px] flex flex-col">
          <p>{content}</p>
          <li className="text-[10px] flex items-center justify-end opacity-40 list-none">{data}</li>
        </span>
      </div>
    </div>
  );
}
