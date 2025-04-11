"use client";

import colors from "../app/colors";
import { useState, useEffect } from "react";
import AccountForm from "./components/AccountForm";
import styled from "styled-components";
import NotificationsForm from "./components/NotificationsForm";
import PaymentForm from "./components/PaymentForm";
import MerchForm from "./components/MerchForm";

const menuItems = ["Cuenta", "Notificaciones", "Método de pago"];

const AccountView = () => {
  const [selected, setSelected] = useState("Cuenta");
  const [userData, setUserData] = useState({});

  const uid = localStorage.getItem("uid");
  const role = localStorage.getItem("registerRole");

  useEffect(()=>{
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:8000/getuser/" + uid);
      const data = await response.json();
      setUserData(data);
    };
    fetchData();
  }, [])


  
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
          {role === "artista" && (
            <SideMenuItem
              $isSelected={selected === "Merch"}
              onClick={() => setSelected("Merch")}
            >
              Merch
            </SideMenuItem>
          )}
        </SideMenu>
        <FormArea>
          {selected === "Cuenta" && <AccountForm userData={userData} />}
          {selected === "Notificaciones" && <NotificationsForm userData={userData}/>}
          {selected === "Método de pago" && <PaymentForm userData={userData}/>}
          {selected === "Merch" && <MerchForm userData={userData}/>}
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

export default AccountView;
