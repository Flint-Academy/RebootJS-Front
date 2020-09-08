import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { sendMessage } from '../../api/methods';
import { updateConversations } from './updateConversations';
import { messageComparator } from '../utils/messageComparator';
import { lastMessageDate } from '../utils/lastMessageDate';
import { cpuUsage } from 'process';

export const makeSendMessage = (conversationId: string, message: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { conversations, identity } = getState();

    if (!message) return; // abort

    try {
      let conversation = conversations.conversations.find(({ _id }) => _id === conversationId);
      if (!conversation) throw Error('Unable to send');
      const sentMessage = await sendMessage(conversation._id, conversation.targets, message);

      // FIXME - LE LUNDI LA VIE C'EST LE DEBUG
      conversation = {
        ...conversation,
        messages: [...conversation.messages, sentMessage]
      }
      conversation.messages.sort(messageComparator);

      conversation.updatedAt = lastMessageDate(conversation.messages);
      dispatch(updateConversations([conversation], identity.info?.conversationsSeen));
    } catch (error) {
      console.error("There has been an error", error);
    }
  };
};
