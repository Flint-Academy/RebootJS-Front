import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateConversations } from './updateConversations';
import { getConversations } from '../../api/methods';

export const makeFetchConversations = () => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    try {
      const connectedProfile = getState().identity.info;
      if(!connectedProfile) throw Error("Cannot fetch conversation while not connected");
      const conversations = await getConversations(connectedProfile);
      dispatch(updateConversations(conversations, connectedProfile.conversationsSeen));
    } catch (error) {
      console.error("There has been an error", error);
    }
  };
};
