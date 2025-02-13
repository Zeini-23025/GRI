import React, { useState, useEffect } from 'react';
import { apiServices } from '../../api';

const NouvelleConversation = ({ onConversationCreated }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [sujet, setSujet] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const response = await apiServices.get('/api/users/');
            // Filtrer les utilisateurs en fonction du rôle si nécessaire
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUser || !message.trim()) return;

        setLoading(true);
        try {
            const response = await apiServices.post('/api/messages/', {
                destinataire: selectedUser,
                sujet,
                contenu: message
            });
            
            if (onConversationCreated) {
                onConversationCreated(response.data);
            }
            
            // Réinitialiser le formulaire
            setSelectedUser('');
            setSujet('');
            setMessage('');
        } catch (error) {
            console.error('Erreur lors de la création de la conversation:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="nouvelle-conversation">
            <h3>Nouvelle conversation</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Destinataire:</label>
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
                </div>

                <div className="form-group">
                    <label>Sujet:</label>
                    <input
                        type="text"
                        value={sujet}
                        onChange={(e) => setSujet(e.target.value)}
                        placeholder="Sujet de la conversation"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Écrivez votre message..."
                        required
                        rows="4"
                    />
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? 'Envoi...' : 'Démarrer la conversation'}
                </button>
            </form>
        </div>
    );
};

export default NouvelleConversation; 