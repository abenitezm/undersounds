"use client";

import colors from "./colors";
import ActivityRow from "./components/ActivityRow";
import { Album } from "./components/Album";
import NavBar from "./components/NavBar";
import PrimaryButton from "./components/PrimaryButton";
import SecondaryButton from "./components/SecondaryButton";
import NavigationPage from "./navigation/navigationPage";
import { CSSProperties } from "react";


export default function Home() {
  return (
    <>
      <NavBar />
      <div style={ styles.container }>
        <h1>Hola</h1>
        <PrimaryButton text={"Prueba"} onClick={() => alert("Prueba")} />
        <SecondaryButton text={"Prueba2"} onClick={() => alert("Prueba2")} />
        <Album name="Album 1" />
        <div id="navigationPage" style = { styles.container }>
          <NavigationPage />
        </div>
      </div>
    </>
  );
}


const styles: { container: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px"
  },
};
