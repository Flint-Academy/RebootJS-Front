import { IConversationsState, IConversationSeenAction } from '../types';
import { countUnseenMessages } from '../utils/countUnseenMessages';
import { conversationComparator } from '../utils/conversationComparator';
import { consolidateUnseenMessages } from '../utils/consolidateUnseenMessages';

export function conversationSeenCase(
  state: IConversationsState,
  { id, seenDate }: IConversationSeenAction,
): IConversationsState {
  const conversation = state.conversations.find((c) => c._id === id);
  if (!conversation) return state;

  const newConversation = {
    ...conversation,
    unseenMessages: countUnseenMessages(seenDate, conversation.messages),
  };
  const newState = {
    ...state,
    conversations: [...state.conversations.filter((c) => c._id !== id), newConversation],
  };
  newState.conversations.sort(conversationComparator);
  newState.unseenMessages = consolidateUnseenMessages(newState.conversations);
  return newState;
}
