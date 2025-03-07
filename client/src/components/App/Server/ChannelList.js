import React, { useState, useEffect } from 'react';
import '../../../style/App/Server/ChannelList.scss';
import RoomCreation from './RoomCreation';
import SectionCreation from './SectionCreation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const ChannelList = ({ sections, changeSelectedRoomId, selectedRoomId, serverId, onReload }) => {
  const [openRoomCreationId, setOpenRoomCreationId] = useState(null);
  const [openSectionCreationId, setOpenSectionCreationId] = useState(false);
  const [sectionList, setSectionList] = useState(sections);
  const [selectedEditSectionId, setSelectedEditSectionId] = useState(null);
  const [selectedEditRoomId, setSelectedEditRoomId] = useState(null);
  const [editSectionName, setEditSectionName] = useState("");
  const [editRoomName, setEditRoomName] = useState("");

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
    onReload();
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
    onReload();
  };

  const handleEditSection = (sectionId) => {
    if (editSectionName === "") return;
    fetch(`${process.env.REACT_APP_PHP_BASE_URL}/updateSectionName.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sectionId, sectionName: editSectionName }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const updatedSections = sectionList.map(section => {
          if (section.id === sectionId) {
            return { ...section, section_name: editSectionName };
          }
          return section;
        });
        setSectionList(updatedSections);
        onReload();
      } else {
        console.error(data.error);
      }
    })
    .catch(error => console.error('Error:', error));

    setSelectedEditSectionId(null);
  };

  const handleEditRoom = (roomId) => {
    if (editRoomName === "") return;
    fetch(`${process.env.REACT_APP_PHP_BASE_URL}/updateRoomName.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomId, roomName: editRoomName }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const updatedSections = sectionList.map(section => {
          return {
            ...section,
            rooms: section.rooms.map(room => {
              if (room.id === roomId) {
                return { ...room, room_name: editRoomName };
              }
              return room;
            })
          };
        });
        setSectionList(updatedSections);
        onReload();
      } else {
        console.error(data.error);
      }
    })
    .catch(error => console.error('Error:', error));

    setSelectedEditRoomId(null);
  };

  const handleDeleteSection = (sectionId, sectionName) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete section '${sectionName}'?`)) {
      fetch(`${process.env.REACT_APP_PHP_BASE_URL}/deleteSection.php?sectionId=${sectionId}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const updatedSections = sectionList.filter(section => section.id !== sectionId);
          setSectionList(updatedSections);
          onReload();
        } else {
          console.error(data.error);
        }
      })
      .catch(error => console.error('Error:', error));
    }
  }

  const handleDeleteRoom = (roomId, roomName) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete room '${roomName}'?`)) {
      fetch(`${process.env.REACT_APP_PHP_BASE_URL}/deleteRoom.php?roomId=${roomId}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const updatedSections = sectionList.map(section => {
            return {
              ...section,
              rooms: section.rooms.filter(room => room.id !== roomId)
            };
          });
          setSectionList(updatedSections);
          onReload();
        } else {
          console.error(data.error);
        }
      })
      .catch(error => console.error('Error:', error));
    }
  }

  const handleSectionNameChange = (event) => {
    setEditSectionName(event.target.value);
  };

  const handleRoomNameChange = (event) => {
    setEditRoomName(event.target.value);
  };

  const handleKeyPress = (event, callback) => {
    if (event.key === 'Enter' && event.target.value.trim() !== "") {
      callback();
    }
  };

  return (
    <div className="channel-list server-side">
      <h3>Sections and Rooms:</h3>
      <div className='list-wrapper'>
        {sectionList.map((section, sectionIndex) => (
          <details key={sectionIndex} className="section-item" open={true}>
            <summary>
              {
                selectedEditSectionId === section.id ? 
                (<div className='edit-section-room'>
                  <input 
                    type='text' 
                    value={editSectionName} 
                    onChange={handleSectionNameChange} 
                    onKeyPress={(event) => handleKeyPress(event, () => handleEditSection(section.id))}
                  />
                  <button title='Save section name' className='approve-btn' onClick={() => handleEditSection(section.id)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </div>) 
                : 
                (<>
                  <p>{section.section_name}</p>
                  <button title='Edit section name' className='change-btn' onClick={() => {
                    setSelectedEditRoomId(null);
                    setSelectedEditSectionId(section.id);
                    setEditSectionName(section.section_name);
                  }}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button title='Delete section' className='change-btn' onClick={() => handleDeleteSection(section.id, section.section_name)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>)}
            </summary>
            <ul>
              <div className='line'></div>
              {section.rooms && section.rooms.length > 0 ? (
                section.rooms.map((room, roomIndex) => (
                  <li key={roomIndex} className="room-item">
                    <div 
                      onClick={() => changeSelectedRoomId(room.id)}
                      className={`room-item-wrapper ${room.id === selectedRoomId ? 'selected' : ''}`}>
                        {
                          selectedEditRoomId === room.id ? 
                          (<div className='edit-section-room'>
                            <input 
                              type='text' 
                              value={editRoomName} 
                              onChange={handleRoomNameChange} 
                              onKeyPress={(event) => handleKeyPress(event, () => handleEditRoom(room.id))}
                            />
                            <button title='Save room name' className='approve-btn' onClick={() => handleEditRoom(room.id)}>
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                          </div>) 
                          : 
                          (<>
                            <p>{room.room_name}</p>
                            <div>
                              <button title='Edit room name' className='change-btn' onClick={() => {
                                setSelectedEditSectionId(null);
                                setSelectedEditRoomId(room.id);
                                setEditRoomName(room.room_name);
                              }}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </button>
                              <button title='Delete room' className='change-btn' onClick={() => handleDeleteRoom(room.id, room.room_name)}>
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </>)}
                    </div>
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