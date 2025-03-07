import defaultAvatar from "../../../assets/img/defaultAvatar.jpg";
import { Album } from "@/app/components/Album";
import ProfileInfo from "@/app/components/ProfileInfo";


const ArtistPage = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  const id = param.id;

  const artistAlbums = ["Album 1", "Album 2", "Album 3", "Album 4"];

  const artistGeneros = ["Rock", "Pop", "Jazz", "Blues"];

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Perfil de {id}</h1>
      <ProfileInfo id={id} avatar={defaultAvatar} generos={artistGeneros} />
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
  artistAlbums: {
    marginTop: 10,
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 20,
  },
};

export default ArtistPage;
