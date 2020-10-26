import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { assertExistingPeerConnexion } from '../utils/assertExistingPeerConnexion';
import { assertExistingRemote } from '../utils/assertExistingRemote';
import { updateCallRemote } from './updateCallRemote';

export const makeCallPeeringFinalized =
  (conversationId: string, target: string, answer: RTCSessionDescriptionInit) => {
    return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
      console.log(`========== START makeCallPeeringFinalized: ${target}`);

      const peerConnection = assertExistingPeerConnexion(getState(), target);

      // Accept the received RTC peer connexion answer
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));

      console.log(`========== END makeCallPeeringFinalized: ${target}`);

      const remote = assertExistingRemote(getState(), target);
      if (!remote.pendingJoin) return;
      // The remote just joined the call
      // he might have to create some peering with other attendees

      dispatch(updateCallRemote({ ...remote, pendingJoin: false }));
    };
  };
