import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiServices } from "../../api";
import conditions from "../../data/conditions.json";
import "./demandForm.css";

const DemandForm = ({ immobilierId }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom_complet: "",
        email: "",
        telephone: "",
        date_debut: "",
        duree: "",
        message: "",
        statut: "en_attente",
        id_immobilier: immobilierId
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showConditions, setShowConditions] = useState(false);
    const [acceptedConditions, setAcceptedConditions] = useState(false);

    const fields = [
        { 
            field: "nom_complet", 
            type: "text", 
            label: "Nom complet", 
            required: true 
        },
        { 
            field: "email", 
            type: "email", 
            label: "Email", 
            required: true,
            validate: (value) => {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(value) ? "" : "Email invalide";
            }
        },
        { 
            field: "telephone", 
            type: "tel", 
            label: "Numéro de téléphone", 
            required: true 
        },
        { 
            field: "date_debut", 
            type: "date", 
            label: "Date de début", 
            required: true,
            min: new Date().toISOString().split('T')[0],
            validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                return selectedDate > today ? "" : "La date doit être ultérieure à aujourd'hui";
            }
        },
        { 
            field: "duree", 
            type: "number", 
            label: "Durée d'allocation (En mois)", 
            required: true,
            min: "1",
            validate: (value) => {
                const duration = parseInt(value);
                return duration > 0 ? "" : "La durée doit être un nombre positif";
            }
        },
        { 
            field: "message", 
            type: "textarea", 
            label: "Message (Optionnel)", 
            required: false 
        },
    ];

    useEffect(() => {
        // Initialiser formData avec les champs vides et l'ID de l'immobilier
        const initialData = {
            statut: "En attente",
            id_immobilier: immobilierId
        };
        fields.forEach(field => {
            initialData[field.field] = '';
        });
        setFormData(initialData);
    }, [immobilierId]);

    const validateForm = () => {
        const errors = {};
        
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = "Format d'email invalide";
        }

        // Validation de la durée
        const duration = parseInt(formData.duree);
        if (isNaN(duration) || duration <= 0) {
            errors.duree = "La durée doit être un nombre positif";
        }

        // Validation de la date
        const selectedDate = new Date(formData.date_debut);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            errors.date_debut = "La date doit être ultérieure à aujourd'hui";
        }

        if (!acceptedConditions) {
            errors.conditions = "Vous devez accepter les conditions de location";
        }

        const hasErrors = Object.keys(errors).length > 0;
        if (hasErrors) {
            setError(Object.values(errors)[0]);
        }
        return !hasErrors;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Formater les données avant l'envoi
            const formattedData = {
                nom_complet: formData.nom_complet,
                email: formData.email,
                telephone: formData.telephone,
                date_debut: new Date(formData.date_debut).toISOString().split('T')[0],
                duree: parseInt(formData.duree),
                message: formData.message || "",
                id_immobilier: parseInt(immobilierId),
                statut: "en_attente"
            };

            console.log('Données envoyées:', formattedData); // Pour le débogage

            const response = await apiServices.demandes.create(formattedData);
            
            if (response.status === 201) {
                alert(response.data.message || "Votre demande a été envoyée avec succès!");
                navigate("/");
            }
        } catch (err) {
            console.error('Erreur complète:', err.response); // Pour le débogage
            const errorMessage = err.response?.data?.details || 
                               err.response?.data?.error || 
                               "Une erreur est survenue lors de l'envoi de la demande";
            setError(typeof errorMessage === 'object' ? 
                    JSON.stringify(errorMessage) : 
                    errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const renderError = (error) => {
        if (typeof error === 'string') return error;
        if (typeof error === 'object') return JSON.stringify(error);
        return "Une erreur est survenue";
    };

    const ConditionsModal = () => (
        <div className="conditions-modal">
            <div className="conditions-content">
                <h2>{conditions.title}</h2>
                <div className="conditions-body">
                    {conditions.conditions.map(section => (
                        <div key={section.id} className="condition-section">
                            <h3>{section.title}</h3>
                            <ul>
                                {section.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <button onClick={() => setShowConditions(false)} className="close-conditions">
                    Fermer
                </button>
            </div>
        </div>
    );

    return (
        <div className="demand-form-container">
            <h2>Formulaire de demande de location</h2>
            {error && <div className="error-message">{renderError(error)}</div>}
            
            <form onSubmit={handleSubmit} className="form">
                <div className="inputs-container">
                    {fields.map((field) => (
                        <div className="form-group" key={field.field}>
                            <label htmlFor={field.field}>{field.label}</label>
                            {field.type === "textarea" ? (
                                <textarea
                                    id={field.field}
                                    value={formData[field.field] || ''}
                                    onChange={handleChange}
                                    required={field.required}
                                />
                            ) : (
                                <input 
                                    type={field.type}
                                    id={field.field}
                                    value={formData[field.field] || ''}
                                    onChange={handleChange}
                                    required={field.required}
                                    min={field.min}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="conditions-container">
                    <label className="conditions-checkbox">
                        <input
                            type="checkbox"
                            checked={acceptedConditions}
                            onChange={(e) => setAcceptedConditions(e.target.checked)}
                        />
                        J'accepte les <button 
                            type="button"
                            className="conditions-link"
                            onClick={() => setShowConditions(true)}
                        >
                            conditions de location
                        </button>
                    </label>
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading || !acceptedConditions}
                    >
                        {loading ? "Envoi en cours..." : "Envoyer la demande"}
                    </button>
                </div>
            </form>

            {showConditions && <ConditionsModal />}
        </div>
    );
};

export default DemandForm;