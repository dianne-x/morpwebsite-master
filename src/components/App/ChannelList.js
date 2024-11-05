import React from 'react';
import '../../style/App/ChannelList.scss';

const ChannelList = ({ sections }) => {
  return (
    <div className="channel-list">
      <h3>Sections and Rooms:</h3>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section-item">
          <h4>{section.section_name}</h4>
          <ul>
            {section.rooms.length > 0 ? (
              section.rooms.map((room, roomIndex) => (
                <li key={roomIndex} className="room-item">
                  {room.room_name}
                </li>
              ))
            ) : (
              <li className="room-item">No rooms available</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ChannelList;