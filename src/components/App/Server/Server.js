import React from 'react';
import ChannelList from './ChannelList';
import ChatWindow from './ChatWindow';
import ServerInfo from './ServerInfo';
import '../../../style/App/Server/Server.scss';

const Server = ({ selectedServer, sections, users }) => {
    console.log(selectedServer);
    
    return (
        <div className="server-main-content">
            <ChannelList sections={sections} />
            <ChatWindow serverId={selectedServer.id} />
            <ServerInfo server={selectedServer} users={users} />
        </div>
    );
};

export default Server;