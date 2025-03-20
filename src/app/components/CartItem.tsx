"use client";

import styled from "styled-components";
import Image from "next/image";
import colors from "../colors";
import { useShoppingCart } from "./ShoppingCartContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid ${colors.primary};
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const ItemName = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const ItemPrice = styled.span`
  opacity: 0.7;
`;

const QuantityButton = styled.button`
  background-color: transparent;
  width: 3.5ch;
  font-size: 1rem;
  height: auto;
  color: white;
  aspect-ratio: 1;
  padding: 5px 7px;
  border: 1px solid ${colors.primary};
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

interface CartItemInterface {
  id: string | number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const CartItem = ({ item }: { item: CartItemInterface }) => {
  const { addToCart, removeFromCart } = useShoppingCart();

  return (
    <Item>
      <div style={{ display: "flex", gap: 10 }}>
        <Image
          style={{ borderRadius: 5, margin: 5 }}
          width={100}
          height={100}
          src={item.image}
          alt={item.name}
        />
        <ItemInfo>
          <ItemName>{item.name}</ItemName>
          <ItemPrice>{item.price}$</ItemPrice>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <QuantityButton
              onClick={() => {
                if (item.quantity === 1) {
                  removeFromCart(item.id as string);
                } else {
                  addToCart({ ...item, quantity: -1 });
                }
              }}
            >
              -
            </QuantityButton>
            <span>{item.quantity}</span>

            <QuantityButton onClick={() => addToCart({ ...item, quantity: 1 })}>
              +
            </QuantityButton>
          </div>
        </ItemInfo>
      </div>
      <AdditionalInfo>
        <span>{item.price * item.quantity}$</span>
        <DeleteButton onClick={() => removeFromCart(item.id as string)}>
          <DeleteOutlineIcon color="error" />
        </DeleteButton>
      </AdditionalInfo>
    </Item>
  );
};

export default CartItem;
