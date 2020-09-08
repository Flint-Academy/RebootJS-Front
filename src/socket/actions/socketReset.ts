import { ISocketResetAction, SOCKET_RESET } from '../types';

export function socketReset(): ISocketResetAction {
  return { type: SOCKET_RESET };
}
