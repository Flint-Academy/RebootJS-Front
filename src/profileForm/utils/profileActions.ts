import { IProfileFormFields } from "../types";
import { createProfile, deleteConnectedProfile } from "../../api/api_methods";
import { IProfile } from "../../identity/types";

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
