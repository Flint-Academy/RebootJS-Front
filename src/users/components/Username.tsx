import React, { Fragment } from 'react';
import { IUserInfo } from '../types';

export interface IUserNameProps {
  info?: IUserInfo;
}

export function Username({ info }: IUserNameProps) {
  const { lastname, firstname } = info || { firstname: 'Unknown', lastname: 'user' };
  const details = `${firstname} ${lastname}`;
  return <Fragment>{details}</Fragment>;
}
