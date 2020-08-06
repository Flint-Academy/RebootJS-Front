import { IProfileFormFields } from "../types";
import { validateEmailField } from "./validateEmailField";
import { validateNameField } from "./validateNameField";
import { validatePasswordField } from "./validatePasswordField";
import { validateConfirmationField } from "./validateConfirmationField";
import { createProfile, deleteConnectedProfile, patchProfile } from "../../api/methods";
import { IProfile } from "../../identity/types";

export function updateProfileForm<T extends keyof IProfileFormFields>(state: any, field: T, value: IProfileFormFields[T]['value']) {
  const newState = {
    ...state,
    fields: {
      ...state.fields,
      [field]: {
        ...state.fields[field],
        value: value
      }
    }
  }
  if (field === 'email') {
    const { email } = newState.fields;
    validateEmailField(email);
  } else if (['firstName', 'lastName'].includes(field)) {
    const formField = newState.fields[field];
    validateNameField(formField);
  } else if (field === 'password') {
    const { password } = newState.fields;
    validatePasswordField(password);
  }
  if (['password', 'confirmation'].includes(field)) {
    const { password, confirmation } = newState.fields;
    validateConfirmationField(confirmation, password);
  }
  return newState;
}

export function createNewProfile(fields: IProfileFormFields): Promise<IProfile>{
  const { email, firstname, lastname, password, confirmation } = fields;
  if (
    email.isValid &&
    firstname.isValid &&
    lastname.isValid &&
    password.isValid &&
    confirmation.isValid
  ) {
    return createProfile(email.value, password.value, firstname.value, lastname.value)
  } else {
    return new Promise((_res, rej) => { rej(new Error("One of the fields is invalid"))})
  }
}

export function saveUpdatedProfile(fields: IProfileFormFields, profile: IProfile): Promise<IProfile> {
  const { firstname, lastname, password, confirmation } = fields;
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
    return patchProfile(data)
  } else {
    return new Promise((_res, rej) => { rej(new Error("One of the fields is invalid"))})
  }

}

export function deleteProfile(){
  return deleteConnectedProfile()
};