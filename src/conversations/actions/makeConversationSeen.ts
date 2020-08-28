import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateIdentity } from '../../identity/actions/updateIdentity';
import { conversationSeen } from './conversationSeen';
import { conversationSeen as apiConversationSeen } from '../../api/methods';

export const makeConversationSeen = (id: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    const seenDate = new Date().toISOString();

    try {
      const profile = await apiConversationSeen(id, seenDate)
      batch(() => {
        dispatch(updateIdentity(profile));
        dispatch(conversationSeen(id, seenDate));
      });
    } catch (error) {
      console.error("There has been an error", error)
    }
  };
};
