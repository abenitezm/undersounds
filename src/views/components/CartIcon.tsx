import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from "styled-components";
import colors from "../../app/colors";
import { useShoppingCart } from "./ShoppingCartContext";
import { useEffect, useState } from "react";
import Link from "next/link";

const IconButton = styled.div`
  font-size: 46px; /* Tamaño del icono */
  cursor: pointer;
  position: relative;
  width: 50px; /* Establecer un tamaño fijo para el contenedor */
  height: 50px; /* Establecer un tamaño fijo para el contenedor */
  border-radius: 50%; /* Hace el fondo completamente circular */
  transition: background-color 0.3s ease;
  display: flex; /* Usar flexbox para alinear el icono */
  align-items: center; /* Centra el icono verticalmente */
  justify-content: center; /* Centra el icono horizontalmente */

  &:hover {
    background-color: ${colors.primary};
  }

  /* Asegura que el icono tenga un tamaño consistente */
  & svg {
    font-size: 36px !important; /* Asegura que todos los iconos tengan el mismo tamaño */
  }
`;

const CartQuantity = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${colors.primary};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const CartIcon = () => {
  const { cart } = useShoppingCart();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const newQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    setQuantity(newQuantity);
  }, [cart]);

  return (
    <IconButton>
      <Link href="/cart">
        <ShoppingCartIcon />
        <CartQuantity>{quantity}</CartQuantity>
      </Link>
    </IconButton>
  );
};

export default CartIcon;
