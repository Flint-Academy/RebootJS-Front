import { IConversationsState, IEnsureConversationAction } from '../types';
import { conversationComparator } from '../utils/conversationComparator';
import { conversationFactory } from '../utils/conversationFactory';

export function ensureConversationCase(
  state: IConversationsState,
  { conversationId, targets, createdAt, messages }: IEnsureConversationAction,
): IConversationsState {
  if (state.conversations.some((c) => c._id === conversationId)) return state;
  const conversation = conversationFactory(conversationId, targets, createdAt, messages);
  const newState = {
    ...state,
    conversations: [...state.conversations.filter((c) => c._id !== conversationId), conversation],
  };
  newState.conversations.sort(conversationComparator);
  return newState;
}
