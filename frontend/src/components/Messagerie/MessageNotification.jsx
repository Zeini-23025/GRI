import React from 'react';
import './MessageNotification.css';

const MessageNotification = ({ message, onClose }) => {
    return (
        <div className="message-notification">
            <div className="notification-content">
                <div className="notification-header">
                    <span className="sender-name">
                        {message.expediteur.nom} {message.expediteur.prenom}
                    </span>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <p className="message-preview">{message.contenu}</p>
            </div>
        </div>
    );
};

export default MessageNotification; 