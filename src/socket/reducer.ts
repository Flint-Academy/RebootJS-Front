import {
  ISocketState,
  ISocketAction,
  SOCKET_RESET,
  UPDATE_SOCKET,
} from './types';
import { updateSocketCase } from './cases/updateSocketCase';

export function socket(state: ISocketState = {}, action: ISocketAction): ISocketState {
  switch (action.type) {
    case SOCKET_RESET:
      const { socket } = state;
      setImmediate(() => socket?.close());
      return {};
    case UPDATE_SOCKET:
      return updateSocketCase(state, action);
    default:
      return state;
  }
}
