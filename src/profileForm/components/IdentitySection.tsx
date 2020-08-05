import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { IFormField, IProfileFormFields } from '../types';

export interface IIdentitySectionProps {
  allowEmailEdition: boolean;
  email: IFormField<string>;
  firstname: IFormField<string>;
  lastname: IFormField<string>;
  update<T extends keyof IProfileFormFields>(field: T, value: IProfileFormFields[T]['value']): void;
}

export function IdentitySection({ allowEmailEdition, email, firstname, lastname, update }: IIdentitySectionProps) {
  return (
    <FormControl component="fieldset" fullWidth={true}>
      <FormLabel component="legend" style={{ margin: '1rem 0' }}>
        Your identity:
      </FormLabel>
      <FormGroup>
        <TextField
          label="Email"
          value={email.value}
          required={true}
          disabled={!allowEmailEdition}
          fullWidth={true}
          onChange={(event) => update('email', event.target.value)}
          {...(!email.isValid ? { error: true, helperText: email.error } : {})}
        />
        <TextField
          label="First name"
          value={firstname.value}
          required={true}
          fullWidth={true}
          onChange={(event) => update('firstname', event.target.value)}
          {...(!firstname.isValid ? { error: true, helperText: firstname.error } : {})}
        />
        <TextField
          label="Last name"
          value={lastname.value}
          required={true}
          fullWidth={true}
          onChange={(event) => update('lastname', event.target.value)}
          {...(!lastname.isValid ? { error: true, helperText: lastname.error } : {})}
        />
      </FormGroup>
    </FormControl>
  );
}
