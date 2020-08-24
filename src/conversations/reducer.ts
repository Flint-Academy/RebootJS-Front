import {
  IConversationsState,
  IConversationsAction,
  UPDATE_CONVERSATIONS,
  CREATE_CONVERSATION,
} from './types';
import { defaultConversationsState } from './utils/defaultConversationsState';
import { updateConversationCase } from './cases/updateConversationsCase';
import { createConversationCase } from './cases/createConversationCase';

export function conversations(
  state: IConversationsState = defaultConversationsState(),
  action: IConversationsAction,
): IConversationsState {
  switch (action.type) {
    case UPDATE_CONVERSATIONS:
      return updateConversationCase(state, action);
    case CREATE_CONVERSATION:
      return createConversationCase(state, action);
    default:
      return state;
  }
}
