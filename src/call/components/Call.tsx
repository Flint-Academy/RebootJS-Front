import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { ILocalInputs, IRemotePeer } from '../types';
import { CallActions } from './CallActions';
import { CallStreamBlock } from './CallStreamBlock';
import { Redirect } from 'react-router-dom';

interface ICallDisplayProps {
  conversationId?: string;
  localInputs?: ILocalInputs;
  remotes: IRemotePeer[];
}

export function CallDisplay(props: ICallDisplayProps) {
  const { conversationId, localInputs, remotes } = props;
  if (!conversationId) return <Redirect to="/profile" />;
  const mainScreen = remotes.map((remote) => <CallStreamBlock key={remote.target} stream={remote.stream} />);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          maxHeight: 'calc(100% - 56px - 2rem)',
          alignItems: 'stretch',
          justifyContent: 'stretch',
          flexGrow: 1,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginRight: '1rem', flexGrow: 1 }}>{mainScreen}</div>
        <div
          style={{
            display: 'flex',
            maxWidth: '20%',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'space-around',
            flexGrow: 0,
          }}
        >
          <div style={{ maxWidth: '100%' }}>
            <CallStreamBlock stream={localInputs?.stream} muted={true} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 0 }}>
        <CallActions />
      </div>
    </div>
  );
}

const mapStateToProps = ({ call }: IAppState) => ({
  conversationId: call.conversationId,
  localInputs: call.inputs,
  remotes: call.remotes,
});

export const Call = connect(mapStateToProps)(CallDisplay);
