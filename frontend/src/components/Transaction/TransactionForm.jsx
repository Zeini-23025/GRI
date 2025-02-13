import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiServices } from '../../api';
import './TransactionForm.css';

const TransactionForm = () => {
    const { demandeId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [demandeInfo, setDemandeInfo] = useState(null);
    const [formData, setFormData] = useState({
        numero_transaction: '',
        capture_ecran: null
    });

    useEffect(() => {
        loadDemandeInfo();
    }, [demandeId]);

    const loadDemandeInfo = async () => {
        try {
            const response = await apiServices.demandes.get(demandeId);
            setDemandeInfo(response.data);
        } catch (error) {
            setError('Erreur lors du chargement des informations de la demande');
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('demande', demandeId);
            formDataToSend.append('numero_transaction', formData.numero_transaction);
            formDataToSend.append('capture_ecran', formData.capture_ecran);
            formDataToSend.append('montant', demandeInfo.montant);

            await apiServices.transactions.create(formDataToSend);
            navigate('/mes-demandes');
        } catch (error) {
            setError('Erreur lors de l\'envoi des informations de transaction');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            capture_ecran: e.target.files[0]
        });
    };

    if (!demandeInfo) return <div>Chargement...</div>;

    return (
        <div className="transaction-form-container">
            <h2>Confirmation de Paiement</h2>
            <div className="payment-info">
                <p><strong>Montant à payer:</strong> {demandeInfo.montant} MRU</p>
                <p><strong>Numéro de compte:</strong> {demandeInfo.numero_compte}</p>
                <p><strong>Référence:</strong> {demandeInfo.reference}</p>
            </div>

            <form onSubmit={handleSubmit} className="transaction-form">
                <div className="form-group">
                    <label>Numéro de Transaction:</label>
                    <input
                        type="text"
                        value={formData.numero_transaction}
                        onChange={(e) => setFormData({
                            ...formData,
                            numero_transaction: e.target.value
                        })}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label>Capture d'écran du paiement:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        disabled={loading}
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={loading}
                >
                    {loading ? 'Envoi en cours...' : 'Confirmer le paiement'}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm; 