import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../../app/colors';
import Album from './Album';
import { CancionesConAlbumFirebase } from "../../views/components/AlbumReproducer";

interface CancionConUploadDate extends CancionesConAlbumFirebase {
  uploadDate: string | number | Date;
}

const Novedades = () => {
  const [albums, setAlbums] = useState<CancionConUploadDate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verificamos que existen datos en caché
        const cacheData = localStorage.getItem('cancionesCompletas');
        const cacheTimestamp = localStorage.getItem('cancionesTimestamp');

        // Si hay datos en caché y son recientes (<1h)
        if (cacheData && cacheTimestamp && Date.now() - Number(cacheTimestamp) < 3600000) {
          const parsedData = JSON.parse(cacheData);
          setAlbums(parsedData);
          return;
        }

        // Obtención de datos de la API en paralelo 
        const [songsResponse, albumsResponse, genresResponse, artistsResponse] = await Promise.all([
          fetch("http://undersoundsl3g2.cmf3dnbug5dmczhd.spaincentral.azurecontainer.io:8000/getsongs"),
          fetch("http://undersoundsl3g2.cmf3dnbug5dmczhd.spaincentral.azurecontainer.io:8000/getalbums"),
          fetch("http://undersoundsl3g2.cmf3dnbug5dmczhd.spaincentral.azurecontainer.io:8000/getgenres"),
          fetch("http://undersoundsl3g2.cmf3dnbug5dmczhd.spaincentral.azurecontainer.io:8000/getartists"),
        ]);
        
        // Pareseo a un formato que se pueda leer
        const [songs, albums, genres, artists] = await Promise.all([
          JSON.parse(await songsResponse.json()),
          JSON.parse(await albumsResponse.json()),
          await genresResponse.json(),
          JSON.parse(await artistsResponse.json()),
        ]);

        // Verificar que son arrays
        if (!Array.isArray(songs) || !Array.isArray(albums) || !Array.isArray(genres) || !Array.isArray(artists)) {
          throw new Error("Los datos recibidos no son arrays válidos");
        }

        // Crear mapas para búsqueda rápida
        const albumMap = new Map(albums.map(album => [album.id, album]));
        const genreMap = new Map(genres.map(genre => [genre.id, genre]));
        const artistMap = new Map(artists.map(artist => [artist.id, artist]));

        // Combinar los datos
        const cancionesCompletas = songs.map(cancion => {
          const album = albumMap.get(cancion.album);
          const genre = genreMap.get(cancion.genre.split('/').pop());
          const artistId = album?.artist;
          const artist = artistMap.get(artistId);

          return {
            ...cancion,
            tipo: genre?.type || "unknown",
            url: cancion?.url || "unknown",
            albumName: album?.name || "unknown",
            albumDescription: album?.description || "",
            albumImage: album?.image || "/default-album.png",
            albumMedia: album?.media ? (Array.isArray(album.media) ? album.media : [album.media]) : [],
            artistName: artist?.name || "unknown",
            artistImage: artist?.image || "/default-artist.png",
            artistInfo: artist?.info || "unknown"
          };
        });

        // Ordenar por fecha (asumiendo que hay un campo 'releaseDate')
        const sortedAlbums = [...cancionesCompletas].sort((a, b) => {
          return new Date(b.uploadDate || 0).getTime() - new Date(a.uploadDate || 0).getTime();
        });

        // Guardar en caché
        localStorage.setItem('cancionesCache', JSON.stringify(sortedAlbums));
        localStorage.setItem('cancionesTimestamp', Date.now().toString());

        setAlbums(sortedAlbums);
      } catch (error) {
        console.error("Error al cargar datos de novedades:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <TextContainer>
        <h2>Novedades</h2>
        <p>Descubre los álbumes más recientes de tus artistas favoritos. ¡No te pierdas lo último!</p>
      </TextContainer>
      <Grid>
        {albums && albums.slice(0, 6).map(album => (
          <AlbumCardWrapper key={album.id}>
            <Album
              key={album.id}
              name={album.albumName}
              image={album.albumImage}
              genre={album.tipo}
              price="0.00"
              year={album.uploadDate ? new Date(album.uploadDate).getFullYear().toString() : "2025"}
            />
          </AlbumCardWrapper>
        ))}
      </Grid>
    </Container>
  );
};

export default Novedades;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;
  max-width: 1224px;
`;

const TextContainer = styled.div`
  width: 50%;
  text-align: left;
  padding-right: 60px;
  h2 {
    color: ${colors.primary};
    font-size: 3rem;
    margin-bottom: 30px;
  }
  p {
    font-size: 2rem;
    color: ${colors.secondary};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-self: flex-end;
  gap: 15px;
  width: 50%;
`;

const AlbumCardWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;