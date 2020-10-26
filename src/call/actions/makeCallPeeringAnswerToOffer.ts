import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeEmit } from '../../socket/actions/makeEmit';
import { assertExistingPeerConnexion } from '../utils/assertExistingPeerConnexion';

export const makeCallPeeringAnswerToOffer =
  (conversationId: string, target: string, offer: RTCSessionDescriptionInit) => {
    return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
      console.log(`========== START makeCallPeeringAnswerToOffer: ${target}`);

      const peerConnection = assertExistingPeerConnexion(getState(), target);

      // Accept the received RTC peer connexion offer
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

      // Create an RTC peer connexion answer
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      // Emit peering answer
      dispatch(
        makeEmit('call-peering-answer', { conversationId, target, answer: peerConnection.localDescription }),
      );

      console.log(`========== END makeCallPeeringAnswerToOffer: ${target}`);
    };
  };
