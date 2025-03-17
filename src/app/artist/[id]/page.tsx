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
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
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
import MerchDashboard from "@/app/components/MerchDashboard";

const styles: { [key: string]: CSSProperties } = {
  main: {
    padding: 20,
    width: "85%",
    display: "flex",
    flexDirection: "row",
  },
};

export default ArtistPage;
