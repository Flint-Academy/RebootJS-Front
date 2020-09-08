import { loginUser } from '../../api/api_methods';
import history from '../../history';
import { IAppState } from '../../appReducer';
import { makeInitApp } from '../../layout/actions/makeInitApp';

export const makeSubmitLogin = () => {
  return async (dispatch: any, getState: () => IAppState) => {
    try {
      const { login } = getState();
      const { email, password } = login.form;

      if([email, password].some(({isValid}) => !isValid)) {
        throw Error("Some Form fields are invalid");
      }

      const profile = await loginUser(email.value, password.value);
      dispatch(makeInitApp(profile));
      history.push(`/profile`);
    } catch {
      console.error("For now let's just print that there has been an error");
    }
  }
}