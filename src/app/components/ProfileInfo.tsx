"use client";

import PrimaryButton from "./PrimaryButton";
import Image, { StaticImageData } from "next/image";


type ProfileInfoProps = {
    id: string;
   avatar: StaticImageData;
    generos: string[];
}

const ProfileInfo = ({ id, avatar, generos }: ProfileInfoProps) => {
  return (
    <div style={styles.artistContainer}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={styles.artistImage}>
          <Image src={avatar} alt="artist" width={160} height={160} />
        </div>
        <div style={styles.artistButtons}>
          <PrimaryButton text="Seguir" onClick={() => console.log("Seguir")} />
          <PrimaryButton
            text="Compartir"
            onClick={() => console.log("Compartir")}
          />
        </div>
        <div style={styles.artistInfo}>
          <span style={styles.artistName}>{id}</span>
          <span>Madrid</span>
          <div style={styles.artistGenres}>
            {generos.map((genero: string) => (
              <span key={genero}>{genero}</span>
            ))}
          </div>
          <p style={styles.artistDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cum
            consectetur officiis veniam! Maiores repellat enim ipsum rerum. Aut
            suscipit eius ea alias. Eum, nesciunt vel consequatur dolores
            doloremque iure? Accusantium saepe cumque quisquam explicabo odio
            expedita. Commodi ullam minima hic architecto?
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  artistContainer: {
    borderWidth: 2,
    padding: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  artistImage: {
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "gray",
  },
  artistButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  artistInfo: {
    width: "60%",
    padding: 10,
    gap: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  artistName: {
    fontSize: 22,
    marginLeft: -5,
  },
  artistGenres: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 14,
    gap: 10,
  },
  artistDescription: {
    textAlign: "justify",
    fontSize: 14,
    color: "gray",
  },
};


export default ProfileInfo;