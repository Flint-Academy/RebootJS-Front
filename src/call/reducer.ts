import { toggleCallAudioInputCase } from "./cases/toggleCallAudioInputCase";
import { toggleCallVideoInputCase } from "./cases/toggleCallVideoInputCase";
import { ICallState, ICallAction, UPDATE_CALL_LOCAL_INPUTS, SET_CALL_CONVERSATION_ID, SET_INCOMING_CALL, CALL_RESET, TOGGLE_CALL_AUDIO_INPUT, TOGGLE_CALL_VIDEO_INPUT } from "./types";

export function call(state: ICallState = defaultCallState(), action: ICallAction): ICallState {
  switch (action.type) {
    case CALL_RESET:
      return defaultCallState();
    case UPDATE_CALL_LOCAL_INPUTS:
      return { ...state, inputs: action.localInputs };
    case SET_CALL_CONVERSATION_ID:
      return { ...state, conversationId: action.conversationId };
    case SET_INCOMING_CALL:
      return { ...state, incomingCall: action.incomingCall };
    case TOGGLE_CALL_AUDIO_INPUT:
      return toggleCallAudioInputCase(state, action);
    case TOGGLE_CALL_VIDEO_INPUT:
      return toggleCallVideoInputCase(state, action);
    default:
      return state;
  }
}

function defaultCallState(): ICallState {
  return {
    remotes: [],
  };
}
