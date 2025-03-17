"use client";

import { useState, useEffect } from "react";
import getAlbumInfo from "../utils/getAlbumInfo";
import styled from "styled-components";
import colors from "../colors";
import Image from "next/image";
import defaultAlbum from "../../assets/img/defaultAlbum.jpg";
import defaultAvatar from "../../assets/img/defaultAvatar.jpg";
import AlbumSongs from "./AlbumSongs";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

type Album = {
  id: number;
  titulo: string; //
  artista: string; //
  canciones: {
    id: number;
    titulo: string;
    url: string;
    image: string;
    time: string;
  }[];
  imagen: string; //
  genre: string;
  imagenGrupo?: string;
  year?: number;
  precio?: string;
};

const getAlbumFullDuration = (
  canciones: {
    id: number;
    titulo: string;
    url: string;
    image: string;
    time: string;
  }[]
) => {
  const totalSegundos = canciones.reduce((total, cancion) => {
    const [min, seg] = cancion.time.split(":").map(Number);
    return total + min * 60 + seg;
  }, 0);

  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;

  return `${minutos}:${segundos.toString().padStart(2, "0")}`;
};

const AlbumInfo = ({ id }: { id: string }) => {
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getAlbumInfo(id);
      if (data) {
        setAlbum(data);
      }
    }
    fetchData();
  }, []);

  const songs = album?.canciones.length || 0;
  const duration = getAlbumFullDuration(album?.canciones || []);

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <AlbumContainer>
        <AlbumImage>
          <Image
            src={album?.imagen || defaultAlbum}
            alt={album?.titulo || "album cover"}
            width={230}
            height={230}
          />
        </AlbumImage>
        <AlbumTitle>{album?.titulo}</AlbumTitle>
        <Link href={`/artist/${album?.artista}`}>
          <AlbumArtist>
            <AlbumArtistImg>
              <Image
                src={album?.imagenGrupo || defaultAvatar}
                alt={album?.titulo || "artist img"}
                width={30}
                height={30}
              />
            </AlbumArtistImg>
            {album?.artista}
          </AlbumArtist>
        </Link>
        <BuyButton>
          <ShoppingCartIcon />
          Comprar
        </BuyButton>
      </AlbumContainer>
      <div style={{ width: "70%" }}>
        <AlbumOtherInfo>
          <AlbumInfoRow>
            {album?.year || "2020"} · {album?.genre} · {album?.precio || "0.00"}{" "}
            €
          </AlbumInfoRow>
          <AlbumInfoSeparator />
          <AlbumInfoRow>
            {songs + " canciones"} · {duration + " minutos"}
          </AlbumInfoRow>
          <SongsContainer>
            <AlbumSongs canciones={album?.canciones || []} />
          </SongsContainer>
        </AlbumOtherInfo>
      </div>
    </div>
  );
};

const AlbumContainer = styled.div`
  padding: 20px;
  width: 30%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.tertiary};
  gap: 15px;
  margin-right: 20px;
  border-radius: 10px;
  align-items: center;
`;

const AlbumImage = styled.div`
  border-radius: 10px;
  overflow: hidden;
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  border: 2px solid ${colors.primary};
  align-items: center;
  background-color: gray;
  margin: 0 auto;
`;

const AlbumTitle = styled.h1`
  width: 80%;
  margin: 0 auto;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: capitalize;
  text-align: center;
`;

const AlbumArtist = styled.span`
  font-size: 1rem;
  font-weight: normal;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 2px solid ${colors.primary};
  border-radius: 10px;
  padding: 8px 15px;
`;

const AlbumArtistImg = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  margin: 0 auto;
`;

const AlbumOtherInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  border-radius: 10px;
`;

const AlbumInfoRow = styled.div`
  display: flex;
  font-size: 1rem;
`;

const AlbumInfoSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.tertiary};
`;

const SongsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  border: 1px solid ${colors.tertiary};
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
`;

const BuyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${colors.tertiary};
  color: ${colors.secondary};
  border: none;
  padding: 8px 15px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
`;

export default AlbumInfo;
