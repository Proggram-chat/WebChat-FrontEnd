'use client';
import { Centrifuge } from 'centrifuge';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { getToken } from '@/shared/api/controller/controller';
import { useCentrifugeStore } from '@/shared/store/chat/centrifuge';
import { useSessionStore } from '@/shared/store/session';

export default function WSProvider({ children }: { children: ReactNode }) {
  const { user_id } = useSessionStore();
  const { api, state } = useCentrifugeStore();

  const getConnectionToken = async () => {
    if (!state.channelToken) {
      return '';
    }

    return await getToken({
      channel: state.channelToken,
      type: 'CONNECTION',
    });
  };

  useEffect(() => {
    if (!user_id) {
      return;
    }

    api.setChannelToken('personal:' + user_id);
  }, [user_id]);

  useEffect(() => {
    if (!user_id || !state.channelToken) {
      return;
    }

    let centrifuge: Centrifuge | null = null;

    const init = async () => {
      const wsEndpoint = process.env.WS_ENDPOINT || 'default_endpoint';

      centrifuge = new Centrifuge(wsEndpoint, {
        getToken: getConnectionToken,
        debug: true,
      });

      api.setCentrifuge(centrifuge);

      centrifuge.connect();
    };

    void init();

    return () => {
      if (centrifuge) {
        centrifuge.disconnect();
      }
    };
  }, [user_id, state.channelToken]);

  return children;
}
