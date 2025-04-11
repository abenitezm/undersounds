"use client";

import Album from "@/views/components/Album";
import colors from "../app/colors";
import ActivityRow from "../views/components/ActivityRow";

import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const DashboardView = () => {
  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Bienvenido a tus estadísticas</h1>
      <h2 style={styles.subtitle}>
        Así van las novedades de tu música esta semana
      </h2>
      <div style={styles.statsContainer}>
        <div style={styles.stat}>
          <span style={styles.statTitle}>
            {" "}
            <MusicNoteIcon /> Reproducciones:
          </span>
          <span style={styles.statNumber}>617</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statTitle}>
            <PersonIcon />
            Seguidores:
          </span>
          <span style={styles.statNumber}>58</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statTitle}>
            <AttachMoneyIcon />
            Ventas:
          </span>
          <span style={styles.statNumber}>69</span>
        </div>
      </div>
      <h2 style={styles.subtitle}>Este es tu álbum más escuchado</h2>
      <div style={styles.albumContainer}>
        <div style={{ width: "15%" }}>
          <Album name="Album 1" genre="Hip-Hop" year="2020" price="9.99" />
        </div>
        <DiscountButton>Crear un código de descuento</DiscountButton>
      </div>
      <h2 style={styles.subtitle}>Esta es tu actividad reciente</h2>
      <div style={styles.activityContainer}>
        <ActivityRow
          time={new Date()}
          type="FOLLOWER"
          name="Usuario 1"
          album=""
        />
        <ActivityRow
          time={new Date()}
          type="SALE"
          name="Usuario 2"
          album="Album 2"
        />
        <ActivityRow
          time={new Date()}
          type="REVIEW"
          name="Usuario 2"
          album="Album 5"
        />
      </div>
    </main>
  );
};

import { CSSProperties } from "react";
import styled from "styled-components";

const DiscountButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.background};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: ${colors.secondary};
  }

  transition: background-color 0.2s;
`;

const styles: { [key: string]: CSSProperties } = {
  main: {
    gap: 20,
    display: "flex",
    flexDirection: "column",
    padding: 20,
    width: "70%",
  },
  title: {
    fontSize: 24,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "normal",
    marginTop: 15,
    marginLeft: 10,
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  stat: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    color: colors.background,
    backgroundColor: colors.primary,
  },
  statTitle: {
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    gap: 3,
  },
  statNumber: {
    color: colors.tertiary,
    fontSize: 16,
    fontWeight: "bold",
  },
  albumContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  activityContainer: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    gap: 10,
  },
};

export default DashboardView;
