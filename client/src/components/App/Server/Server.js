import React, {useState, useEffect} from 'react';
import ChannelList from './ChannelList';
import ChatWindow from './ChatWindow';
import ServerInfo from './ServerInfo';
import '../../../style/App/Server/Server.scss';
import ServerSettings from './ServerSettings';
import SectionCreation from './SectionCreation';
import UserInfo from '../User/UserInfo'; // Import the UserInfo component

const Server = ({ selectedServer, sections, users, onReload, onRoleReload }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null); 
    const [isModerator, setIsModerator] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [owners, setOwners] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [regularUsers, setRegularUsers] = useState([]);

    useEffect(() => {
        console.log("selected server next line:");
        
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
        if (users && users.length > 0) {
            for (const user of users) {
                if (user.uid === JSON.parse(localStorage.getItem('morp-login-user'))) {
                    setIsModerator(user.is_moderator == 1);
                    setIsOwner(user.is_owner == 1);

                    if (isModerator) console.log('User is a moderator');
                    if (isOwner) console.log('User is an owner');
                    
                    break;
                }
            }
        }
    }, [users]);

    useEffect(() => {
        if (users && users.length > 0) {
            const ownersList = users.filter(user => user.is_owner == 1);
            const moderatorsList = users.filter(user => user.is_moderator == 1 && user.is_owner != 1);
            const regularUsersList = users.filter(user => user.is_owner != 1 && user.is_moderator != 1);

            setOwners(ownersList);
            setModerators(moderatorsList);
            setRegularUsers(regularUsersList);
        }
    }, [users]);

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
                <ChannelList sections={sections} changeSelectedRoomId={changeSelectedRoomId} selectedRoomId={selectedRoomId} serverId={selectedServer.id} onReload={onReload} isModerator={isModerator} />
                <ChatWindow serverId={selectedServer.id} roomId={selectedRoomId} roomDetails={getRoomDetails()} />
                <ServerInfo 
                    server={selectedServer} 
                    owners={owners} 
                    moderators={moderators} 
                    regularUsers={regularUsers} 
                    openServerSettings={openServerSettings} 
                    isModerator={isModerator}
                    setSelectedUserId={setSelectedUserId}
                />
            </div>
            { isSettingsOpen && 
                <ServerSettings 
                    server={selectedServer} 
                    onCloseForm={() => setIsSettingsOpen(false)} 
                    isOwner={isOwner}
                    allUsers={{
                        owners: owners,
                        moderators: moderators,
                        regularUsers: regularUsers
                    }}
                    onRoleReload={onRoleReload} /> 
            }
            {selectedUserId && (
            <>
                <div 
                    className='overlay'
                    onClick={() => setSelectedUserId(null)}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <UserInfo 
                        userId={selectedUserId} 
                        serverId={selectedServer.id}
                        onClose={() => setSelectedUserId(null)} />
                </div>
            </>
            )}
        </>
    );
};

export default Server;