import { IConversationsState } from '../types';

export function defaultConversationsState(): IConversationsState {
  return {
    conversations: [],
    unseenMessages: 0,
  };
}
