'use client';
import type { SubscriptionStateContext } from 'centrifuge';
import { Centrifuge, SubscriptionState } from 'centrifuge';
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
      // @ts-expect-error
      const sub = centrifuge.newSubscription(state.channelToken, {
        getToken: api.getPersonalChannelSubscriptionToken,
      });

      sub.on('publication', ctx => {
        console.log(ctx.data);
      });

      sub.on('state', (ctx: SubscriptionStateContext) => {
        if (ctx.newState === SubscriptionState.Subscribed) {
          console.log('🟢');
        } else {
          console.log('🔴');
        }
      });

      sub.subscribe();
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
