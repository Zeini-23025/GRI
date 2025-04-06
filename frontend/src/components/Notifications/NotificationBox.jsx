import React, { useState, useEffect } from 'react';
import { apiServices } from '../../api';
import { useNavigate } from 'react-router-dom';
import './NotificationBox.css';

const NotificationBox = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadNotifications();
        // Actualiser les notifications toutes les 30 secondes
        const interval = setInterval(loadNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadNotifications = async () => {
        try {
            const response = await apiServices.Notifications.list();
            setNotifications(response.data);
            const unread = response.data.filter(notif => !notif.lu).length;
            setUnreadCount(unread);
        } catch (error) {
            console.error('Erreur lors du chargement des notifications:', error);
        }
    };

    const handleNotificationClick = async (notification) => {
        try {
            if (!notification.lu) {
                await apiServices.Notifications.markAsRead(notification.id);
                loadNotifications();
            }
            
            if (notification.lien) {
                navigate(notification.lien);
            }
            
            setIsOpen(false);
        } catch (error) {
            console.error('Erreur lors du traitement de la notification:', error);
        }
    };

    return (
        <div className="notification-container">
            <button 
                className="notification-bell" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <i className="fas fa-bell"></i>
                {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                )}
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <h3>Notifications</h3>
                    {notifications.length === 0 ? (
                        <p className="no-notifications">Aucune notification</p>
                    ) : (
                        <div className="notification-list">
                            {notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`notification-item ${!notification.lu ? 'unread' : ''}`}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <div className="notification-content">
                                        <p className="notification-message">
                                            {notification.message}
                                        </p>
                                        <span className="notification-date">
                                            {new Date(notification.date).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBox; 