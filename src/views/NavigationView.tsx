"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Multiselect from "../views/components/Multiselect";
//import data from "../assets/bd.json";
import GridComponent from "../views/components/GridNavigContent";
import AlbumReproducer, { CancionesConAlbumFirebase } from "../views/components/AlbumReproducer";
import { styled } from "styled-components";
import { ReadonlyURLSearchParams } from "next/navigation";
import { collection, doc, setDoc } from "firebase/firestore";
import { parse } from "path";

const GlobalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  margin: 10px 50px 20px 0;
  width: clamp(300px, 90%, 1400px);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/graffiti2.svg") no-repeat center center;
    background-size: cover;
    opacity: 1;
    z-index: -1;
  }
`;

/*const albumData: Album[] = data.map((cancion) => {
  return {
    idAlbum: cancion.id,
    title: cancion.titulo,
    canciones: cancion.canciones,
    artista: cancion.artista,
    oyentes: cancion.oyentes,
    imagenGrupo: cancion.imagenGrupo,
    descripcion: cancion.descripcion,
    comentarios: cancion.comentarios,
    comentador: cancion.comentador,
  } as Album;
});*/



const NavigationView = ({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) => {
  const [filteredData, setFilteredData] = useState<CancionesConAlbumFirebase[]>([]); // Frontend estaba usestate(data);
  /* Almacena el album seleccionado */
  const [selectedAlbum, setSelectedAlbum] = useState<CancionesConAlbumFirebase | null>(null);
  /* Almacena los filtros seleccionados */
  const [filters, setFilters] = React.useState<string[]>([]);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const [cancionFirebase, setCancionFirebase] = useState<CancionesConAlbumFirebase[]>([]); // Bakcend


  // Backend
  useEffect(() => {
    const fetchData = async () => {
      try {

        // Apartado de CACHE 
        // 1. Verificamos que exiten datos en cache
        const cacheData = localStorage.getItem('cancionesCompletas');
        const cacheTimestamp = localStorage.getItem('cancionesTimestamp');

        // 2. Si hay datos en cache y son recientes ( < 1 hora)
        if ( cacheData && cacheTimestamp && Date.now() - Number(cacheTimestamp) < 36000000){
          const parsedData = JSON.parse(cacheData);
          setCancionFirebase(parsedData);
          setFilteredData(parsedData);
          return;
        }

        // 1. Obtener todos los datos en paralelo
        const [songsResponse, albumsResponse, genresResponse, artistsResponse] = await Promise.all([
          fetch("http://localhost:8000/getsongs"),
          fetch("http://localhost:8000/getalbums"),
          fetch("http://localhost:8000/getgenres"),
          fetch("http://localhost:8000/getartists"),
        ]);
        
        // 2. Las parseamos a un formato que se puedan leer los objetos de la respuesta
        const [songs, albums, genres, artists] = await Promise.all([
          JSON.parse(await songsResponse.json()),
          JSON.parse(await albumsResponse.json()),
          await genresResponse.json(),
          JSON.parse(await artistsResponse.json()),
        ]);
  
        // 3. Verificar que son arrays
        if (!Array.isArray(songs) || !Array.isArray(albums) || !Array.isArray(genres) || !Array.isArray(artists)) {
          throw new Error("Los datos recibidos no son arrays válidos");
        }
  
        // 4. Crear mapas para búsqueda rápida
        const albumMap = new Map(albums.map(album => [album.id, album]));
        const genreMap = new Map(genres.map(genre => [genre.id, genre]));
        const artistMap = new Map(artists.map(artist => [artist.id, artist]));
  
        // 5. Combinar los datos
        const cancionesCompletas = songs.map(cancion => {
          const album = albumMap.get(cancion.album);
          const genre = genreMap.get(cancion.genre.split('/').pop()); // Extrae el ID de la referencia
          const artistId = album?.artist;
          const artist = artistMap.get(artistId);
          console.log(cancion);
  
          return {
           ...cancion,
           tipo: genre?.type || "unknown",
           url: cancion.url || "unknown",
           albumName: album?.name || "unknown",
           albumDescription: album.description || "",
           albumImage: album.image || "/default-album.png",
           albumMedia: album.media ? (Array.isArray(album.media) ? album.media : [album.media]) : [],
           artistName: artist?.name || "unknown",
           artistImage: artist?.image || "/default-artist.png",
           artistInfo: artist?.info || "unknown"
          };          
        });
        
        // Apartado de caché
        // 6. Guardar en caché los datos obtenido
        localStorage.setItem('cancionesCompletas', JSON.stringify(cancionesCompletas));
        localStorage.setItem('cancionesTimestamp', Date.now().toString());
        
        // 7. Actualizar estados
        setCancionFirebase(cancionesCompletas);
        console.log("Canciones", cancionFirebase);
        setFilteredData(cancionesCompletas);
        
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
  
    fetchData();
  }, []);
  
  
  // Efecto de depuración
  useEffect(() => {
    console.log("Estado actual de canciones:", cancionFirebase);
  }, [cancionFirebase]);


  useEffect(() => {
    if (!cancionFirebase || cancionFirebase.length === 0) return; // Backend
    
    let filteredData = cancionFirebase;
    
    // 1. Filtrado pro búsqueda
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    if (search) {
      filteredData = filteredData.filter(
        (album) =>
          album.name.toLowerCase().includes(search.toLowerCase()) ||
          album.artistName.toLowerCase() == search.toLowerCase()
      );
    }

    // 2. Filtrado por categoría
    if (category) {
      filteredData = filteredData.filter((album) =>
        album.albumMedia.includes(category)
      );
    }

    // 3. Filtrado por genero seleccionado
    if ( selectedGenres.length > 0 ) {
      filteredData = filteredData.filter((album) => selectedGenres.includes(album.tipo) )
    }

    setFilteredData(filteredData);
  }, [searchParams, cancionFirebase, selectedGenres]);

  /* Manejador que me permite mostrar las canciones del album MOLTING AND DANCING TODO: hacerlo para cualquier album */
  //Frontend
  /*const manejadorAlbum = (albumId: number) => {
    if (albumId >= 0 && albumId < albumData.length) {
      setSelectedAlbum(albumData[albumId]);
      console.log(albumData[albumId].comentarios);
    } else {
      console.error("Indice del album fuera de rango");
    }
  };*/

  const manejadorAlbum = (albumId: string) => {
    const album = cancionFirebase.find(c => c.id=== albumId);
    console.log(album);
    console.log(album?.url);
    if (album) {
      setSelectedAlbum(album);
    } else {
      console.error("Álbum no encontrado");
    }
  };

  /* Posible método que se usará en el filtrado con la BD
    
    const actualizarFiltros = (filters : string[]) => {
        setFilters(filters);
    }

    */

  return (
    <GlobalContainer>
      <Multiselect tipo="" selectedGenre={selectedGenres} onGenreChange={setSelectedGenres} />
      <GridComponent data={filteredData} onAlbumClick={manejadorAlbum} />
      {selectedAlbum && <AlbumReproducer album={selectedAlbum} />}
    </GlobalContainer>
  );
};

export default NavigationView;

