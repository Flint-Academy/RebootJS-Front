import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeEmit } from '../../socket/actions/makeEmit';
import { closeRemotePeer } from '../utils/remotePeerFactory';
import { updateCallRemote } from './updateCallRemote';

export const makeEndCall = () => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { inputs: localInputs, remotes, conversationId } = getState().call;

    if (localInputs) {
      const { stream } = localInputs;
      stream.getTracks().forEach((track) => track.stop());
    }

    for (const remote of remotes) {
      dispatch(makeEmit('call-left', { target: remote.target, conversationId }));
      dispatch(updateCallRemote(closeRemotePeer(remote)));
    }

    console.log("Exiting call");
  };
};
