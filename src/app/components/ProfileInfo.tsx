"use client";

import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";
import Image, { StaticImageData } from "next/image";
import colors from "../colors";

type ProfileInfoProps = {
  id: string;
  avatar: StaticImageData;
  generos: string[];
};

const ProfileInfo = ({ id, avatar, generos }: ProfileInfoProps) => {
  return (
    <ArtistContainer>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <ArtistImage>
          <Image src={avatar} alt="artist" width={230} height={230} />
        </ArtistImage>

        <ArtistName>{id}</ArtistName>
        <ArtistCity>Madrid, Spain</ArtistCity>

        <ArtistGenres>
          {generos.map((genero: string, index: number) => (
            <GenreChip key={index}>{genero}</GenreChip>
          ))}
        </ArtistGenres>

        <ArtistDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cum
          consectetur officiis veniam! Maiores repellat enim ipsum rerum. Aut
          suscipit eius ea alias. Eum, nesciunt vel consequatur dolores
          doloremque iure? Accusantium saepe cumque quisquam explicabo odio
          expedita. Commodi ullam minima hic architecto?
        </ArtistDescription>
      </div>
      <ArtistButtons>
        <PrimaryButton text="Seguir" onClick={() => console.log("Seguir")} />
        <PrimaryButton
          text="Compartir"
          onClick={() => console.log("Compartir")}
        />
      </ArtistButtons>
    </ArtistContainer>
  );
};

const ArtistContainer = styled.div`
  padding: 10px;
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
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
  background-color: ${colors.tertiary};
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
  font-size: 0.9rem;
  color: gray;
  margin: 10px 0;
`;

export default ProfileInfo;
