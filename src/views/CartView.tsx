"use client";
import styled from "styled-components";
import { useShoppingCart } from "@/views/components/ShoppingCartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartItem from "../views/components/CartItem";
import { useEffect, useState } from "react";
import colors from "../app/colors";
import Link from "next/link";

const Title = styled.h1`
  margin: 5px 0;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const CartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
  width: 80%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  padding: 10px;
  width: 100%;
`;

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
`;

const EmptyCartMessage = styled.span`
  font-size: 1.2rem;
  margin-top: 20px;
`;

const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  padding: 20px;
  border: 1px solid ${colors.tertiary};
  border-radius: 5px;
`;

const Separator = styled.div`
  width: 96%;
  margin: 10px 0;
  height: 1px;
  opacity: 0.1;
  background-color: ${colors.secondary};
`;

const PaymentButton = styled.button<{ cartLength?: number }>`
  background-color: ${(props) =>
    props.cartLength === 0 ? colors.tertiary : colors.primary};

  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: ${(props) => (props.cartLength === 0 ? "not-allowed" : "pointer")};
`;

const ContinueShoppingButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  width: 25%;
  margin-top: 20px;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const CartView = () => {
  const { cart } = useShoppingCart();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cart.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  }, [cart]);

  const taxes = 0.1;
  const shipping = 9.99;

  return (
    <CartPageContainer>
      <Title>
        {" "}
        <ShoppingCartIcon /> Tu carrito
      </Title>
      <Row>
        {cart.length === 0 ? (
          <div
            style={{ display: "flex", flexDirection: "column", width: "60%" }}
          >
            <EmptyCartMessage>
              ¡No hay productos en el carrito!
            </EmptyCartMessage>
            <ContinueShoppingButton>
              <Link href="/navigation">Seguir comprando</Link>
            </ContinueShoppingButton>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", width: "60%" }}
          >
            <CartItemsContainer>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </CartItemsContainer>
            <ContinueShoppingButton>
              <Link href="/navigation">Seguir comprando</Link>
            </ContinueShoppingButton>
          </div>
        )}
        <OrderSummary>
          <h2>Resumen del pedido</h2>
          <Row>
            <span>Subtotal</span>
            <span>{total.toFixed(2)}$</span>
          </Row>
          <Row>
            <span>Envío</span>
            <span>{shipping.toFixed(2)}$</span>
          </Row>
          <Row>
            <span>Impuestos</span>
            <span>{(taxes * total).toFixed(2)}$</span>
          </Row>
          <Separator />
          <Row>
            <span>Total</span>
            <span>{(total + taxes * total + shipping).toFixed(2)}$</span>
          </Row>
          <PaymentButton cartLength={cart.length} disabled={cart.length === 0}>
            Proceder al pago
          </PaymentButton>
        </OrderSummary>
      </Row>
    </CartPageContainer>
  );
};

export default CartView;