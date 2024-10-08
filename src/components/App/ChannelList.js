import React from 'react';
import '../../style/ChannelList.scss';

const ChannelList = ({ serverId }) => {
  const channels = serverId === 3 ? ['#earth-general', '#earth-announcements'] : 
                serverId === 4 ? ['#rocket-general', '#rocket-announcements'] :
                ['#default-general']; // Example channels based on server ID

  return (
    <div className="channel-list">
      <h3>Channels:</h3>
      {channels.map((channel, index) => (
        <div key={index} className="channel-item">
          {channel}
        </div>
      ))}
    </div>
  );
}

export default ChannelList;
