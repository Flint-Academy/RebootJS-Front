export interface IRemotePeer {
  target: string;
  peerConnection?: RTCPeerConnection;
  stream?: MediaStream;
  screenSharePeer?: RTCPeerConnection;
  screenShare?: MediaStream;
  pendingJoin?: boolean;
  isDisconnected?: boolean;
}

export interface ILocalInputs {
  stream: MediaStream;
  audio: ILocalInput;
  video: ILocalInput;
  close: () => void;
}

export interface ILocalInput {
  isAvailable: boolean;
  isActive?: boolean;
  toggle?: () => ILocalInput;
}


export interface IUpdateCallLocalInputsAction {
  type: typeof UPDATE_CALL_LOCAL_INPUTS;
  localInputs?: ILocalInputs;
}


export const UPDATE_CALL_LOCAL_INPUTS = 'UPDATE_CALL_LOCAL_INPUTS';


export interface ICallState {
  conversationId?: string;
  inputs?: ILocalInputs;
  remotes: IRemotePeer[];
}

export type ICallAction = IUpdateCallLocalInputsAction;