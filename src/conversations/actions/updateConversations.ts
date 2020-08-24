import { UPDATE_CONVERSATIONS, IConversation, IUpdateConversationsAction } from "../types";

export function updateConversations(
  conversations: IConversation[]
): IUpdateConversationsAction {
  return {
    type: UPDATE_CONVERSATIONS,
    conversations: conversations,
  };
}
