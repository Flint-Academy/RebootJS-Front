import IconButton from '@material-ui/core/IconButton';
import Forum from '@material-ui/icons/Forum';
import React from 'react';
import { Badge } from '@material-ui/core';

interface IShowConversationsButtonProps {
  unseenMessages: number;
  showConversationList: () => void;
}

export function MyConversationsButton({ unseenMessages, showConversationList }: IShowConversationsButtonProps) {
  return (
    <IconButton aria-label="contacts" onClick={showConversationList}>
      <Badge badgeContent={unseenMessages} color="error" anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Forum fontSize="large" />
      </Badge>
    </IconButton>
  );
}

export default MyConversationsButton;
