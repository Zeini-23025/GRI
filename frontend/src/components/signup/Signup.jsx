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
    first_name: '',
    last_name: '',
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
      await api.post('/api/signup/', formData);
      Swal.fire({
        icon: 'success',
        title: 'Inscription réussie!',
        text: 'Vous allez être redirigé vers la page de connexion',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate('/login');
      });
    } catch (err) {
      setError('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  const handleSignupClick = () => {
    navigate('/login'); // Rediriger vers la page d'inscription
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Changement immédiat sans animation
    });
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center">Inscription</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
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
                    Mot de passe :
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
                  <label htmlFor="first_name" className="form-label">
                    Nom:
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="form-control"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">
                    Prenom :
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="form-control"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="telephone" className="form-label">
                    Telephone:
                  </label>
                  <input
                    type="text"
                    id="telephone"
                    name="telephone"
                    className="form-control"
                    value={formData.telephone}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role:
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="client">Client</option>
                    <option value="provider">Provider</option>
                  </select>
                </div> */}
                {error && <p className="text-danger">{error}</p>}
                <div className="text-center">
                <button type="submit" className="btn custom-signup-btn">
                  S'inscrire
                </button>
                </div>
              </form>
              <p className="text-center">
              Avez vous déja un compte ?{' '}
              <button
                type="button"
                className="btn btn-link"
                onClick={handleSignupClick}
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
