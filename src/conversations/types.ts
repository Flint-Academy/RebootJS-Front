export interface IConversationMessage {
  _id: string;
  conversationId: string;
  createdAt: string;
  emitter: string;
  targets: string[];
  content: string;
}

export interface IConversation {
  _id: string;
  targets: string[];
  updatedAt: string;
  unseenMessages: number;
  messages: IConversationMessage[];
}

export type IConversationsStatus = 'unavailable' | 'ready' | 'sending' | 'error';

export interface IConversationsState {
  conversations: IConversation[];
  unseenMessages: number;
}

export const UPDATE_CONVERSATIONS = 'UPDATE_CONVERSATIONS';
export const CREATE_CONVERSATION = 'CREATE_CONVERSATION';

export interface IUpdateConversationsAction {
  type: typeof UPDATE_CONVERSATIONS;
  conversations: IConversation[];
}

export interface ICreateConversationAction {
  type: typeof CREATE_CONVERSATION;
  conversationId: string;
  targets: string[];
}

export type IConversationsAction = IUpdateConversationsAction
  | ICreateConversationAction;
