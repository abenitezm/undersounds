import AlbumView from "@/views/AlbumView";

const AlbumPage = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  const id = param.id;

  return <AlbumView id={id} />;
};

export default AlbumPage;
