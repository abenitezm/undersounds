'use client'

import styled from "styled-components";
import colors from "../colors";

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
  time: Date;
  type: string;
  name: string;
  album: string;
}) => {
  return (
    <div style={styles.row}>
      <ActivityDate>{time.toLocaleDateString()}</ActivityDate>
      <span style={{fontSize: 20}}>{types[type].icon}</span>
      <ActivityUser>{name}</ActivityUser>
      <span>{types[type].text}</span>
      {type != "FOLLOWER" && <ActivityAlbum> {album}</ActivityAlbum>}
    </div>
  );
};

const styles = {
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
