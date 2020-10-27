import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { addIceCandidateToPeerConnexion } from '../utils/addIceCandidateToPeerConnexion';
import { assertExistingPeerConnexion } from '../utils/assertExistingPeerConnexion';

export const makeCallPeeringAddIceCandidate =
  (target: string, candidate: RTCIceCandidateInit) => {
    return async (_: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
      const peerConnection = assertExistingPeerConnexion(getState(), target);

      // Add the received RTC ice candaidate
      await addIceCandidateToPeerConnexion(peerConnection, candidate);
    };
  };
