export function forgeNewConversationId(userId: string, target: string){
  return Buffer.from([userId, target, new Date().toISOString()].join('_')).toString('base64');
}
