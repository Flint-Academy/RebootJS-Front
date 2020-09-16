import { IConversation, IConversationMessage } from '../types';

export function conversationFactory(
  _id: string,
  targets: string[],
  updatedAt: string = new Date().toISOString(),
  messages?: IConversationMessage[]
): IConversation {
  return {
    _id,
    targets,
    updatedAt,
    unseenMessages: 0,
    messages: messages ? [...messages] : [],
  };
}
