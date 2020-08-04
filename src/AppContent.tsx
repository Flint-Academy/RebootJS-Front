import Box from '@material-ui/core/Box';
import React from 'react';
import ContactList from './users/components/MyContacts';

export function AppContent() {
  return (
    <Box style={{ height: '90vh' }}>
      <ContactList />
    </Box>
  );
}
