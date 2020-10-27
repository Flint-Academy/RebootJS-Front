import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateCallRemote } from './updateCallRemote';
import { makeEmit } from '../../socket/actions/makeEmit';
import { updateCallRemoteStream } from './updateCallRemoteStream';
import { makeCallPeeringClosed } from './makeCallPeeringClosed';
import { bindStreamToPeerConnexion } from '../utils/bindStreamToPeerConnexion';
import { peerConnexionFactory } from '../utils/peerConnexionFactory';
import { assertExistingLocalInputs } from '../utils/assertExistingLocalInputs';
import { remotePeerFactory } from '../utils/remotePeerFactory';

export const makeCallPeeringInitiate =
  (conversationId: string, target: string, fromStartCall?: boolean) => {
    return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
      console.log(`========== START makeCallPeeringInitiate: ${target} `);

      const remote = remotePeerFactory(target);

      // Create peer connection
      const peerConnection = await peerConnexionFactory(
        (candidate) => dispatch(makeEmit('call-peering-ice-candidate', { conversationId, target, candidate })),
        () => dispatch(makeCallPeeringClosed(conversationId, target)),
        (stream) => dispatch(updateCallRemoteStream(target, stream)),
      );

      const localInputs = assertExistingLocalInputs(getState());
      bindStreamToPeerConnexion(peerConnection, localInputs.stream);
      remote.peerConnection = peerConnection;

      dispatch(updateCallRemote({ ...remote, pendingJoin: fromStartCall }));

      // Emit peering request
      dispatch(makeEmit('call-peering-request', { conversationId, target }));

      console.log(`========== END makeCallPeeringInitiate: ${target}`);
    };
  };
