
import { useState, createContext, useContext } from 'react';

// Importa una función simulada de autenticación (mock) desde un archivo local.
import { authMock } from '../api/authMock'; 

// Crea un contexto de autenticación que se compartirá en la aplicación.
const AuthContext = createContext();

// Componente proveedor del contexto que envuelve a los componentes hijos.
export const AuthProvider = ({ children }) => {
  // Estado del usuario autenticado, inicializado desde el localStorage si existe.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user'); // Intenta recuperar el usuario guardado.
    return savedUser ? JSON.parse(savedUser) : null; // Si existe, lo parsea; si no, inicia como null.
  });

  // Función de inicio de sesión (login), recibe username y password.
  const login = async (username, password) => {
    try {
      // Llama a la función mock de autenticación, que simula una API.
      const response = await authMock(username, password);

      // Estructura los datos del usuario a guardar.
      const userData = {
        username: response.user,
        token: response.token
      };

      // Actualiza el estado del usuario.
      setUser(userData);

      // Guarda el usuario en localStorage para persistencia.
      localStorage.setItem('user', JSON.stringify(userData));

      // Devuelve true para indicar que el login fue exitoso.
      return true;
    } catch (error) {
      // Si ocurre un error, se lanza para ser manejado externamente.
      throw error;
    }
  };

  // Función para cerrar sesión (logout).
  const logout = () => {
    setUser(null); // Limpia el estado del usuario.
    localStorage.removeItem('user'); // Elimina al usuario del almacenamiento local.
  };

  // Devuelve el proveedor de contexto, exponiendo el usuario y las funciones login/logout.
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* Renderiza los componentes hijos dentro del proveedor */}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación desde cualquier componente.
export const useAuth = () => useContext(AuthContext);
