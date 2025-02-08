import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/api/token/', {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/'); // Rediriger après connexion
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleSignupClick = () => {
    navigate('/signup'); // Rediriger vers la page d'inscription
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Changement immédiat sans animation
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
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
            <p className="text-center">
              Vous n'avez pas de compte ?{' '}
              <button
                type="button"
                className="btn btn-link"
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