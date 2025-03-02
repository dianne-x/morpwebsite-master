import React, { useState, useEffect } from 'react';
import '../../../style/App/Server/ChannelList.scss';
import RoomCreation from './RoomCreation';
import SectionCreation from './SectionCreation';

const ChannelList = ({ sections, changeSelectedRoomId, selectedRoomId, serverId }) => {
  const [openRoomCreationId, setOpenRoomCreationId] = useState(null);
  const [openSectionCreationId, setOpenSectionCreationId] = useState(false);
  const [sectionList, setSectionList] = useState(sections);

  useEffect(() => {
    setSectionList(sections);
  }, [sections]);

  const handleOpenRoomCreation = (sectionId) => {
    if (openRoomCreationId === sectionId) setOpenRoomCreationId(null);
    else setOpenRoomCreationId(sectionId);
  };

  const handleSectionCreated = (newSection) => {
    setSectionList([...sectionList, newSection]);
    setOpenSectionCreationId(false);
  };

  const handleRoomCreated = (newRoom) => {
    const updatedSections = sectionList.map(section => {
      if (section.id == newRoom.section_id) {
        return {
          ...section,
          rooms: [...section.rooms, newRoom]
        };
      }
      return section;
    });
    setSectionList([...updatedSections]);
    setOpenRoomCreationId(null);
  };

  return (
    <div className="channel-list server-side">
      <h3>Sections and Rooms:</h3>
      <div className='list-wrapper'>
        {sectionList.map((section, sectionIndex) => (
          <details key={sectionIndex} className="section-item" open={true}>
            <summary>{section.section_name}</summary>
            <ul>
              <div className='line'></div>
              {section.rooms && section.rooms.length > 0 ? (
                section.rooms.map((room, roomIndex) => (
                  <li key={roomIndex} className="room-item">
                    <button 
                      onClick={() => changeSelectedRoomId(room.id)}
                      className={room.id === selectedRoomId ? 'selected' : ''}>
                        {room.room_name}
                    </button>
                  </li>
                ))
              ) : (
                <li className="room-item no-room">No rooms available</li>
              )}
              <li>
                <button className='addnew' onClick={() => handleOpenRoomCreation(section.id)}>
                  <span>{openRoomCreationId === section.id ? "- Discard creation" : "+ Add new room"}</span>
                </button>
                {openRoomCreationId === section.id && <RoomCreation sectionId={section.id} onRoomCreated={handleRoomCreated} />}
              </li>
            </ul>
          </details>
        ))}
        {
          !openSectionCreationId &&
          <button className='addnew' onClick={() => setOpenSectionCreationId(true)}>
          <span>+ Add new section</span>
        </button>}
        {openSectionCreationId && <SectionCreation serverId={serverId} onSectionCreated={handleSectionCreated} />}
      </div>
    </div>
  );
};

export default ChannelList;