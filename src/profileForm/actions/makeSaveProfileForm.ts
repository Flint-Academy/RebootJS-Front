import { IAppState } from "../../appReducer"
import { ThunkDispatch } from "redux-thunk"
import { Action } from "redux"
import { patchProfile } from "../../api/methods"
import { updateIdentity } from "../../identity/actions/updateIdentity"

export const makeSaveProfileForm = () => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    try {
      const { profileForm } = getState();
      const { firstname, lastname, password, confirmation } = profileForm.fields;
      const data = {
        lastname: lastname.value,
        firstname: firstname.value,
        password: password.value,
      };
      let check = firstname.isValid && lastname.isValid
      if (!password.value) {
        delete data.password;
      } else {
        check = check && password.isValid && confirmation.isValid
      }
      if (check) {
        const profile = await patchProfile(data);
        dispatch(updateIdentity(profile));
      } else {
        throw Error("One of the fields is invalid")
      }
    } catch (error) {
      console.error('An error occured', error)
    }
  }
}