import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';

export const makeEmit = (event: any, data: any) => {
  return async (_: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { socket } = getState().socket;
    if (!socket) return;
    console.log(`emitting -------> [${event}]`);
    socket.emit(event, data);
  };
};
