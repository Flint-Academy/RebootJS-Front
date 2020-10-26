import { IAppState } from "../../appReducer";
import { IConversation } from "../../conversations/types";
import { makeEmit } from "../../socket/actions/makeEmit";
import { getLocalInputs } from "../utils/getLocalInputs";
import { makeCallPeeringInitiate } from "./makeCallPeeringInitiate";
import { updateCallLocalInputs } from "./updateCallLocalInputs";

export function makeStartCall(conversation: IConversation){
  return async (dispatch: any, getState: () => IAppState) => {
    const connectedUser = getState().identity.info
    if(!connectedUser) { return }
    const toBeCalled = conversation.targets.filter(target => target !== connectedUser._id)

    // Create local media inputs
    const localInputs = await getLocalInputs();
    dispatch(updateCallLocalInputs(localInputs));

    for(const target of toBeCalled){
      dispatch(makeCallPeeringInitiate(conversation._id, target));
      const conversationId = conversation._id;
      dispatch(makeEmit('call-peering-request', { conversationId, target }));
    }
  }
}