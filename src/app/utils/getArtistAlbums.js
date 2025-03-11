import data from "../bd.json";

export default function getArtistAlbums(artistId) {
    const artistAlbums = data.filter((album) => album.artista.toLowerCase() == artistId);
    console.log('albums');
    return artistAlbums;
}