'use client';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useSessionStore } from '@/shared/store/session';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { user_id } = useSessionStore();
  const router = useRouter();

  useEffect(() => {
    if (user_id) {
      router.push('/client');
    } else {
      router.push('/login');
    }
  }, [user_id, router]);

  return <>{children}</>;
}
