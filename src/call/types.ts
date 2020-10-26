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

export interface IIncomingCall {
  target: string;
  accept: () => void;
  reject: () => void;
}
export interface ILocalInput {
  isAvailable: boolean;
  isActive?: boolean;
  toggle?: () => ILocalInput;
}

export const CALL_RESET = 'CALL_RESET';
export const UPDATE_CALL_LOCAL_INPUTS = 'UPDATE_CALL_LOCAL_INPUTS';
export const SET_CALL_CONVERSATION_ID = 'SET_CALL_CONVERSATION_ID';
export const SET_INCOMING_CALL = 'SET_INCOMING_CALL';
export const UPDATE_CALL_REMOTE = 'UPDATE_CALL_REMOTE';
export const UPDATE_CALL_REMOTE_STREAM = 'UPDATE_CALL_REMOTE_STREAM';

export interface ICallResetAction {
  type: typeof CALL_RESET;
}

export interface IUpdateCallLocalInputsAction {
  type: typeof UPDATE_CALL_LOCAL_INPUTS;
  localInputs?: ILocalInputs;
}

export interface ISetCallConversationIdAction {
  type: typeof SET_CALL_CONVERSATION_ID;
  conversationId: string;
}

export interface ISetIncomingCallAction {
  type: typeof SET_INCOMING_CALL;
  incomingCall?: IIncomingCall;
}

export interface IUpdateCallRemoteAction {
  type: typeof UPDATE_CALL_REMOTE;
  remote: IRemotePeer;
}

export interface IUpdateCallRemoteStreamAction {
  type: typeof UPDATE_CALL_REMOTE_STREAM;
  target: string;
  stream?: MediaStream;
}

export interface ICallState {
  conversationId?: string;
  inputs?: ILocalInputs;
  incomingCall?: IIncomingCall;
  remotes: IRemotePeer[];
}

export type ICallAction = ICallResetAction
  | IUpdateCallLocalInputsAction
  | ISetCallConversationIdAction
  | ISetIncomingCallAction
  | IUpdateCallRemoteAction
  | IUpdateCallRemoteStreamAction