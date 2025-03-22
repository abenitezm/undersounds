"use client";

import styled from "styled-components";
import colors from "../colors";
import { CSSProperties } from "react";

import AlbumIcon from "@mui/icons-material/Album";
import Link from "next/link";

const ActivityDate = styled.span`
  font-size: 1rem;
  border-radius: 5px;
  background-color: ${colors.primary};

  padding: 5px 8px;
`;

const ActivityUser = styled.span`
  font-weight: bold;
  font-size: 1rem;
  margin-right: 5px;
  color: ${colors.primary};
`;

const ActivityAlbum = styled.span`
  font-style: italic;
  font-size: 1rem;
  margin-left: 10px;
  gap: 5px;
  display: flex;
  align-items: center;
  color: ${colors.primary};
`;

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
}: {
  // Tipos de las propiedades que recibe el componente
  time: Date;
  type: "FOLLOWER" | "SALE" | "REVIEW";
  name: string;
  album: string;
}) => {
  return (
    <div style={styles.row}>
      <ActivityDate>{time.toLocaleDateString()}</ActivityDate>
      <span style={{ fontSize: 20 }}></span>
      <ActivityUser>
        {types[type].icon} {name}
      </ActivityUser>
      <span>{types[type].text}</span>
      {/* Renderiza el album al que se refiere la actividad cuando esta NO es de tipo Follower */}
      {type != "FOLLOWER" && (
        <Link href={`/album/${album}`}>
          <ActivityAlbum>
            {" "}
            <AlbumIcon /> {album}
          </ActivityAlbum>
        </Link>
      )}
    </div>
  );
};

const styles: { row: CSSProperties } = {
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: colors.tertiary,
    fontSize: "1rem",
  },
};

export default ActivityRow;
