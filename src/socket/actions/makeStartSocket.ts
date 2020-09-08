import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from '../../api/socket_methods';
import { IAppState } from '../../appReducer';
import { updateSocket } from './updateSocket';
import { socketReset } from './socketReset';

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
    } catch (error) {
      console.error('There has been an error', error);
    }
  };
};
