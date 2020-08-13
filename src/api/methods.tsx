import axios from 'axios';
import { IUserInfo } from '../users/types';
import { IProfile } from '../identity/types';

export function getUsers() : Promise<IUserInfo[]>{
  return axios.get(`${process.env.REACT_APP_BACKEND}/users`, { withCredentials: true })
       .then((res) => {
         return res.data.users as IUserInfo[];
       })
}

export function login(email: string, password: string) : Promise<string>{
  return axios.post(
    `${process.env.REACT_APP_BACKEND}/login`,
    {
      username: email,
      password: password
    },
    { withCredentials: true }
  ).then(
    res => res.data
  )
}

export function logout() : Promise<string>{
  return axios.post(
    `${process.env.REACT_APP_BACKEND}/logout`,
    {},
    { withCredentials: true }
  ).then(
    res => res.data
  )
}

export function createProfile(
  email: string,
  password: string,
  firstname: string,
  lastname: string
) : Promise<IProfile> {
  return axios.post(
    `${process.env.REACT_APP_BACKEND}/register`,
    {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname
    }
  ).then(
    res => res.data
  )
}

export function deleteConnectedProfile(){
  return axios.delete(
    `${process.env.REACT_APP_BACKEND}/users`,
    { withCredentials: true }
  ).then(
    res => res.data
  )
}

export function getConnectedProfile(){
  return axios.get(
    `${process.env.REACT_APP_BACKEND}/users/me`,
    { withCredentials: true }
  ).then(
    res => res.data
  )
}

export function patchProfile(data: {firstname: string, lastname: string, password?: string}): Promise<IProfile> {
  return axios.patch(`${process.env.REACT_APP_BACKEND}/users`, data, { withCredentials: true }).then(res => res.data);
}