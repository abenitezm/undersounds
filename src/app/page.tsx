"use client";

import colors from "./colors";
import ActivityRow from "./components/ActivityRow";
import { Album } from "./components/Album";
import PrimaryButton from "./components/PrimaryButton";
import SecondaryButton from "./components/SecondaryButton";
import { CSSProperties } from "react";
import NavBar from "./components/NavBar";
import FancyButton from "./components/FancyButton";


const rainbowColors = ["#A8DADC", "#F4A261", "#E76F51", "#457B9D", "#2A9D8F"];


export default function Home() {
  return (
    <>
      <div style={ styles.container }>
        <h1>Hola</h1>
        <PrimaryButton text={"Prueba"} onClick={() => alert("Prueba")} />
        <SecondaryButton text={"Prueba2"} onClick={() => alert("Prueba2")} />
        <Album name="Album 1" />
        <FancyButton title="Explorar todo" imageSrc="prettyButtons/all.png" bgColor="#A8DADC"
          onClick={() => alert("Cassette")} />
        <FancyButton title="Vinilo" imageSrc="prettyButtons/vinyl.png" bgColor="#F4A261"
          onClick={() => alert("Cassette")} />
        <FancyButton title="CDs" imageSrc="prettyButtons/cd.png" bgColor="#E76F51"
          onClick={() => alert("Cassette")} />
        <FancyButton title="Cassettes" imageSrc="prettyButtons/cassette.png" bgColor="#457B9D"
          onClick={() => alert("Cassette")} />
        <FancyButton title="Camisetas" imageSrc="prettyButtons/tshirt.png" bgColor="#2A9D8F"
          onClick={() => alert("Cassette")} />
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
