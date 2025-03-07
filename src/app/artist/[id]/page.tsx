import defaultAvatar from "../../../assets/img/defaultAvatar.jpg";
import { Album } from "@/app/components/Album";
import ProfileInfo from "@/app/components/ProfileInfo";
import data from '../../content.json';

const ArtistPage = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  const id = param.id;
  
  const artistGeneros = ["Rock", "Pop", "Jazz", "Blues"];

  return (
    <main style={styles.main}>
      <ProfileInfo id={id} avatar={defaultAvatar} generos={artistGeneros} />
      <div style={styles.albumSection}>
        <h2 style={{ fontSize: 20 }}>Albums</h2>
        <div style={styles.artistAlbums}>
          {data.map((album) => (
            <Album key={album.id} name={album.titulo} />
          ))}
        </div>
      </div>
    </main>
  );
};

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  main: {
    padding: 20,
    width: "80%",
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
  },
  artistAlbums: {
    marginTop: 10,
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 20,
  },
  albumSection: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
};

export default ArtistPage;
