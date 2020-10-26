import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeEmit } from '../../socket/actions/makeEmit';
import { assertExistingPeerConnexion } from '../utils/assertExistingPeerConnexion';


export const makeCallPeeringCreateOffer = (conversationId: string, target: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log(`========== START makeCallPeeringCreateOffer: ${target}`);

    const peerConnection = assertExistingPeerConnexion(getState(), target);

    // Create an RTC peer connexion offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Emit peering offer
    dispatch(
      makeEmit('call-peering-offer', { conversationId, target, offer: peerConnection.localDescription }),
    );

    console.log(`========== END makeCallPeeringCreateOffer: ${target}`);
  };
};
