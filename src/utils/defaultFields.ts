import { IFormField, IPasswordField } from "../profileForm/types"

export function defaultStrField(): IFormField<string>{
  return { value: '', isValid: true }
}

export function defaultPasswordField(): IPasswordField {
  return {
    ...defaultStrField(),
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    hasSymbol: false,
    hasValidLength: false
  }
}