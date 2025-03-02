'use client'

import styled from "styled-components";
import colors from "../colors";
import { CSSProperties } from 'react';

const ActivityDate = styled.span`
    font-size: 15px;
    border-radius: 5px;
    background-color: #f0f0f0;
    padding: 5px;
`

const ActivityUser = styled.span`
    font-weight: bold;
    color: ${colors.background};
`

const ActivityAlbum = styled.span`
    font-style: italic;
    color: ${colors.tertiary};

`

// Contiene los 3 tipos de actividad que se pueden mostrar: FOLLOWER, SALE y REVIEW
const types = {
  FOLLOWER: {
    color: "blue",
    icon: "👥",
    text: "empezó a seguirte.",
  },
  SALE: {
    color: "green",
    icon: "💰",
    text: "compró tu álbum ",
  },
  REVIEW: {
    color: "purple",
    icon: "⭐",
    text: "escribió una reseña sobre ",
  },
};

const ActivityRow = ({
  time,
  type,
  name,
  album,
}: { // Tipos de las propiedades que recibe el componente
  time: Date; 
  type: "FOLLOWER" | "SALE" | "REVIEW";
  name: string;
  album: string;
}) => {
  return (
    <div style={styles.row}>
      <ActivityDate>{time.toLocaleDateString()}</ActivityDate>
      <span style={{fontSize: 20}}>{types[type].icon}</span>
      <ActivityUser>{name}</ActivityUser>
      <span>{types[type].text}</span>
      {/* Renderiza el album al que se refiere la actividad cuando esta NO es de tipo Follower */}
      {type != "FOLLOWER" && <ActivityAlbum> {album}</ActivityAlbum>}
    </div>
  );
};


const styles: { row: CSSProperties } = {
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    fontSize: 15,
    border: '1px solid #f0f0f0',
  },
};

export default ActivityRow;
