import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "../../appReducer";
import { IConversationMessage } from "../types";
import { ensureConversation } from "./ensureConversation";
import { updateConversations } from "./updateConversations";

export const makeUpdateConversationMessage = (message: IConversationMessage) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { conversations, identity } = getState();
    let conversation = conversations.conversations.find(conv => conv._id === message.conversationId);
    const attendees = [message.emitter, ...message.targets];
    const targets = attendees.filter((id) => id !== identity.info?._id);
    if(!conversation) {
      dispatch(ensureConversation(message.conversationId, targets, new Date().toISOString(), [message]))
    } else {
      conversation = {...conversation, messages: [...conversation.messages, message] };
      dispatch(updateConversations([conversation], identity.info?.conversationsSeen));
    }
  }
}