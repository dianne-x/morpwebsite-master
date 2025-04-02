import React, { useState } from "react";
import { convertEmojisToText } from '../../../utils/emojiConverter';

const RoomCreation = ({ sectionId, onRoomCreated }) => {
  const [roomName, setRoomName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sectionId) {
      console.error("Section ID is missing");
      return;
    }
    try {
      const formattedRoomName = convertEmojisToText(roomName); // Convert emojis to text codes
      const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/create_room.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section_id: sectionId,
          room_name: formattedRoomName,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        onRoomCreated(data);
        setRoomName('');
      } else {
        console.error("Error creating room:", data);
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="room-creation">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="roomName"
          name="roomName"
          value={roomName}
          placeholder="Enter room name"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button type="submit">✓</button>
      </form>
    </div>
  );
};

export default RoomCreation;
