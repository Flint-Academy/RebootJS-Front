import axios from 'axios';
import { IUserInfo } from '../users/types';
import { IProfile } from '../identity/types';
import { IConversation, IConversationMessage } from '../conversations/types';

export async function getUsers(): Promise<IUserInfo[]> {
  const resp = await axios.get(`${process.env.REACT_APP_BACKEND}/users`, { withCredentials: true })
  return resp.data.users;
}

export async function login(email: string, password: string): Promise<string> {
  const resp = await axios.post(
    `${process.env.REACT_APP_BACKEND}/login`,
    {
      username: email,
      password: password
    },
    { withCredentials: true }
  );
  return resp.data;
}

export async function logout(): Promise<string> {
  const resp = await axios.post(
    `${process.env.REACT_APP_BACKEND}/logout`,
    {},
    { withCredentials: true }
  );
  return resp.data;
}

export async function createProfile(
  email: string,
  password: string,
  firstname: string,
  lastname: string
): Promise<IProfile> {
  const resp = await axios.post(
    `${process.env.REACT_APP_BACKEND}/register`,
    {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname
    }
  )
  return resp.data;
}

export async function deleteConnectedProfile() {
  const resp = await axios.delete(
    `${process.env.REACT_APP_BACKEND}/users`,
    { withCredentials: true }
  )
  return resp.data;
}

export async function getConnectedProfile() {
  const resp = await axios.get(
    `${process.env.REACT_APP_BACKEND}/users/me`,
    { withCredentials: true }
  );
  return resp.data;
}

export async function patchProfile(data: { firstname: string, lastname: string, password?: string }): Promise<IProfile> {
  const resp = await axios.patch(`${process.env.REACT_APP_BACKEND}/users`, data, { withCredentials: true })
  return resp.data;
}

export async function sendMessage(conversationId: string, targets: string[], message: string): Promise<IConversationMessage> {
  console.log(`Message ${message} sent to ${targets.join(", ")}`);
  const resp = await axios.post(
    `${process.env.REACT_APP_BACKEND}/messages`,
    {
      conversationId: conversationId,
      targets: targets,
      content: message
    },
    { withCredentials: true }
  );
  return resp.data;
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
    const lastSeen = connectedUser.conversationsSeen?.[conversationId];
    conversations.push({
      _id: conversationId,
      targets: targets,
      messages: messages,
      updatedAt: getLastMessageDate(messages),
      unseenMessages: countUnseenMessages(connectedUser._id, lastSeen, messages),
    })
  }
  return conversations;
}

export async function conversationSeen(conversationId: string) : Promise<IProfile> {
  const userProfile = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/users/conversations-seen`,
    {
      conversationId: conversationId,
      seenDate: new Date().toISOString(),
    },
    { withCredentials: true }
  ).then(res => res.data)
  return userProfile;
}

function getLastMessageDate(messages: IConversationMessage[]) {
  return messages[messages.length - 1].createdAt;
}

function countUnseenMessages(connectedUserId: string, lastSeen: string | undefined, messages: IConversationMessage[]) : number{
  if (!lastSeen) return messages.length;
  return messages.filter(({ createdAt, emitter }) => emitter !== connectedUserId && createdAt > lastSeen).length;
}