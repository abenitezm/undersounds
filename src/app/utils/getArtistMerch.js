import data from "../bd.json";

export default function getArtistAlbums(artistId) {
    const artist = data.filter((album) => album.artista.toLowerCase() == artistId)[0];
    console.log(artist);
    return artist?.merch;
}