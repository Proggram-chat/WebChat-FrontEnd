'use client';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import { useSessionStore } from '@/shared/store/session';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { user_id } = useSessionStore();
  const router = useRouter();

  if (user_id) {
    router.push('/client');
  } else {
    router.push('/login');
  }

  return children;
}
