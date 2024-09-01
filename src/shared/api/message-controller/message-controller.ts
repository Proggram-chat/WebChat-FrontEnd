/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * Webchat REST API
 * Webchat application
 * OpenAPI spec version: 3.0
 */
import type {
  MessageCreatedDTO,
  MessageFiltersDTO,
  OnModifyMessageDTO,
  OnSendMessageDTO,
  PagedChatMessagesDTO
} from '.././model'
import { customInstance } from '.././custom-instance';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


  /**
 * Sends a message to a chat
 */
export const sendMessage = (
    onSendMessageDTO: OnSendMessageDTO,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<MessageCreatedDTO>(
      {url: `/api/v1/message`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: onSendMessageDTO
    },
      options);
    }
  /**
 * Modifies a message in a chat
 */
export const modifyMessage = (
    onModifyMessageDTO: OnModifyMessageDTO,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<void>(
      {url: `/api/v1/message`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: onModifyMessageDTO
    },
      options);
    }
  /**
 * Searches messages by filters
 */
export const getMessagesByFilters = (
    messageFiltersDTO: MessageFiltersDTO,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<PagedChatMessagesDTO>(
      {url: `/api/v1/message/search`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: messageFiltersDTO
    },
      options);
    }
  export type SendMessageResult = NonNullable<Awaited<ReturnType<typeof sendMessage>>>
export type ModifyMessageResult = NonNullable<Awaited<ReturnType<typeof modifyMessage>>>
export type GetMessagesByFiltersResult = NonNullable<Awaited<ReturnType<typeof getMessagesByFilters>>>
