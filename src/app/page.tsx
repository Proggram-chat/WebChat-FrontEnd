'use client';
import { useRouter } from 'next/navigation';

import { useSessionStore } from '@/shared/store/session';

export default function Home() {
  const { user_id } = useSessionStore();
  const router = useRouter();

  user_id ? router.push('/client') : router.push('/login');
}
