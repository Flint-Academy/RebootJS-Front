import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateDrawerContent } from '../../layout/actions/updateDrawerContent';
import { showDrawer } from '../../layout/actions/showDrawer';

export const makeShowUsers = () => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    batch(() => {
      dispatch(updateDrawerContent('contacts'));
      dispatch(showDrawer());
    });
  };
};
