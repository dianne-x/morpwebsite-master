import React, {useState} from 'react';
import CharacterControlPanel from './ServerSettings/CharacterControlPanel';
import WantedElements from './ServerSettings/WantedElements';

const ServerSettings = (props) => {
    const [activeTab, setActiveTab] = useState('CharactersControl');


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

                </div>
                <div className="content">
                    {activeTab === 'CharactersControl' && (
                        <CharacterControlPanel />
                    )}
                    {activeTab === 'CharacterWantedElements' && (
                        <WantedElements />
                    )}
                </div>
                <button className="close" onClick={props.onCloseForm}>&times;</button>
            </div>
        </>
    );
};

export default ServerSettings;