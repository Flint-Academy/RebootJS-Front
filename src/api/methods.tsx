import axios from 'axios';
import { IUserInfo } from '../users/types';
import { IProfile } from '../identity/types';
import { IConversation } from '../conversations/types';

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

export function sendMessage(conversionId: string, targets: string[], message: string): Promise<string> {
  return new Promise((res, rej) => {
    console.log(`Message ${message} sent to ${targets.join(", ")}`);
    res('OK');
  });
}

export function getConversation(conversationId: string) : Promise<IConversation> {
  return new Promise((res, rej) => res({
    _id: '1234',
    targets: ['5f340e6442cd8ac004bbb0e3', '5f2bf8663de3d95a4936ddc4'],
    updatedAt: new Date().toString(),
    unseenMessages: 3,
    messages: [
    {
      _id: '123',
      conversationId: '1234',
      createdAt: new Date().toString(),
      emitter: '5f340e6442cd8ac004bbb0e3',
      targets: ['5f2bf8663de3d95a4936ddc4'],
      content: 'Salut',
    },
    {
      _id: '124',
      conversationId: '1234',
      createdAt: new Date().toString(),
      emitter: '5f2bf8663de3d95a4936ddc4',
      targets: ['5f340e6442cd8ac004bbb0e3'],
      content: 'ça va ?',
    }]
  }));
}