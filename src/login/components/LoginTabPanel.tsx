import Box from '@material-ui/core/Box';
import React from 'react';

export interface ILoginTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

class LoginTabPanel extends React.Component<ILoginTabPanelProps> {
  render(){
    const { value, index, children } = this.props
    const content = value === index ? <Box>{children}</Box> : null;
    return (
      <div role="tabpanel" hidden={value !== index}>
        {content}
      </div>
    );
  }
}

export default LoginTabPanel;