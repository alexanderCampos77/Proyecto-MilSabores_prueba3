import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Registro from '../pages/Registro.jsx';

describe('Registro Component', () => {
  const mockRegistrarUsuario = jest.fn();

  beforeEach(() => {
    mockRegistrarUsuario.mockClear();
    render(
      <BrowserRouter>
        <Registro registrarUsuario={mockRegistrarUsuario} />
      </BrowserRouter>
    );
  });

  it('debería renderizar el formulario correctamente', () => {
    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Edad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha de nacimiento/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  it('debería mostrar errores de validación si los campos obligatorios están vacíos', async () => {
    const user = userEvent.setup();
    const submitButton = screen.getByRole('button', { name: /Registrarse/i });

    await user.click(submitButton);

    expect(await screen.findByText('El nombre es obligatorio.')).toBeVisible();
    expect(screen.getByText('El correo debe incluir un "@".')).toBeVisible();
    expect(screen.getByText('La edad es obligatoria.')).toBeVisible();
    expect(screen.getByText('El teléfono es obligatorio.')).toBeVisible();
    expect(screen.getByText('La fecha de nacimiento es obligatoria.')).toBeVisible();
    expect(mockRegistrarUsuario).not.toHaveBeenCalled();
  });

  it('debería mostrar error si el correo no tiene "@"', async () => {
    const user = userEvent.setup();
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const submitButton = screen.getByRole('button', { name: /Registrarse/i });

    await user.type(emailInput, 'testsinarroba.com');
    await user.click(submitButton);

    expect(await screen.findByText('El correo debe incluir un "@".')).toBeVisible();
    expect(mockRegistrarUsuario).not.toHaveBeenCalled();
  });

  it('debería mostrar error si la edad es menor a 13', async () => {
      const user = userEvent.setup();
      const edadInput = screen.getByLabelText(/Edad/i);
      const submitButton = screen.getByRole('button', { name: /Registrarse/i });

      await user.type(edadInput, '12');
      await user.click(submitButton);

      expect(await screen.findByText('Debes ser mayor de 13 años.')).toBeVisible();
      expect(mockRegistrarUsuario).not.toHaveBeenCalled();
    });

  it('debería mostrar error si el teléfono no tiene 9 dígitos', async () => {
      const user = userEvent.setup();
      const telefonoInput = screen.getByLabelText(/Teléfono/i);
      const submitButton = screen.getByRole('button', { name: /Registrarse/i });

      await user.type(telefonoInput, '12345');
      await user.click(submitButton);

      expect(await screen.findByText('El teléfono debe tener 9 dígitos.')).toBeVisible();
      expect(mockRegistrarUsuario).not.toHaveBeenCalled();
    });

  it('debería mostrar error si la fecha no coincide con la edad', async () => {
      const user = userEvent.setup();
      const edadInput = screen.getByLabelText(/Edad/i);
      const fechaInput = screen.getByLabelText(/Fecha de nacimiento/i);
      const submitButton = screen.getByRole('button', { name: /Registrarse/i });

      await user.type(edadInput, '30');
      
      fireEvent.change(fechaInput, { target: { value: '2000-01-01' } }); 

      await user.click(submitButton);

      expect(await screen.findByText('La fecha de nacimiento no coincide con la edad ingresada.')).toBeVisible();
      expect(mockRegistrarUsuario).not.toHaveBeenCalled();
    });


  it('debería llamar a registrarUsuario con datos válidos', async () => {
    const user = userEvent.setup();
    const nombreInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const edadInput = screen.getByLabelText(/Edad/i);
    const telefonoInput = screen.getByLabelText(/Teléfono/i);
    const fechaInput = screen.getByLabelText(/Fecha de nacimiento/i);
    const submitButton = screen.getByRole('button', { name: /Registrarse/i });

    const testData = {
      nombre: 'Usuario Test',
      email: 'test@example.com',
      edad: '25',
      telefono: '123456789',
      fechaNacimiento: '2000-10-23' 
    };

    await user.type(nombreInput, testData.nombre);
    await user.type(emailInput, testData.email);
    await user.type(edadInput, testData.edad);
    await user.type(telefonoInput, testData.telefono);
    fireEvent.change(fechaInput, { target: { value: testData.fechaNacimiento } });


    await user.click(submitButton);

    await waitFor(() => {
       expect(screen.getByText(/¡Registro exitoso!/i)).toBeVisible();
    });


    expect(mockRegistrarUsuario).toHaveBeenCalledTimes(1);
    expect(mockRegistrarUsuario).toHaveBeenCalledWith(expect.objectContaining({
        nombre: testData.nombre,
        email: testData.email,
        edad: testData.edad,
        telefono: testData.telefono,
        fechaNacimiento: testData.fechaNacimiento
    }));
    expect(screen.queryByText(/obligatorio/i)).not.toBeInTheDocument(); 
  });

});
