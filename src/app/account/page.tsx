"use client";

import colors from "../colors";
import { useState } from "react";
import AccountForm from "../components/AccountForm";

const SettingsPage = () => {
  const [selected, setSelected] = useState("Account");

  return (
    <main style={styles.main}>
      <h1>Settings</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={styles.sideMenu}>
          <button
            style={styles.sideMenuButton}
            onClick={() => {
              setSelected("Account");
            }}
          >
            Account
          </button>
          <button
            style={styles.sideMenuButton}
            onClick={() => {
              setSelected("Notifications");
            }}
          >
            Notifications
          </button>
          <button
            style={styles.sideMenuButton}
            onClick={() => {
              setSelected("Payment");
            }}
          >
            Payment
          </button>
          <button
            style={styles.sideMenuButton}
            onClick={() => {
              setSelected("Merch");
            }}
          >
            Merch
          </button>
        </div>
        <div
          style={styles.form}
        >
            {selected === "Account" && <AccountForm/>}
            {selected === "Notifications" && <h2>Notifications</h2>}
            {selected === "Payment" && <h2>Payment</h2>}
            {selected === "Merch" && <h2>Merch</h2>}

        </div>
      </div>
    </main>
  );
};

const styles = {
  main: {
    padding: 20,
    width: "70%",
    height: "80vh",
    border: "1px solid red",
    marginTop: 10,
  },
  sideMenu: {
    display: "flex",
    height: "100%",
    width: "30%",
    flexDirection: "column",
    gap: 20,
    border: "1px solid blue",
    padding: 10,
    marginTop: 20,
    marginRight: 20,
  },
  form: {
    width: "70%",
    marginTop: 10,
    height: "70vh",
    border: "1px solid green",
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
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