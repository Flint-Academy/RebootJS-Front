import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { assertExistingRemote } from '../utils/assertExistingRemote';
import { closeRemotePeer } from '../utils/remotePeerFactory';
import { makeEndCall } from './makeEndCall';
import { updateCallRemote } from './updateCallRemote';

export const makeCallPeeringClosed = (conversationId: string, target: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const remote = assertExistingRemote(getState(), target);

    dispatch(updateCallRemote(closeRemotePeer(remote)));
    if (!getState().call.remotes.length) dispatch(makeEndCall());
  };
};
