import data from "../assets/artists.json";

export default async function getArtistInfo(artistId) {
  const artistData = data.find((artist) => artist.artista.toLowerCase() === artistId);
  return artistData;
}
