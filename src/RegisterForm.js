// RegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form className="p-4 shadow-lg register-form rounded" onSubmit={handleSubmit}>
            <h2 className="mb-4 text-center">Registro</h2>
            {formError && <p className="text-danger text-center">{formError}</p>}

            <Form.Group>
              <Form.Label>Tipo de Documento</Form.Label>
              <Form.Control
                as="select"
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
              >
                <option value="">Seleccionar tipo de documento</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="CE">Cédula de Extranjería</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Número de Documento</Form.Label>
              <Form.Control
                type="text"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
                className={documentError ? 'is-invalid' : ''}
              />
              {documentError && <Form.Text className="text-danger">{documentError}</Form.Text>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={passwordError ? 'is-invalid' : ''}
              />
              <Form.Check
                type="checkbox"
                label="Mostrar Contraseña"
                onChange={handleShowPassword}
                checked={showPassword}
              />
              {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={confirmPasswordError ? 'is-invalid' : ''}
              />
              <Form.Check
                type="checkbox"
                label="Mostrar Contraseña"
                onChange={handleShowConfirmPassword}
                checked={showConfirmPassword}
              />
              {confirmPasswordError && <Form.Text className="text-danger">{confirmPasswordError}</Form.Text>}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;





