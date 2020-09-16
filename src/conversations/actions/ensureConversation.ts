import { IEnsureConversationAction, ENSURE_CONVERSATION, IConversationMessage } from '../types';

export function ensureConversation(
  conversationId: string,
  targets: string[],
  createdAt: string,
  messages?: IConversationMessage[]
): IEnsureConversationAction {
  return {
    type: ENSURE_CONVERSATION,
    conversationId,
    targets,
    createdAt,
    messages,
  };
}
