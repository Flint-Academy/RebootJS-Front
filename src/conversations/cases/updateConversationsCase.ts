import { IUpdateConversationsAction, IConversationsState } from "../types";
import { consolidateUnseenMessages } from "../utils/consolidateUnseenMessages";
import { countUnseenMessages } from "../utils/countUnseenMessages";

export function updateConversationCase(
  state: IConversationsState,
  { conversations, conversationsSeen }: IUpdateConversationsAction
): IConversationsState {
  const updated = conversations.map(c => c._id)
  conversations = conversations.map(conv => {
    conv.unseenMessages = countUnseenMessages(conversationsSeen ? conversationsSeen[conv._id] : undefined, conv.messages);
    return conv;
  })
  const newConversation = [...state.conversations.filter(conv => !updated.includes(conv._id)), ...conversations]
  const newState = {
    ...state,
    conversations: newConversation,
    unseenMessages: consolidateUnseenMessages(newConversation),
  };
  return newState;
}
