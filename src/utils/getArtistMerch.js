import data from "../assets/bd.json";

export default function getArtistAlbums(artistId) {
    const artist = data.filter((album) => album.artista.toLowerCase() == artistId)[0];
    console.log(artist);
    return artist?.merch;
}