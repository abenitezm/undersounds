"use client";

import colors from "./colors";
import ActivityRow from "./components/ActivityRow";
import { Album } from "./components/Album";
import PrimaryButton from "./components/PrimaryButton";
import NavigationPage from "./navigation/navigationPage";
import { CSSProperties } from "react";


export default function Home() {
  return (
    <div style={ styles.container }>
      <h1>Hola</h1>
      <PrimaryButton text={"Prueba"} onClick={() => alert("Prueba")} />
      <Album name="Album 1" />
      <div id="navigationPage" style = { styles.container }>
        <NavigationPage />
      </div>
    </div>
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
