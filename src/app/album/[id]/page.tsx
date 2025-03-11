import formatID from "@/app/utils/formatID.js";
import AlbumInfo from "@/app/components/AlbumInfo";
import { CSSProperties } from "react";

const AlbumPage = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  const id = param.id;

  const formattedId = formatID(id);



  return (
    <main style={styles.main}>
        <AlbumInfo id={formattedId} />
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

export default AlbumPage;