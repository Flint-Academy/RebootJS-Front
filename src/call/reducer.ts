import { ICallState, ICallAction, UPDATE_CALL_LOCAL_INPUTS } from "./types";

export function call(state: ICallState = defaultCallState(), action: ICallAction): ICallState {
  switch (action.type) {
    case UPDATE_CALL_LOCAL_INPUTS:
      return { ...state, inputs: action.localInputs };
    default:
      return state;
  }
}

function defaultCallState(): ICallState {
  return {
    remotes: [],
  };
}
