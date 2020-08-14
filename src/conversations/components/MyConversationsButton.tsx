import IconButton from '@material-ui/core/IconButton';
import Forum from '@material-ui/icons/Forum';
import React from 'react';

interface IShowConversationsButtonProps {
  showConversationList: () => void;
}

export function MyConversationsButton({ showConversationList }: IShowConversationsButtonProps) {
  return (
    <IconButton aria-label="contacts" onClick={showConversationList}>
      <Forum fontSize="large" />
    </IconButton>
  );
}


export default MyConversationsButton;