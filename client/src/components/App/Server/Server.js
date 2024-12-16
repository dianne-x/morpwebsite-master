import React, {useState, useEffect} from 'react';
import ChannelList from './ChannelList';
import ChatWindow from './ChatWindow';
import ServerInfo from './ServerInfo';
import '../../../style/App/Server/Server.scss';
import ServerSettings from './ServerSettings';

const Server = ({ selectedServer, sections, users }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    useEffect(() => {
        console.log(selectedServer);
        console.log(sections);
    }, [selectedServer, sections]);

    useEffect(() => {
        if (sections && sections.length > 0 && sections[0].rooms && sections[0].rooms.length > 0) {
            setSelectedRoomId(sections[0].rooms[0].id);
        }
        else {
            setSelectedRoomId(null);
        }
    }, [sections]);

    useEffect(() => {
        console.log("Selected room id:", selectedRoomId);
    }, [selectedRoomId]);

    const changeSelectedRoomId = (roomId) => {
        setSelectedRoomId(roomId);
    };

    const getRoomDetails = () => {
        for (const section of sections) {
            for (const room of section.rooms) {
                if (room.id === selectedRoomId) {
                    return room;
                }
            }
        }
        return null;
    };

    function openServerSettings() {
        setIsSettingsOpen(true);
    }

    return (
        <>
            <div className="server-main-content">
                <ChannelList sections={sections} changeSelectedRoomId={changeSelectedRoomId} selectedRoomId={selectedRoomId} />
                <ChatWindow serverId={selectedServer.id} roomDetails={getRoomDetails()} />
                <ServerInfo server={selectedServer} users={users} openServerSettings={openServerSettings} />
            </div>
            { isSettingsOpen && <ServerSettings server={selectedServer} onCloseForm={() => setIsSettingsOpen(false)} /> }
        </>
    );
};

export default Server;