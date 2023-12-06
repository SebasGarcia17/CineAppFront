import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Importar el estilo del formulario

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const navigate = useNavigate(); // Agregado: hook para navegación

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpiar mensajes de error al corregir el campo
    setFormError('');
    setEmailError('');
    setPasswordError('');

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que no haya campos vacíos en el formulario
    for (const key in formData) {
      if (formData[key] === '') {
        setFormError('Error: todos los campos son obligatorios.');
        return;
      }
    }

    // Lógica de autenticación (puedes implementar tu lógica de autenticación aquí)
    const isAuthenticated = true; // Cambiar esto según tu lógica

    if (!isAuthenticated) {
      // Simular un error de autenticación
      setFormError('Error: correo o contraseña incorrectos.');
      return;
    }

    // Lógica de redirección después de la autenticación exitosa
    console.log('Inicio de sesión exitoso. Redirigiendo al home...');
    navigate('/home');
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      {formError && <p className="error">{formError}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ border: '1px solid #000', color: '#000' }}
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ border: passwordError ? '2px solid red' : '1px solid #000', color: '#000' }}
          />
          <input
            type="checkbox"
            onChange={handleShowPassword}
            checked={showPassword}
          />
          <span>Mostrar Contraseña</span>
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>

        <button type="submit" style={{ background: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
