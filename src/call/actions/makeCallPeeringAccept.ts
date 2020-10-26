import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateCallRemote } from './updateCallRemote';
import { makeEmit } from '../../socket/actions/makeEmit';
import { assertExistingLocalInputs } from '../utils/assertExistingLocalInputs';
import { bindStreamToPeerConnexion } from '../utils/bindStreamToPeerConnexion';
import { peerConnexionFactory } from '../utils/peerConnexionFactory';
import { remotePeerFactory } from '../utils/remotePeerFactory';
import { makeCallPeeringClosed } from './makeCallPeeringClosed';
import { updateCallRemoteStream } from './updateCallRemoteStream';

export const makeCallPeeringAccept = (conversationId: string, target: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log(`========== START makeCallPeeringAccept: ${target} `);

    const remote = remotePeerFactory(target);

    // Create peer connection
    const peerConnection = await peerConnexionFactory(
      (candidate) => dispatch(makeEmit('call-peering-ice-candidate', { conversationId, target, candidate })),
      () => dispatch(makeCallPeeringClosed(conversationId, target)),
      (stream) => dispatch(updateCallRemoteStream(target, stream)),
    );

    // bind local inputs stream
    const localInputs = assertExistingLocalInputs(getState());
    bindStreamToPeerConnexion(peerConnection, localInputs.stream);
    remote.peerConnection = peerConnection;

    dispatch(updateCallRemote(remote));

    // Emit peering accepted
    dispatch(makeEmit('call-peering-accepted', { conversationId, target }));

    console.log(`========== END makeCallPeeringAccept: ${target} `);
  };
};
