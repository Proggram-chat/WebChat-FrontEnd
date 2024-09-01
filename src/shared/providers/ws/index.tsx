'use client';
import { Centrifuge } from 'centrifuge';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { getToken } from '@/shared/api/controller/controller';
import { useCentrifugeStore } from '@/shared/store/chat/centrifuge';
import { useSessionStore } from '@/shared/store/session';

export default function WSProvider({ children }: { children: ReactNode }) {
  const { user_id } = useSessionStore();
  const { api, state } = useCentrifugeStore();
  const [connectionToken, setConnectionToken] = useState<string | null>(null);

  const getConnectionToken = useCallback(async () => {
    if (connectionToken) {
      return connectionToken;
    }

    if (!state.channelToken) {
      return '';
    }

    const token = await getToken({
      channel: state.channelToken,
      type: 'CONNECTION',
    });
    setConnectionToken(token);

    return token;
  }, [state.channelToken, connectionToken]);

  useEffect(() => {
    if (!user_id) {
      return;
    }

    api.setChannelToken('personal:' + user_id);
  }, [user_id]);

  useEffect(() => {
    if (!user_id || !state.channelToken || state.centrifuge) {
      return;
    }

    const init = async () => {
      const wsEndpoint = process.env.WS_ENDPOINT || 'default_endpoint';

      const centrifuge = new Centrifuge(wsEndpoint, {
        getToken: getConnectionToken,
        debug: false,
      });

      api.setCentrifuge(centrifuge);

      centrifuge.connect();
    };

    void init();

    return () => {
      if (state.centrifuge) {
        state.centrifuge.disconnect();
      }
    };
  }, [user_id, state.channelToken, state.centrifuge, getConnectionToken]);

  return children;
}
