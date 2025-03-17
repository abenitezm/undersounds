"use client";

import styled from "styled-components";
import { Album } from "./Album";
import { useEffect, useState } from "react";

import getArtistAlbums from "../utils/getArtistAlbums";

const ArtistAlbums = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const AlbumsSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

const AlbumDashboard = ({ id }: { id: string }) => {
  const [albums, setAlbums] = useState<
    Array<{
      id: number;
      titulo: string;
      artista: string;
      canciones: {
        id: number;
        titulo: string;
        url: string;
        image: string;
        time: string;
      }[];
      imagen: string;
      genre: string;
      oyentes: string;
      imagenGrupo: string;
      descripcion: string;
      precio?: string;
      year?: string;
      merch?:
        | string
        | {
            id: string;
            titulo: string;
            tipo: string;
            precio: string;
            imagen: string;
            artista: string;
          }[];
    }>
  >([]);

  useEffect(() => {
    const data = getArtistAlbums(id);
    setAlbums(data);
  }, []);

  return (
    <AlbumsSection>
      <h2 style={{ fontSize: 20 }}>Albums</h2>
      <ArtistAlbums>
        {albums.map((album) => (
          <Album
            key={album.id}
            name={album.titulo}
            image={album.imagen}
            genre={album.genre}
            price={album?.precio || "0.00"}
            year={album?.year || "2021"}
          />
        ))}
      </ArtistAlbums>
    </AlbumsSection>
  );
};

export default AlbumDashboard;
