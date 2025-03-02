import React, { useState } from "react";
/*import "../../../style/App/Server/RoomCreation.scss";*/

const SectionCreation = ({ serverId, onSectionCreated }) => {
  const [sectionName, setSectionName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serverId) {
      console.error("Server ID is missing");
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/create_section.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          server_id: serverId,
          section_name: sectionName,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        onSectionCreated(data);
      } else {
        console.error("Error creating section:", data);
      }
    } catch (error) {
      console.error("Error creating section:", error);
    }
  };

  return (
    <div className="room-creation">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="sectionName"
          name="sectionName"
          placeholder="Enter section name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
        />
        <button type="submit">✓</button>
      </form>
    </div>
  );
};

export default SectionCreation;