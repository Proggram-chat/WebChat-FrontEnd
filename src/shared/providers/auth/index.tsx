'use client';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useSessionStore } from '@/shared/store/session';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { user_id } = useSessionStore();
  const router = useRouter();

  if (user_id) {
    router.push('/client');
  } else {
    router.push('/login');
  }

  const data = JSON.stringify({
    chat_id: 'd1e5f99d-758f-4ebc-8b9d-48cb85b1b153',
    sender_id: 'e0afeb8b-307e-4a4d-a8f4-9c9f5e34b2b3',
    content: 'hello world3dsa',
  });

  const sendDataToServer = () => {
    navigator.sendBeacon(process.env.BASE_URL + '/message', data);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', sendDataToServer);

    return () => {
      window.removeEventListener('beforeunload', sendDataToServer);
    };
  }, []);

  return children;
}
