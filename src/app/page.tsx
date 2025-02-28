"use client";

import ActivityRow from "./components/ActivityRow";
import { Album } from "./components/Album";
import NavigationPage from "./navigation/navigationPage";
import { CSSProperties } from "react";


export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Hola</h1>
      <Album name="Album 1" />
      <div id="navigationPage">
        <NavigationPage />
      </div>
    </div>
  );
}


const styles: { container: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    height: "50vh",
  },
};
