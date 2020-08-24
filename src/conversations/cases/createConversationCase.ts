import { IConversationsState, ICreateConversationAction, IConversation } from '../types';
import { conversationComparator } from '../utils/conversationComparator';

export function createConversationCase(
  state: IConversationsState,
  { conversationId, targets }: ICreateConversationAction,
): IConversationsState {
  const newState = {
    ...state,
    conversations: [...state.conversations, _conversationFactory(conversationId, targets)],
  };
  newState.conversations.sort(conversationComparator);
  return newState;
}

function _conversationFactory(
  _id: string,
  targets: string[],
  updatedAt: string = new Date().toISOString(),
): IConversation {
  return {
    _id,
    targets,
    updatedAt,
    unseenMessages: 0,
    messages: [],
  };
}
