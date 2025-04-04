import ProfileInfo from "@/views/components/ProfileInfo";
import AlbumDashboard from "@/views/components/AlbumsDashboard";
import { CSSProperties } from "react";
import MerchDashboard from "@/views/components/MerchDashboard";

const ArtistView = ({ id }: { id: string }) => {
  return (
    <main style={styles.main}>
      <ProfileInfo id={id} />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          gap: 20,
        }}
      >
        <AlbumDashboard id={id} />
        <MerchDashboard id={id} />
      </div>
    </main>
  );
};

const styles: { [key: string]: CSSProperties } = {
  main: {
    padding: 20,
    width: "85%",
    display: "flex",
    position: "relative",
    flexDirection: "row",
  },
};


export default ArtistView;