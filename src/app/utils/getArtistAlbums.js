import data from "../bd.json";

export default function getArtistAlbums(artistId) {
    const artistAlbums = data.filter((album) => album.artista.toLowerCase() == artistId);
    return artistAlbums;
}