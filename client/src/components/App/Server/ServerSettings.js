import React, {useState} from 'react';
import CharacterControlPanel from './ServerSettings/CharacterControlPanel';
import WantedElements from './ServerSettings/WantedElements';
import UsersControl from './ServerSettings/UsersControl';

const ServerSettings = (props) => {
    const [activeTab, setActiveTab] = useState('CharactersControl');

    console.log('servd', props.server)
    return (
        <>
            <div className="overlay"></div>
            <div className='user-panel'>
                <div className="sidebar">

                    <button onClick={() => setActiveTab('CharactersControl')} className={activeTab == 'CharactersControl' ? 'active' : ''}>
                        <span>Character Control Panel</span>
                    </button>

                    <button onClick={() => setActiveTab('CharacterWantedElements')} className={activeTab == 'CharacterWantedElements' ? 'active' : ''}>
                        <span>Character Form Options</span>
                    </button>

                    {
                        props.isOwner &&
                        <button onClick={() => setActiveTab('UsersControl')} className={activeTab == 'UsersControl' ? 'active' : ''}>
                            <span>Users Control</span>
                        </button>
                    }

                </div>
                <div className="content">
                    {activeTab === 'CharactersControl' && (
                        <CharacterControlPanel serverId={props.server.id}/>
                        
                    )}
                    {activeTab === 'CharacterWantedElements' && (
                        <WantedElements />
                    )}
                    {activeTab === 'UsersControl' && (
                        <UsersControl />
                    )}
                </div>
                <button className="close" onClick={props.onCloseForm}>&times;</button>
            </div>
        </>
    );
};

export default ServerSettings;