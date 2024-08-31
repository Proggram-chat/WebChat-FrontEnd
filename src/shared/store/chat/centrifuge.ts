import type { Centrifuge } from 'centrifuge';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { getToken } from '@/shared/api/controller/controller';

interface CentrifugeStore {
  api: {
    getSubscriptionToken: (channel: string) => Promise<string>;
    getPersonalChannelSubscriptionToken: () => Promise<string>;
    setChannelToken: (token: string) => void;
    setCentrifuge: (centrifuge: Centrifuge) => void;
  };
  state: {
    centrifuge: Centrifuge | null;
    channelToken: string | null;
  };
}

export const useCentrifugeStore = create<CentrifugeStore>()(
  immer((set, get) => ({
    state: {
      channelToken: '',
      centrifuge: null,
    },
    api: {
      setCentrifuge: (centrifuge: Centrifuge) => {
        set(state => {
          state.state.centrifuge = centrifuge;
        });
      },
      setChannelToken: (token: string) => {
        set(state => {
          state.state.channelToken = token;
        });
      },
      getSubscriptionToken: async (channel: string) => {
        return await getToken({
          channel: channel,
          type: 'SUBSCRIPTION',
        });
      },
      getPersonalChannelSubscriptionToken: async () => {
        const channelToken = get().state.channelToken || '';

        return await get().api.getSubscriptionToken(channelToken);
      },
    },
  })),
);
