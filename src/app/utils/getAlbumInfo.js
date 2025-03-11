
import data from "../bd.json";


export default async function getAlbumInfo(albumId) {
    const albumData = data.filter((album) => album.titulo.toLowerCase() === albumId)[0];
    return albumData;

}