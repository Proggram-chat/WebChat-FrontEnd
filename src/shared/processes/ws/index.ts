'use client';
import type { SubscriptionStateContext } from 'centrifuge';
import { SubscriptionState } from 'centrifuge';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useCentrifugeStore } from '@/shared/store/chat/centrifuge';

export const WSMessagesProcess = ({ children }: { children: ReactNode }) => {
  const { state, api } = useCentrifugeStore();

  useEffect(() => {
    if (!state.centrifuge || !state.channelToken) {
      return;
    }

    const sub = state.centrifuge.newSubscription(state.channelToken, {
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
  }, [state.centrifuge, state.channelToken]);

  return children;
};
