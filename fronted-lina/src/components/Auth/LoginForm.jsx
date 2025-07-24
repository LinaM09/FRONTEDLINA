import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); }
  100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
`;

const LoginContainer = styled.div`
  max-width: 440px;
  margin: 3rem auto;
  padding: 2.5rem;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  animation: ${fadeIn} 0.6s ease-out;
  transition: all 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  &:hover {
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
  }
`;

const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #4CAF50, #2E7D32);
    border-radius: 3px;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1.75rem;
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 500;
  color: #34495e;
  font-size: 0.95rem;
  transition: all 0.3s;
`;

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s;
  background-color: #f8f9fa;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
    background-color: #ffffff;
  }
  
  &::placeholder {
    color: #b2bec3;
  }
`;

const ErrorMessage = styled.div`
  color: #ffffff;
  background: linear-gradient(135deg, #ff6b6b, #ff5252);
  padding: 1rem;
  border-radius: 8px;
  margin: 1.75rem 0;
  text-align: center;
  font-size: 0.95rem;
  animation: ${fadeIn} 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &::before {
    content: '⚠️';
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: linear-gradient(135deg, #43A047, #1B5E20);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(46, 125, 50, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
  
  &:focus:not(:active)::after {
    animation: ${pulse} 1s ease-out;
  }
`;

const PasswordVisibilityToggle = styled.span`
  position: absolute;
  right: 12px;
  top: 40px;
  cursor: pointer;
  color: #7f8c8d;
  font-size: 0.9rem;
  user-select: none;
  
  &:hover {
    color: #4CAF50;
  }
`;

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(username, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Efecto de montaje
    document.title = 'Iniciar Sesión | Tu Aplicación';
    return () => {
      // Limpieza
    };
  }, []);

   return (
    <>
      <Navbar isAuthenticated={false} transparent />
      <LoginContainer>
        <LoginTitle>🔐 Iniciar Sesión</LoginTitle>

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel htmlFor="username">Usuario:</InputLabel>
            <InputField
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Ingrese su usuario"
              autoComplete="username"
            />
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="password">Contraseña:</InputLabel>
            <InputField
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
            />
            <PasswordVisibilityToggle 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️ Ocultar' : '👁️ Mostrar'}
            </PasswordVisibilityToggle>
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Ingresar'}
          </SubmitButton>
        </form>
      </LoginContainer>
    </>
  );
};

export default LoginForm;