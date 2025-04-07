
import ArtistView from "@/views/ArtistView";

const ArtistPage = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  const id = param.id;

  return <ArtistView id={id} />;
};

export default ArtistPage;
