import React from 'react';
import '../../../style/App/Server/ChannelList.scss';

const ChannelList = ({ sections, changeSelectedRoomId }) => {
  return (
    <div className="channel-list server-side">
      <h3>Sections and Rooms:</h3>
      <div className='list-wrapper'>
        {sections.map((section, sectionIndex) => (
          <details key={sectionIndex} className="section-item" open={true}>
            <summary>{section.section_name}</summary>
            <ul>
              <div className='line'></div>
              {section.rooms.length > 0 ? (
                section.rooms.map((room, roomIndex) => (
                  <li key={roomIndex} className="room-item">
                    <button onClick={() => changeSelectedRoomId(room.id)}>{room.room_name}</button>
                  </li>
                ))
              ) : (
                <li className="room-item">No rooms available</li>
              )}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
};

export default ChannelList;