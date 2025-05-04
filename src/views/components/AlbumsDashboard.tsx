"use client";

import styled from "styled-components";
import Album from "./Album";
import { useEffect, useState } from "react";

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
      id: string;
      name: string;
      artist: string;
      canciones: {
        id: number;
        titulo: string;
        url: string;
        image: string;
        time: string;
      }[];
      image: string;
      genre: string;
      oyentes: string;
      description: string;
      price: string;
      year: string;
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
    async function fetchData() {
      const response = await fetch(
        `http://localhost:8000/getartistalbums/${id}`
      );
      const data = await response.json();
      if (data) {
        setAlbums(data);
      }
    }
    fetchData();
  }, []);

  return (
    <AlbumsSection>
      <h2 style={{ fontSize: 20 }}>Albums</h2>
      <ArtistAlbums>
        {albums.map((album) => (
          <Album
            key={album.id}
            id={album.id}
            description={album.description}
            name={album.name}
            image={album.image}
            artist={album.artist}
            genre={album?.genre || "Pop"}
            price={album.price}
            year={album.year}
          />
        ))}
      </ArtistAlbums>
    </AlbumsSection>
  );
};

export default AlbumDashboard;
