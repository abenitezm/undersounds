"use client";

import defaultAvatar from "../../assets/img/defaultAvatar.jpg";
import styled from "styled-components";
import Image from "next/image";
import colors from "../colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import getArtistInfo from "../utils/getArtistInfo";
import { useEffect, useState } from "react";
import getArtistAlbums from "../utils/getArtistAlbums";

type ProfileInfoProps = {
  id: string;
};

type Artista = {
  artista: string;
  imagenGrupo?: string;
  descripcion?: string;
};

const ProfileInfo = ({ id }: ProfileInfoProps) => {
  const [artist, setArtist] = useState<Artista | null>(null);
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getArtistInfo(id);
      console.log("data del artista", data);
      setArtist(data);

      const albums = await getArtistAlbums(id);
      const generos = [...new Set(albums.map((album) => album.genre))];
      setGenres(generos);
    }
    fetchData();
  }, []);

  return (
    <ArtistContainer>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <ArtistImage>
          <Image
            src={artist?.imagenGrupo || defaultAvatar}
            alt="artist"
            width={230}
            height={230}
          />
        </ArtistImage>

        <ArtistName>{artist?.artista || 'undefined'}</ArtistName>
        <ArtistCity>Madrid, Spain</ArtistCity>

        <ArtistGenres>
          {genres.map((genero: string, index: number) => (
            <GenreChip key={index}>{genero}</GenreChip>
          ))}
        </ArtistGenres>

        <ArtistDescription>
          {artist?.descripcion || "No description available"}
        </ArtistDescription>
      </div>
      <ArtistButtons>
        <Button onClick={() => console.log("Seguir")}>
          <FavoriteIcon />
          {"Seguir"}
        </Button>
        <Button onClick={() => console.log("Compartir")}>
          <ShareIcon />
          {"Compartir"}
        </Button>
      </ArtistButtons>
    </ArtistContainer>
  );
};

const ArtistContainer = styled.div`
  padding: 20px;
  width: 30%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.tertiary};
  gap: 10px;
  margin-top: 20px;
  margin-right: 20px;
  border-radius: 10px;
  align-items: center;
`;

const ArtistImage = styled.div`
  border-radius: 10px;
  overflow: hidden;
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  margin: 0 auto;
`;

const ArtistButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
`;

const Button = styled.button`
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

const ArtistName = styled.span`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 10px;

  margin-left: 10px;
  text-transform: capitalize;
`;

const ArtistGenres = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 1rem;
  gap: 10px;
`;

const GenreChip = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: ${colors.primary};
  opacity: 0.9;
  gap: 5px;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 10px;
`;

const ArtistCity = styled.span`
  font-size: 1rem;
  margin-top: -5px;
  margin-left: 20px;
  margin-bottom: 10px;
  color: gray;
`;

const ArtistDescription = styled.p`
  text-align: left;
  font-size: 0.8rem;
  color: gray;
  margin: 10px 0;
`;

export default ProfileInfo;
