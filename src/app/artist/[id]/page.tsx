import ProfileInfo from "@/app/components/ProfileInfo";
import AlbumDashboard from "@/app/components/AlbumsDashboard";

import formatID from "@/app/utils/formatID.js";

const ArtistPage = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  const id = param.id;

  const formattedId = formatID(id);

  return (
    <main style={styles.main}>
      <ProfileInfo id={formattedId} />
      <AlbumDashboard id={formattedId} />
    </main>
  );
};

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  main: {
    padding: 20,
    width: "85%",
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
  },
};

export default ArtistPage;
