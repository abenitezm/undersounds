import data from "../assets/bd.json";

export default function getArtistAlbums(artistId) {
    const artistAlbums = data.filter((album) => album.artista.toLowerCase() == artistId);
    return artistAlbums;
}