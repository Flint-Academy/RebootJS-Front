import axios from 'axios';
import { IUserInfo } from '../users/types';

export function getUsers() : Promise<IUserInfo[]>{
  return axios.get(`${process.env.REACT_APP_BACKEND}/users`)
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
    (res) => res.data
  )
}