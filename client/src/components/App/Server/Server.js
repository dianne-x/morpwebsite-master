import React, {useState} from 'react';
import ChannelList from './ChannelList';
import ChatWindow from './ChatWindow';
import ServerInfo from './ServerInfo';
import '../../../style/App/Server/Server.scss';
import ServerSettings from './ServerSettings';

const Server = ({ selectedServer, sections, users }) => {
    console.log(selectedServer);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    
    function openServerSettings() {
        setIsSettingsOpen(true);
    }

    return (
        <>
            <div className="server-main-content">
                <ChannelList sections={sections} />
                <ChatWindow serverId={selectedServer.id} />
                <ServerInfo server={selectedServer} users={users} openServerSettings={openServerSettings} />
    
            </div>
            { isSettingsOpen && <ServerSettings server={selectedServer} onCloseForm={() => setIsSettingsOpen(false)} /> }
        </>
    );
};

export default Server;