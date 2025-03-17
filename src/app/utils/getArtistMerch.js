import data from "../bd.json";

export default function getArtistAlbums(artistId) {
    const artist = data.filter((album) => album.artista.toLowerCase() == artistId)[0];
    return artist.merch;
}