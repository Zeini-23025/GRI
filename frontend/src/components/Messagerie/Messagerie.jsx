import React, { useState, useEffect, useRef } from 'react';
import { apiServices } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import './Messagerie.css';

const Messagerie = () => {
    const { currentUser } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showNewConversation, setShowNewConversation] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [sujet, setSujet] = useState('');
    const messagesEndRef = useRef(null);
    const [error, setError] = useState('');

    // Scroll automatique vers le dernier message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        loadConversations();
        loadUsers();
        // Mettre en place un intervalle pour actualiser les conversations
        const interval = setInterval(loadConversations, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadUsers = async () => {
        try {
            const response = await apiServices.utilisateurs.list();
            // Filtrer les utilisateurs pour exclure l'utilisateur actuel
            const filteredUsers = response.data.filter(user => user.id !== currentUser.id);
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs:', error);
            setError('Erreur lors du chargement des utilisateurs');
        }
    };

    const loadConversations = async () => {
        try {
            const response = await apiServices.messages.getConversations();
            setConversations(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des conversations:', error);
            setError('Erreur lors du chargement des conversations');
        }
    };

    const loadMessages = async (conversationId) => {
        try {
            setLoading(true);
            const response = await apiServices.messages.getConversationMessages(conversationId);
            setMessages(response.data);
            setSelectedConversation(conversationId);
            // Marquer les messages comme lus
            markMessagesAsRead(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des messages:', error);
            setError('Erreur lors du chargement des messages');
        } finally {
            setLoading(false);
        }
    };

    const markMessagesAsRead = async (messages) => {
        try {
            const unreadMessages = messages.filter(
                msg => !msg.lu && msg.destinataire.id === currentUser.id
            );
            
            for (const message of unreadMessages) {
                await apiServices.messages.markAsRead(message.id);
            }
        } catch (error) {
            console.error('Erreur lors du marquage des messages comme lus:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            setLoading(true);
            const destinataireId = selectedConversation.split('_')[2];
            await apiServices.messages.send({
                destinataire: destinataireId,
                contenu: newMessage,
                sujet: "Re: " + (messages[0]?.sujet || "Sans sujet"),
                conversation_id: selectedConversation
            });
            setNewMessage('');
            await loadMessages(selectedConversation);
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
            setError('Erreur lors de l\'envoi du message');
        } finally {
            setLoading(false);
        }
    };

    const startNewConversation = async (e) => {
        e.preventDefault();
        if (!selectedUser || !newMessage.trim()) return;

        try {
            setLoading(true);
            const response = await apiServices.messages.send({
                destinataire: selectedUser,
                contenu: newMessage,
                sujet: sujet || "Sans sujet"
            });
            
            setShowNewConversation(false);
            setSelectedUser('');
            setSujet('');
            setNewMessage('');
            await loadConversations();
            
            // Charger la nouvelle conversation
            if (response.data.conversation_id) {
                await loadMessages(response.data.conversation_id);
            }
        } catch (error) {
            console.error('Erreur lors de la création de la conversation:', error);
            setError('Erreur lors de la création de la conversation');
        } finally {
            setLoading(false);
        }
    };

    const getUnreadCount = (conversation) => {
        return conversation.messages?.filter(
            msg => !msg.lu && msg.destinataire.id === currentUser.id
        ).length || 0;
    };

    return (
        <div className="messagerie-container">
            <div className="conversations-list">
                <div className="conversations-header">
                    <h2>Conversations</h2>
                    <button 
                        className="new-conversation-btn"
                        onClick={() => setShowNewConversation(true)}
                    >
                        Nouvelle conversation
                    </button>
                </div>

                {conversations.map(conv => (
                    <div
                        key={conv.conversation_id}
                        className={`conversation-item ${selectedConversation === conv.conversation_id ? 'selected' : ''}`}
                        onClick={() => loadMessages(conv.conversation_id)}
                    >
                        <div className="conversation-info">
                            <span className="contact-name">
                                {conv.expediteur.id === currentUser.id ? 
                                    `${conv.destinataire.nom} ${conv.destinataire.prenom}` : 
                                    `${conv.expediteur.nom} ${conv.expediteur.prenom}`}
                            </span>
                            <span className="last-message">
                                {conv.sujet}
                                {getUnreadCount(conv) > 0 && (
                                    <span className="unread-badge">
                                        {getUnreadCount(conv)}
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="messages-container">
                {showNewConversation ? (
                    <div className="new-conversation-form">
                        <h3>Nouvelle conversation</h3>
                        <form onSubmit={startNewConversation}>
                            <select
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                                required
                            >
                                <option value="">Sélectionnez un destinataire</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.nom} {user.prenom} ({user.role})
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                value={sujet}
                                onChange={(e) => setSujet(e.target.value)}
                                placeholder="Sujet de la conversation"
                                required
                            />
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Votre message..."
                                required
                            />
                            <div className="form-buttons">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Envoi...' : 'Envoyer'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setShowNewConversation(false)}
                                    className="cancel-btn"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                ) : selectedConversation ? (
                    <>
                        <div className="messages-list">
                            {messages.map(message => (
                                <div
                                    key={message.id}
                                    className={`message ${message.expediteur.id === currentUser.id ? 'sent' : 'received'}`}
                                >
                                    <div className="message-content">
                                        <p>{message.contenu}</p>
                                        <span className="message-time">
                                            {new Date(message.date_envoi).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={sendMessage} className="message-form">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Écrivez votre message..."
                                disabled={loading}
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? 'Envoi...' : 'Envoyer'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="no-conversation">
                        Sélectionnez une conversation ou démarrez-en une nouvelle
                    </div>
                )}
            </div>

            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => setError('')}>×</button>
                </div>
            )}
        </div>
    );
};

export default Messagerie; 