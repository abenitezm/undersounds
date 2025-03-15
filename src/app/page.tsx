"use client";

import colors from "./colors";
import { CSSProperties } from "react";
import FancyButton from "./components/FancyButton";
import HomeGrid from "./components/HomeGrid";


const rainbowColors = ["#A8DADC", "#F4A261", "#E76F51", "#457B9D", "#2A9D8F"];


export default function Home() {
  return (
    <>
      <HomeGrid />
      <p style={{ fontSize: '1.1rem', color: colors.secondary, paddingTop: '20px', paddingBottom: '20px'}}>
        Los fans han pagado a los artistas 
        <strong style={{ color: colors.primary, fontSize: '1.3rem' }}> 1.46 billones de euros </strong> 
        usando Undersounds, y 
        <strong style={{ color: colors.primary, fontSize: '1.3rem' }}> 194 millones de euros </strong> 
        en el último año.
      </p>

      <div style={ styles.container }>
        <FancyButton title="Explorar todo" imageSrc="prettyButtons/all.png" bgColor="#A8DADC"
          onClick={() => alert("Explorar")} />
        <FancyButton title="Vinilo" imageSrc="prettyButtons/vinyl.png" bgColor="#F4A261"
          onClick={() => alert("Vinilo")} />
        <FancyButton title="CDs" imageSrc="prettyButtons/cd.png" bgColor="#E76F51"
          onClick={() => alert("CDs")} />
        <FancyButton title="Cassettes" imageSrc="prettyButtons/cassette.png" bgColor="#457B9D"
          onClick={() => alert("Cassettes")} />
        <FancyButton title="Merch" imageSrc="prettyButtons/tshirt.png" bgColor="#2A9D8F"
          onClick={() => alert("Merch")} />
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
    gap: "20px",
    paddingTop: "20px",
    paddingBottom: "20px"
  },
};
