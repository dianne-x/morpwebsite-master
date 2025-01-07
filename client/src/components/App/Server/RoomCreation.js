import React from "react";
/*import "../../../style/App/Server/RoomCreation.scss";*/

const RoomCreation = ({ sectionId }) => {
    return (
        <div className="room-creation">
        <form>
            <label htmlFor="roomName">Room Name:</label>
            <input type="text" id="roomName" name="roomName" />
            <button type="submit">Create Room</button>
        </form>
        </div>
    );
    };

export default RoomCreation;
