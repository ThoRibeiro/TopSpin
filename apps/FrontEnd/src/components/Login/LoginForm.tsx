import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../../services/loginService.ts';
import { useAuth } from '../../Context/AuthContext';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await LoginService.login(email, password);
      if (response.jwt) {
        localStorage.setItem('token', response.jwt);
        login();
        navigate('/admin');
      } else {
        setError('Accès refusé: vous n\'avez pas les droits nécessaires.');
      }
    } catch (err) {
      setError('Erreur lors de la connexion. Veuillez réessayer.');
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h1>Connexion</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Se connecter</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
