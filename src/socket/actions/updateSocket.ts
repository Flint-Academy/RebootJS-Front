import {IUpdateSocketAction, UPDATE_SOCKET } from '../types';

export function updateSocket(socket: SocketIOClient.Socket): IUpdateSocketAction{
  return {
    type: UPDATE_SOCKET,
    socket,
  };
}
