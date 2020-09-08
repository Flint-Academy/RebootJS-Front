export interface ISocketState {
  socket?: SocketIOClient.Socket;
}

export const SOCKET_RESET = 'SOCKET_RESET';
export const UPDATE_SOCKET = 'UPDATE_SOCKET';

export interface ISocketResetAction {
  type: typeof SOCKET_RESET;
}

export interface IUpdateSocketAction {
  type: typeof UPDATE_SOCKET;
  socket: SocketIOClient.Socket;
}

export type ISocketAction = ISocketResetAction | IUpdateSocketAction;
