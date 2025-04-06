import React, { useState } from 'react';
import { apiServices } from '../../api';
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
      const response = await apiServices.auth.login({
        email,
        password,
      });

      // Stocker toutes les informations de l'utilisateur
      const userData = response.data;
      localStorage.setItem('access_token', userData.access);
      localStorage.setItem('refresh_token', userData.refresh);
      localStorage.setItem('id', userData.id);
      localStorage.setItem('username', userData.username);
      localStorage.setItem('telephone', userData.telephone)
      localStorage.setItem('email', userData.email);
      localStorage.setItem('role', userData.role);
      localStorage.setItem('is_superuser', userData.is_superuser);
      localStorage.setItem('first_name', userData.first_name);
      localStorage.setItem('last_name', userData.last_name);

      // Log pour déboguer
      console.log('Informations utilisateur stockées:', {
        username: userData.username,
        email: userData.email,
        role: userData.role,
        telephone: userData.telephone,
        is_superuser: userData.is_superuser,
        first_name: userData.first_name,
        last_name: userData.last_name,
      });

      // Rediriger en fonction du rôle
      if (userData.role === 'provider' || userData.is_superuser) {
        navigate('/dashboard');
      } else {
        
        navigate('/');
      }
      
    } catch (err) {
      console.error('Erreur complète:', err.response);
      setError(err.response?.data?.error || 'Email ou mot de passe incorrect');
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
              {error && (
                <div className="alert alert-danger text-center">
                  {error}
                </div>
              )}
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