import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CartWidget({ carrito }) {
  return (
    <Link to="/carrito">
      <Button variant="success">
        🛒 Carrito ({carrito.length})
      </Button>
    </Link>
  );
}

export default CartWidget;