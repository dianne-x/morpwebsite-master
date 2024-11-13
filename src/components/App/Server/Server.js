import React from 'react';
import ChannelList from './ChannelList';
import ChatWindow from './ChatWindow';
import ServerInfo from './ServerInfo';
import '../../../style/App/Server/Server.scss';

const Server = (props) => {
    console.log(props.selectedServer);
    
    return (
        <div className="server-main-content">
            <ChannelList sections={props.sections} />
            <ChatWindow serverId={props.selectedServer.id} />
            <ServerInfo server={props.selectedServer} />
        </div>
    );
};

export default Server;