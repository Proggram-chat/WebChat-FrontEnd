import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

export const WithIcon = ({
  icon,
  classname,
  children,
}: {
  classname?: string;
  children: ReactNode;
  icon: ReactNode;
}) => {
  return (
    <span className={cn('flex gap-2 w-full flex-row items-center', classname)}>
      {icon}
      {children}
    </span>
  );
};
