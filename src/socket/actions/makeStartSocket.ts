import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from '../../api/socket_methods';
import { IAppState } from '../../appReducer';
import { updateSocket } from './updateSocket';
import { socketReset } from './socketReset';
import { makeUpdateUserInfo } from '../../users/actions/makeUpdateUserInfo';
import { IConversationMessage } from '../../conversations/types';
import { makeUpdateConversationMessage } from '../../conversations/actions/makeUpdateConversationMessages';
import { makeIncomingCall } from '../../call/actions/makeIncomingCall';
import { makeCallPeeringCreateOffer } from '../../call/actions/makeCallPeeringCreateOffer';
import { makeCallPeeringAnswerToOffer } from '../../call/actions/makeCallPeeringAnswerToOffer';
import { makeCallPeeringFinalized } from '../../call/actions/makeCallPeeringFinalized';

export const makeStartSocket = () => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    try {
      const socket = connect();
      socket.on('connect', () => {
        console.log(`receiving [connect] <-------`);
        dispatch(updateSocket(socket));
      });

      socket.on('disconnect', () => {
        console.log(`receiving [disconnect] <-------`);
        dispatch(socketReset());
      });

      socket.on('user-update', (data: any) => {
        console.log(`receiving [user-update] <-------`);
        dispatch(makeUpdateUserInfo([data]));
      });

      socket.on('chat-message', (data: IConversationMessage) => {
        console.log(`receiving [chat-message] <-------`);
        dispatch(makeUpdateConversationMessage(data));
      });

      socket.on('call-peering-request', (data: any) => {
        console.log(`receiving [call-peering-request] <-------`);
        dispatch(makeIncomingCall(data.conversationId, data.emitter));
      });

      socket.on('call-peering-accepted', (data: any) => {
        console.log(`receiving [call-peering-accept] <-------`);
        dispatch(makeCallPeeringCreateOffer(data.conversationId, data.emitter));
      })

      socket.on('call-peering-offer', (data: any) => {
        console.log(`receiving [call-peering-offer] <-------`);
        dispatch(makeCallPeeringAnswerToOffer(data.conversationId, data.emitter, data.offer));
      });

      socket.on('call-peering-answer', (data: any) => {
        console.log(`receiving [call-peering-answer] <-------`);
        dispatch(makeCallPeeringFinalized(data.conversationId, data.emitter, data.answer));
      })
    } catch (error) {
      console.error('There has been an error', error);
    }
  };
};
