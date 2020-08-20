import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { Username, IUserNameProps } from '../../users/components/Username';

type IMyNameDisplayProps = Partial<IUserNameProps>;

function NavBarName({ info }: IMyNameDisplayProps) {
  if (!info) return null;
  return (
    <Typography variant="h6">
      <Username info={info} />
    </Typography>
  );
}

const mapStateToProps = ({ identity }: IAppState) => ({
  info: identity.info,
});

export default connect(mapStateToProps)(NavBarName);
