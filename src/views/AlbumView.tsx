import AlbumInfo from "@/views/components/AlbumInfo";
import { CSSProperties } from "react";

const AlbumView = ({id}: {id: string}) => {
  return (
    <main style={styles.main}>
      <AlbumInfo id={id} />
    </main>
  );
};

const styles: { [key: string]: CSSProperties } = {
  main: {
    padding: 20,
    width: "85%",
    display: "flex",
    flexDirection: "row",
  },
};

export default AlbumView;