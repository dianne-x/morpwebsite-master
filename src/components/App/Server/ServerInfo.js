import React from 'react';
import '../../../style/App/Server/ServerInfo.scss';

const ServerInfo = (props) => {
    return (
        <div className='server-info server-side'>
            <img src={`http://localhost/morpwebsite-master/src/pictureData/serverPictures/${props.server.icon}`} className="server-image"/>
            <h2>{props.server.name}</h2>
        </div>
    );
};

export default ServerInfo;