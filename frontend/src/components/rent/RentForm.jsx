import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RentForm.css';

const RentForm = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    startDate: '',
    duration: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBackClick = () => {
    navigate(-1); // Retourne à la page précédente
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoyer les données à votre API
      const response = await fetch('/api/rent-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          propertyId,
          ...formData
        })
      });

      if (response.ok) {
        alert('Votre demande a été envoyée avec succès!');
        navigate('/');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'envoi de votre demande.');
    }
  };

  return (
    <div className="rent-form-container">
      <div className="back-button" onClick={handleBackClick}>
        <img src="/images/back.png" alt="Retour" title="Retour" />
      </div>
      <h2>Formulaire de Location</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom complet</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Téléphone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date de début souhaitée</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Durée de location (en mois)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Message (optionnel)</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button type="submit" className="submit-button">
          Envoyer la demande
        </button>
      </form>
    </div>
  );
};


export default RentForm; 