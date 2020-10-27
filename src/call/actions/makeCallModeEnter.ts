import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { ensureConversation } from '../../conversations/actions/ensureConversation';
import { setIncomingCall } from './setIncomingCall';
import { setCallConversationId } from './setCallConversationId';
import { updateDrawerContent } from '../../layout/actions/updateDrawerContent';
import { toggleCallAudioInput } from './toggleCallAudioInput';
import history from '../../history';

export const makeCallModeEnter = (conversationId: string, targets: string[]) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    batch(() => {
      dispatch(ensureConversation(conversationId, targets, new Date().toISOString()));
      dispatch(setIncomingCall());
      dispatch(setCallConversationId(conversationId));
      dispatch(updateDrawerContent('call'));
      dispatch(toggleCallAudioInput());
    });
    history.push(`/call`);
  };
}