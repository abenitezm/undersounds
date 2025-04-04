import ProfileInfo from "@/views/components/ProfileInfo";
import AlbumDashboard from "@/views/components/AlbumsDashboard";

import formatID from "@/utils/formatID.js";

const ArtistPage = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  const id = param.id;

  const formattedId = formatID(id);

  return (
    <main style={styles.main}>
      <ProfileInfo id={formattedId} />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          gap: 20,
        }}
      >
        <AlbumDashboard id={formattedId} />
        <MerchDashboard id={formattedId} />
      </div>
    </main>
  );
};

import { CSSProperties } from "react";
import MerchDashboard from "@/views/components/MerchDashboard";

const styles: { [key: string]: CSSProperties } = {
  main: {
    padding: 20,
    width: "85%",
    display: "flex",
    position: "relative",
    flexDirection: "row",
  },
};

export default ArtistPage;
