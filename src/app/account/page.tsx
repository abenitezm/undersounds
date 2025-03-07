"use client";

import colors from "../colors";
import { useState } from "react";
import AccountForm from "../components/AccountForm";
import styled from "styled-components";

const menuItems = ["Account", "Notifications", "Payment", "Merch"];

const SettingsPage = () => {
  const [selected, setSelected] = useState("Account");

  return (
    <main style={styles.main}>
      <h1>Settings</h1>
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
        <div style={styles.form}>
          {selected === "Account" && <AccountForm />}
          {selected === "Notifications" && <h2>Notifications</h2>}
          {selected === "Payment" && <h2>Payment</h2>}
          {selected === "Merch" && <h2>Merch</h2>}
        </div>
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

const SideMenuItem = styled.button`
  border: none;
  background-color: ${colors.primary};
  cursor: pointer;
  color: white;

  opacity: ${({ $isSelected }) => ($isSelected ? "1" : "0.85")};
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 25px;
  text-align: left;
`;

const styles = {
  main: {
    padding: 20,
    width: "70%",
    height: "80vh",
    border: "1px solid red",
    marginTop: 10,
  },
  form: {
    width: "70%",
    marginTop: 10,
    height: "70vh",
    border: "1px solid green",
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  sideMenuButton: {
    border: "none",
    color: colors.secondary,
    backgroundColor: "red",
    cursor: "pointer",
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    textAlign: "left",
  },
};

export default SettingsPage;
