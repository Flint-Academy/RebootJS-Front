import { UPDATE_CONVERSATIONS, IConversation, IUpdateConversationsAction } from "../types";

export function updateConversations(
  conversations: IConversation[],
  conversationsSeen?: { [conversationId: string]: string }
): IUpdateConversationsAction {
  return {
    type: UPDATE_CONVERSATIONS,
    conversations: conversations,
    conversationsSeen: conversationsSeen
  };
}
