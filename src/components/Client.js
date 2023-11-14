import React from 'react';
import Avatar from 'react-avatar';



const add = (a, b) => {
    return a + b;
};
const Client = ({ username, online }) => {
    return (
        <>
            <div className={`client ${online ? 'online' : 'offline'}`}>
                <Avatar name={username} size={55} round="14px" />
                <span className="userName">{username}</span>
                <span className="onlineStatus">{online ? 'Online' : 'Offline'}</span>
            </div>
        </>
    )
}

export {Client, add};