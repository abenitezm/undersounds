import formatID from "@/utils/formatID.js";
import ArtistView from "@/views/ArtistView";

const ArtistPage = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  const id = param.id;

  const formattedId = formatID(id);

  return <ArtistView id={formattedId} />;
};

export default ArtistPage;
