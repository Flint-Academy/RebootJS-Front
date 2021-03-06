import Fab from '@material-ui/core/Fab';
import CallEnd from '@material-ui/icons/CallEnd';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';
import SpeakerNotesOff from '@material-ui/icons/SpeakerNotesOff';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { makeEndCall } from '../actions/makeEndCall';
import { showDrawer } from '../../layout/actions/showDrawer';
import { hideDrawer } from '../../layout/actions/hideDrawer';
import { ILocalInputs } from '../types';
import { toggleCallAudioInput } from '../actions/toggleCallAudioInput';
import { toggleCallVideoInput } from '../actions/toggleCallVideoInput';

interface ICallActionsDisplayProps {
  conversationId?: string;
  isChatShown: boolean;
  localInputs?: ILocalInputs;
  screenShareStream?: MediaStream;
  toggleAudio: () => void;
  toggleVideo: () => void;
  showChat: () => void;
  hideChat: () => void;
  endCall: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dangerous: {
      color: theme.palette.error.contrastText,
      backgroundColor: theme.palette.error.main,
    },
  }),
);

export function CallActionsDisplay(props: ICallActionsDisplayProps) {
  const {
    isChatShown,
    localInputs,
    toggleAudio,
    toggleVideo,
    showChat,
    hideChat,
    endCall,
  } = props;
  const classes = useStyles();
  return (
    <div>
      <Fab onClick={isChatShown ? hideChat : showChat} color={isChatShown ? 'primary' : 'secondary'}>
        {isChatShown ? <SpeakerNotes fontSize="large" /> : <SpeakerNotesOff fontSize="large" />}
      </Fab>
      <Fab
        onClick={toggleAudio}
        color={localInputs?.audio.isActive ? 'primary' : 'secondary'}
        disabled={!localInputs?.audio.isAvailable}
      >
        {localInputs?.audio.isActive ? <Mic fontSize="large" /> : <MicOff fontSize="large" />}
      </Fab>
      <Fab
        onClick={toggleVideo}
        color={localInputs?.video.isActive ? 'primary' : 'secondary'}
        disabled={!localInputs?.video.isAvailable}
      >
        {localInputs?.video.isActive ? <Videocam fontSize="large" /> : <VideocamOff fontSize="large" />}
      </Fab>
      <Fab onClick={endCall} className={classes.dangerous}>
        <CallEnd fontSize="large" />
      </Fab>
    </div>
  );
}

const mapStateToProps = ({ layout, call }: IAppState) => ({
  conversationId: call.conversationId,
  isChatShown: layout.showDrawer,
  localInputs: call.inputs,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  toggleAudio: () => dispatch(toggleCallAudioInput()),
  toggleVideo: () => dispatch(toggleCallVideoInput()),
  showChat: () => dispatch(showDrawer()),
  hideChat: () => dispatch(hideDrawer()),
  endCall: () => dispatch(makeEndCall()),
});

export const CallActions = connect(mapStateToProps, mapDispatchToProps)(CallActionsDisplay);
