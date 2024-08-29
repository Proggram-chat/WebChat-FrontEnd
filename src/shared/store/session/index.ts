import { create } from 'zustand';

interface SessionStore {
  user_id: string | null;
}

export const useSessionStore = create<SessionStore>((setState, getState) => ({
  user_id: 'e0afeb8b-307e-4a4d-a8f4-9c9f5e34b2b3',
}));
