// RegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    documentType: '',
    documentNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [documentError, setDocumentError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'documentNumber' && !(/^\d*$/.test(value))) {
      setDocumentError('Error, ingresa solo tu número de documento en este campo');
    } else {
      setDocumentError('');
    }

    setFormError('');
    setPasswordError('');
    setConfirmPasswordError('');

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setPasswordError('Error: contraseña mínima de 8 caracteres necesaria.');
      return;
    }

    for (const key in formData) {
      if (formData[key] === '') {
        setFormError('Error: todos los campos son obligatorios.');
        return;
      }
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError('Contraseña insegura, agrega al menos una letra mayúscula y un número.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden.');
      return;
    }

    console.log('Formulario enviado:', formData);

    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Registro</h2>
      {formError && <p className="error">{formError}</p>}

      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label>Tipo de Documento</label>
          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
          >
            <option value="">Seleccionar tipo de documento</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
          </select>
        </div>

        <div>
          <label>Número de Documento</label>
          <input
            type="text"
            name="documentNumber"
            value={formData.documentNumber}
            onChange={handleChange}
            className={documentError ? 'error-input' : ''}
          />
          {documentError && <p className="error">{documentError}</p>}
        </div>

        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Apellido</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={passwordError ? 'error-input' : ''}
          />
          <input
            type="checkbox"
            onChange={handleShowPassword}
            checked={showPassword}
          />
          <span>Mostrar Contraseña</span>
          {passwordError && <p className="error">{passwordError}</p>}
        </div>

        <div>
          <label>Confirmar Contraseña</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={confirmPasswordError ? 'error-input' : ''}
          />
          <input
            type="checkbox"
            onChange={handleShowConfirmPassword}
            checked={showConfirmPassword}
          />
          <span>Mostrar Contraseña</span>
          {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
        </div>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterForm;