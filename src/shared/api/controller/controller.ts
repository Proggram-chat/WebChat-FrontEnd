/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * Webchat REST API
 * Webchat application
 * OpenAPI spec version: 3.0
 */
import { customInstance } from '.././custom-instance';
import type {
  ChatCreatedDTO,
  ChatMemberDTO,
  CreateChatDTO,
  FileSearchDTO,
  FileURLDTO,
  GetChatMembersParams,
  GetTokenParams,
  JoinChatDTO,
  LeaveChatDTO,
  MemberChatsDTO,
  MessageCreatedDTO,
  MessageFiltersDTO,
  OnSendMessageDTO,
  PagedChatMessagesDTO,
  UploadedFilesDTO,
  UploadFilesBody,
} from '.././model';

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export const uploadFiles = (
  uploadFilesBody: UploadFilesBody,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<UploadedFilesDTO>(
    {
      url: `/api/v1/upload`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: uploadFilesBody,
    },
    options,
  );
};

export const sendMessage = (
  onSendMessageDTO: OnSendMessageDTO,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<MessageCreatedDTO>(
    {
      url: `/api/v1/message`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: onSendMessageDTO,
    },
    options,
  );
};

export const getMessagesByFilters = (
  messageFiltersDTO: MessageFiltersDTO,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<PagedChatMessagesDTO>(
    {
      url: `/api/v1/message/search`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: messageFiltersDTO,
    },
    options,
  );
};

export const getFileURLs = (
  fileSearchDTO: FileSearchDTO,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<FileURLDTO[]>(
    {
      url: `/api/v1/file/search`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: fileSearchDTO,
    },
    options,
  );
};

export const createChat = (
  createChatDTO: CreateChatDTO,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<ChatCreatedDTO>(
    {
      url: `/api/v1/chat`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createChatDTO,
    },
    options,
  );
};

export const leaveChat = (
  leaveChatDTO: LeaveChatDTO,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<void>(
    {
      url: `/api/v1/chat/leave`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: leaveChatDTO,
    },
    options,
  );
};

export const joinChat = (
  joinChatDTO: JoinChatDTO,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<void>(
    {
      url: `/api/v1/chat/join`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: joinChatDTO,
    },
    options,
  );
};

export const getToken = (
  params: GetTokenParams,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<string>({ url: `/api/v1/token`, method: 'GET', params }, options);
};

export const getAllChatsByMember = (
  id: string,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<MemberChatsDTO[]>(
    { url: `/api/v1/member/${id}/chats`, method: 'GET' },
    options,
  );
};

export const getChatMembers = (
  id: string,
  params?: GetChatMembersParams,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<ChatMemberDTO[]>(
    { url: `/api/v1/chat/${id}/members`, method: 'GET', params },
    options,
  );
};

export const deleteChat = (id: string, options?: SecondParameter<typeof customInstance>) => {
  return customInstance<void>({ url: `/api/v1/chat/${id}`, method: 'DELETE' }, options);
};

export type UploadFilesResult = NonNullable<Awaited<ReturnType<typeof uploadFiles>>>;
export type SendMessageResult = NonNullable<Awaited<ReturnType<typeof sendMessage>>>;
export type GetMessagesByFiltersResult = NonNullable<
  Awaited<ReturnType<typeof getMessagesByFilters>>
>;
export type GetFileURLsResult = NonNullable<Awaited<ReturnType<typeof getFileURLs>>>;
export type CreateChatResult = NonNullable<Awaited<ReturnType<typeof createChat>>>;
export type LeaveChatResult = NonNullable<Awaited<ReturnType<typeof leaveChat>>>;
export type JoinChatResult = NonNullable<Awaited<ReturnType<typeof joinChat>>>;
export type GetTokenResult = NonNullable<Awaited<ReturnType<typeof getToken>>>;
export type GetAllChatsByMemberResult = NonNullable<
  Awaited<ReturnType<typeof getAllChatsByMember>>
>;
export type GetChatMembersResult = NonNullable<Awaited<ReturnType<typeof getChatMembers>>>;
export type DeleteChatResult = NonNullable<Awaited<ReturnType<typeof deleteChat>>>;
