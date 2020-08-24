import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import history from '../../history';
import { updateDrawerContent } from '../../layout/actions/updateDrawerContent';
import { createConversation } from './createConversation';
import { forgeNewConversationId } from '../utils/forgeNewConversationId';

export const makeCreateConversation = (target: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { info } = getState().identity;
    if (!info) throw Error('profile unavailable');

    const conversationId = forgeNewConversationId(info._id, target);
    dispatch(updateDrawerContent('conversations'));
    dispatch(createConversation(conversationId, [target]));
    history.push(`/conversation/${conversationId}`);
  };
};
