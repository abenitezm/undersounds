import Image from "next/image";
import defaultAvatar from "../../../assets/img/defaultAvatar.jpg";
import { Album } from "@/app/components/Album";


const ArtistPage = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  const id = param.id;

  const artistAlbums = ["Album 1", "Album 2", "Album 3", "Album 4"];

  const artistGeneros = ["Rock", "Pop", "Jazz", "Blues"];

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Perfil de {id}</h1>
      <div style={styles.artistContainer}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={styles.artistImage}>
            <Image src={defaultAvatar} alt="artist" width={160} height={160} />
          </div>
          <div style={styles.artistButtons}>
            <button>Seguir</button>
            <button>Compartir</button>
          </div>
        </div>
        <div style={styles.artistInfo}>
          <span style={styles.artistName}>{id}</span>
          <span>Madrid</span>
          <div style={styles.artistGenres}>
            {artistGeneros.map((genero) => (
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
      <h2 style={{ fontSize: 20 }}>Albums</h2>
      <div style={styles.artistAlbums}>
        {artistAlbums.map((album) => (
          <Album key={album} name={album} />
        ))}
      </div>
    </main>
  );
};

const styles = {
  main: {
    padding: 20,
    width: "70%",
  },
  title: {
    fontSize: 24,
  },
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
  artistAlbums: {
    marginTop: 10,
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 20,
  },
};

export default ArtistPage;
