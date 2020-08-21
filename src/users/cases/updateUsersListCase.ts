import { IUsersState, IUpdateUsersListAction} from '../types';
import { userComparator } from '../utils/userComparator';

export function updateUsersListCase(state: IUsersState, { data }: IUpdateUsersListAction): IUsersState {
  const newState = {
    ...state,
    list: data
  };
  newState.list.sort(userComparator);
  return newState;
}
