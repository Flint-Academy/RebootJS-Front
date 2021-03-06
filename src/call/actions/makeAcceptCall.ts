import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateCallLocalInputs } from './updateCallLocalInputs';
import { getLocalInputs } from '../utils/getLocalInputs';
import { makeCallPeeringAccept } from './makeCallPeeringAccept';
import { makeCallModeEnter } from './makeCallModeEnter';

export const makeAcceptCall = (conversationId: string, target: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    dispatch(makeCallModeEnter(conversationId, [target]));

    // Create local media inputs
    const localInputs = await getLocalInputs();
    dispatch(updateCallLocalInputs(localInputs));

    dispatch(makeCallPeeringAccept(conversationId, target));
  };
};
