import { create } from 'zustand';

import { getToken } from '@/shared/api/controller/controller';

interface Centrifuge {
  api: {
    getSubscriptionToken: (channel: string) => Promise<string>;
    getPersonalChannelSubscriptionToken: () => Promise<string>;
    setChannelToken: (token: string) => void;
  };
  state: {
    channelToken: string | null;
  };
}

export const useCentrifugeStore = create<Centrifuge>((set, get) => ({
  state: {
    channelToken: '',
  },
  api: {
    setChannelToken: (token: string) => {
      set({ state: { channelToken: token } });
    },
    getSubscriptionToken: async (channel: string) => {
      const res = await getToken({
        channel: channel,
        type: 'SUBSCRIPTION',
      });

      return res;
    },
    getPersonalChannelSubscriptionToken: async () => {
      const channelToken = get().state.channelToken || '';

      if (channelToken) {
        return await get().api.getSubscriptionToken(channelToken);
      }

      console.log('getPersonalChannelSubscriptionToken');

      return '';
    },
  },
}));
