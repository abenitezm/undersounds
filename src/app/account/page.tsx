"use client";

import colors from "../colors";
import { useState } from "react";
import AccountForm from "../components/AccountForm";
import styled from "styled-components";
import NotificationsForm from "../components/NotificationsForm";
import PaymentForm from "../components/PaymentForm";
import MerchForm from "../components/MerchForm";

const menuItems = ["Cuenta", "Notificaciones", "Método de pago", "Merch"];

const SettingsPage = () => {
  const [selected, setSelected] = useState("Cuenta");

  return (
    <main style={styles.main}>
      <h1>Configuración</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideMenu>
          {menuItems.map((item) => (
            <SideMenuItem
              key={item}
              $isSelected={selected === item}
              onClick={() => setSelected(item)}
            >
              {item}
            </SideMenuItem>
          ))}
        </SideMenu>
        <FormArea>
          {selected === "Cuenta" && <AccountForm />}
          {selected === "Notificaciones" && <NotificationsForm />}
          {selected === "Método de pago" && <PaymentForm />}
          {selected === "Merch" && <MerchForm />}
        </FormArea>
      </div>
    </main>
  );
};

const SideMenu = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  overflow: hidden;
  border-radius: 5px;
  margin-right: 20px;
`;

interface SideMenuItemProps {
  $isSelected: boolean;
}

// El elemento tiene props para saber si está seleccionado o no
const SideMenuItem = styled.button<SideMenuItemProps>`
  border: none;
  background-color: ${colors.tertiary};
  cursor: pointer;
  color: white;

  opacity: ${({ $isSelected }) => ($isSelected ? "1" : "0.80")};
  font-size: 1.2rem;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 25px;
  text-align: left;

  &:hover {
    opacity: 1;
  }
`;

const FormArea = styled.div`
  padding: 15px 15px 15px 20px;
  width: 70%;
  height: 70vh;
  border-radius: 5px;
  display: flex;
  background-color: ${colors.tertiary};
  flex-direction: column;
`;

const styles = {
  main: {
    padding: 20,
    width: "70%",
    height: "80vh",
    marginTop: 10,
  },
};

export default SettingsPage;
