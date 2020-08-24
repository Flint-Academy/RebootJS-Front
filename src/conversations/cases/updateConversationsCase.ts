import { IUpdateConversationsAction, IConversationsState } from "../types";
import { consolidateUnseenMessages } from "../utils/consolidateUnseenMessages";

export function updateConversationCase(
  state: IConversationsState,
  { conversations }: IUpdateConversationsAction
): IConversationsState {
  const newState = {
    ...state,
    conversations: conversations,
    unseenMessages: consolidateUnseenMessages(conversations),
  };
  return newState;
}
