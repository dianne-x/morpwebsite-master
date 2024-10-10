import React from "react";

const TopBarButton = ({ icon, onClick, title }) => {
  return (
    <div
      className="server-icon"
      onClick={onClick}
      title={title}
    >
      {icon}
    </div>
  );
}

export default TopBarButton;