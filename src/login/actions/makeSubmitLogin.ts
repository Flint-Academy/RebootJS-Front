import { loginUser } from '../../api/methods';
import history from '../../history';
import { updateIdentity } from '../../identity/actions/updateIdentity';
import { IAppState } from '../../appReducer';

export const makeSubmitLogin = () => {
  return async (dispatch: any, getState: () => IAppState) => {
    try {
      const { login } = getState();
      const { email, password } = login.form;

      if([email, password].some(({isValid}) => !isValid)) {
        throw Error("Some Form fields are invalid");
      }

      const profile = await loginUser(email.value, password.value);
      dispatch(updateIdentity(profile))
      history.push(`/profile`);
    } catch {
      console.log("For now let's just print that there has been an error");
    }
  }
}