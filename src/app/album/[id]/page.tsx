import formatID from "@/utils/formatID";
import AlbumView from "@/views/AlbumView";

const AlbumPage = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  const id = param.id;
  const formattedId = formatID(id);

  return <AlbumView id={formattedId} />;
};

export default AlbumPage;
