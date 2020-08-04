import axios from 'axios';
import { IUserInfo } from '../users/types';

export function getUsers() : Promise<IUserInfo[]>{
  return axios.get(`${process.env.REACT_APP_BACKEND}/users`)
       .then((res) => {
         return res.data.users as IUserInfo[];
       })
}