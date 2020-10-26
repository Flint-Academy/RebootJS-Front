import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeEmit } from '../../socket/actions/makeEmit';
import { makeAcceptCall } from './makeAcceptCall';
import { callReset } from './callReset';
import { setIncomingCall } from './setIncomingCall';
import { setCallConversationId } from './setCallConversationId';

export const makeIncomingCall = (conversationId: string, target: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(setCallConversationId(conversationId));
    dispatch(
      setIncomingCall({
        target,
        accept: () => dispatch(makeAcceptCall(conversationId, target)),
        reject: () => {
          dispatch(callReset());
          dispatch(makeEmit('call-left', { target, conversationId }));
        },
      }),
    );
  };
};
