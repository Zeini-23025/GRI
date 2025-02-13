import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/api/login/', {
        email,
        password,
      });

      // Stocker les informations de l'utilisateur et les tokens
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user_role', response.data.role);
      localStorage.setItem('user_email', response.data.email);
      localStorage.setItem('user_name', response.data.username);

      // Rediriger en fonction du rôle
      if (response.data.role === 'provider' || response.data.is_superuser) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
      
    } catch (err) {
      setError('Email ou mot de passe incorrect');
      console.error('Erreur de connexion:', err);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-lg">
          <div className="card-body p-4">
            <h2 className="text-center mb-4">Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-danger text-center">{error}</p>}
              <div className="d-grid">
                <button type="submit" className="btn custom-signup-btn">
                  Se connecter
                </button>
              </div>
            </form>
            <p className="text-center mt-3">
              Vous n'avez pas de compte ?{' '}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={handleSignupClick}
              >
                S'inscrire
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;