"use client";

import colors from "./colors";
import { CSSProperties } from "react";
import FancyButton from "./components/FancyButton";
import HomeGrid from "./components/HomeGrid";
import Novedades from "./components/Novedades";

export default function Home() {
  return (
    <>
      <HomeGrid />
      <p
        style={{
          fontSize: "1.1rem",
          color: colors.secondary,
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        Los fans han pagado a los artistas
        <strong style={{ color: colors.primary, fontSize: "1.3rem" }}>
          {" "}
          1.46 billones de euros{" "}
        </strong>
        usando Undersounds, y
        <strong style={{ color: colors.primary, fontSize: "1.3rem" }}>
          {" "}
          194 millones de euros{" "}
        </strong>
        en el último año.
      </p>

      <div style={styles.container}>
        <FancyButton
          title="Explorar todo"
          imageSrc="prettyButtons/all.png"
          bgColor={colors.rainbow1}
          navigateTo="/navigation"
        />
        <FancyButton
          title="Vinilo"
          imageSrc="prettyButtons/vinyl.png"
          bgColor={colors.rainbow2}
          navigateTo="/navigation?category=Vinilo"
        />
        <FancyButton
          title="CDs"
          imageSrc="prettyButtons/cd.png"
          bgColor={colors.rainbow3}
          navigateTo="/navigation?category=CD"
        />
        <FancyButton
          title="Cassettes"
          imageSrc="prettyButtons/cassette.png"
          bgColor={colors.rainbow4}
          navigateTo="/navigation?category=Cassete"
        />
        <FancyButton
          title="Merch"
          imageSrc="prettyButtons/tshirt.png"
          bgColor={colors.rainbow5}
          navigateTo="/Tienda"
        />
      </div>

      <Novedades />
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
    paddingBottom: "20px",
  },
};
