import {
  IConversationsState,
  IConversationsAction,
  UPDATE_CONVERSATIONS,
} from './types';
import { defaultConversationsState } from './utils/defaultConversationsState';
import { updateConversationCase } from './cases/updateConversationsCase';

export function conversations(
  state: IConversationsState = defaultConversationsState(),
  action: IConversationsAction,
): IConversationsState {
  switch (action.type) {
    case UPDATE_CONVERSATIONS:
      return updateConversationCase(state, action)
    default:
      return state;
  }
}
