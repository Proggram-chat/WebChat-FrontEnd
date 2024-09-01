'use client';
import type { SubscriptionStateContext } from 'centrifuge';
import { SubscriptionState } from 'centrifuge';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useChatStore } from '@/entities/chat';
import { useCentrifugeStore } from '@/shared/store/chat/centrifuge';

export const WSMessagesProcess = ({ children }: { children: ReactNode }) => {
  const { state, api } = useCentrifugeStore();
  const {
    api: { setMessages },
  } = useChatStore();

  console.log(state.channelToken);
  useEffect(() => {
    if (!state.centrifuge || !state.channelToken) {
      return;
    }

    const sub = state.centrifuge.newSubscription(state.channelToken, {
      getToken: api.getPersonalChannelSubscriptionToken,
    });

    sub.on('publication', ctx => {
      const data = ctx.data;
      setMessages({
        sender_id: data.senderID,
        content: data.content,
        message_id: data.id,
        attachments: data.attachments,
      });
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
