import { create } from 'zustand';

interface SessionStore {
  user_id: string | null;
  setUser: (user_id: string) => void;
}

export const useSessionStore = create<SessionStore>((setState, getState) => ({
  user_id: null,
  setUser: user_id => setState({ user_id: user_id }),
}));
