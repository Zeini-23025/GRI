import React, { useState } from 'react';
import api from '../../api';
import "./signup.css";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    nom: '',
    prenom: '',
    telephone: '',
    role: 'client', // Par défaut, rôle client
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/api/signup/', formData);
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie!',
          text: 'Vous allez être redirigé vers la page de connexion',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          navigate('/login');
        });
      }
    } catch (err) {
      if (err.response && err.response.data) {
        // Gestion des erreurs spécifiques du serveur
        const errors = err.response.data;
        let errorMessage = '';
        
        // Parcourir les erreurs et les formater
        Object.keys(errors).forEach(key => {
          errorMessage += `${key}: ${errors[key].join(', ')}\n`;
        });
        
        setError(errorMessage || 'Erreur lors de l\'inscription. Veuillez réessayer.');
      } else {
        setError('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">Inscription</h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Nom d'utilisateur:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mot de passe:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nom" className="form-label">
                    Nom:
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    className="form-control"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="prenom" className="form-label">
                    Prénom:
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    className="form-control"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="telephone" className="form-label">
                    Téléphone:
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    className="form-control"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  S'inscrire
                </button>
              </form>
              <p className="text-center mt-3">
                Déjà inscrit?{' '}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={handleLoginClick}
                >
                  Se connecter
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
