import { ISocketState, IUpdateSocketAction } from '../types';

export function updateSocketCase(
  state: ISocketState,
  { socket }: IUpdateSocketAction,
): ISocketState {
  return { ...state, socket };
}
