import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import Header from '../Header.jsx';

describe('Header Component', () => {

  it('debería renderizar sin errores', () => {
 
    render(
      <BrowserRouter>
        <Header numeroItems={0} carrito={[]} usuario={null} />
      </BrowserRouter>
    );

    const brandElement = screen.getByText(/Pastelería Mil Sabores/i);

    expect(brandElement).toBeInTheDocument();
  });


  it('debería mostrar el contador del carrito en 0', () => {
    render(
      <BrowserRouter>
        <Header numeroItems={0} carrito={[]} usuario={null} />
      </BrowserRouter>
    );

    const cartButton = screen.getByText(/Carrito \(0\)/i);
    expect(cartButton).toBeInTheDocument();
  });
   it('debería mostrar botones de Iniciar Sesión y Crear Cuenta si no hay usuario', () => {
    render(
      <BrowserRouter>
        <Header numeroItems={0} carrito={[]} usuario={null} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
    expect(screen.getByText(/Crear Cuenta/i)).toBeInTheDocument();
   });

});