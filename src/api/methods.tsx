import axios from 'axios';
import { IUserInfo } from '../users/types';
import { IProfile } from '../identity/types';
import { IConversation, IConversationMessage } from '../conversations/types';

export function getUsers(): Promise<IUserInfo[]> {
  return axios.get(`${process.env.REACT_APP_BACKEND}/users`, { withCredentials: true })
    .then((res) => {
      return res.data.users as IUserInfo[];
    })
}

export function login(email: string, password: string): Promise<string> {
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

export function logout(): Promise<string> {
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
): Promise<IProfile> {
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

export function deleteConnectedProfile() {
  return axios.delete(
    `${process.env.REACT_APP_BACKEND}/users`,
    { withCredentials: true }
  ).then(
    res => res.data
  )
}

export function getConnectedProfile() {
  return axios.get(
    `${process.env.REACT_APP_BACKEND}/users/me`,
    { withCredentials: true }
  ).then(
    res => res.data
  )
}

export function patchProfile(data: { firstname: string, lastname: string, password?: string }): Promise<IProfile> {
  return axios.patch(`${process.env.REACT_APP_BACKEND}/users`, data, { withCredentials: true }).then(res => res.data);
}

export async function sendMessage(conversationId: string, targets: string[], message: string): Promise<IConversationMessage> {
  console.log(`Message ${message} sent to ${targets.join(", ")}`);
  return await axios.post(
    `${process.env.REACT_APP_BACKEND}/messages`,
    {
      conversationId: conversationId,
      targets: targets,
      content: message
    },
    { withCredentials: true }
  ).then(res => res.data);
}

export async function getConversation(connectedUser: IProfile, conversationId: string): Promise<IConversation> {
  const messages: IConversationMessage[] = await axios.get(
    `${process.env.REACT_APP_BACKEND}/messages/${conversationId}`,
    { withCredentials: true }
  ).then(res => res.data);
  if (messages.length > 0) {
    const attendees = [...new Set(messages.flatMap(({ emitter, targets }) => [emitter, ...targets]))];
    const targets = attendees.filter((id) => id !== connectedUser._id);
    return {
      _id: conversationId,
      targets: targets,
      messages: messages,
      updatedAt: getLastMessageDate(messages),
      unseenMessages: 0
    }
  }

  return { _id: conversationId, targets: [], messages: [], updatedAt: new Date().toString(), unseenMessages: 0 }
}

export async function getConversations(connectedUser: IProfile): Promise<IConversation[]> {
 const messages: IConversationMessage[] = await axios.get(
    `${process.env.REACT_APP_BACKEND}/messages`,
    { withCredentials: true }
  ).then(res => res.data);
  if (messages.length === 0) return []

  const batches = messages.reduce<{ [converstionId: string]: IConversationMessage[] }>(
    (res, message) => ({
      ...res,
      [message.conversationId]: [...(res[message.conversationId] || []), message],
    }),
    {},
  );

  const conversations : IConversation[] = [];
  for (const conversationId in batches) {
    const messages = batches[conversationId];
    const attendees = [...new Set(messages.flatMap(({ emitter, targets }) => [emitter, ...targets]))];
    const targets = attendees.filter((id) => id !== connectedUser._id);
    conversations.push({
      _id: conversationId,
      targets: targets,
      messages: messages,
      updatedAt: getLastMessageDate(messages),
      unseenMessages: 0
    })
  }
  return conversations;
}

function getLastMessageDate(messages: IConversationMessage[]) {
  return messages[messages.length - 1].createdAt;
}