import React from "react";

const TopBarButton = ({ icon, onClick, title, picPath }) => {
  
  function isIconUrl(icon) {
    return icon.startsWith("url");
  }

  return (
    <div
      className="server-icon"
      onClick={onClick}
      title={title}
      style={{ 
        backgroundImage: picPath,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {icon}
    </div>
  );
}

export default TopBarButton;