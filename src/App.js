import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Home from './Home';
import Cartelera from './Cartelera'; // Importa el nuevo componente Cartelera

const App = () => {
  const [user, setUser] = useState(null); // Inicializa el estado del usuario

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm setUser={setUser} />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/register" element={<RegisterForm setUser={setUser} />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/cartelera" element={<Cartelera />} /> {/* Agrega la nueva ruta para la cartelera */}
      </Routes>
    </Router>
  );
};

export default App;

