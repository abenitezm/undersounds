"use client";

import styled from "styled-components";
import Image from "next/image";
import colors from "../../app/colors";
import defaultAlbum from "../../assets/img/defaultAlbum.jpg";
import Link from "next/link";

const AlbumContainer = styled.div`
  display: flex;
  aspect-ratio: 1 / 1;
  position: relative;
  flex-direction: column;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.1s linear;
  background-color: ${colors.tertiary};
  border: 2px solid transparent;
  &:hover {
    border: 2px solid ${colors.primary};
  }
`;

const AlbumInfo = styled.div`
  position: relative;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: rgba(0, 0, 0, 0.65); /* Fondo translúcido */
  transition: opacity 0.2s ease-in-out;
  padding: 10px;
  opacity: 0;

  ${AlbumContainer}:hover & {
    opacity: 1;
  }
`;

const AlbumName = styled.span`
  font-size: 1rem;
  width: 90%;
  padding-top: 10px;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AlbumGenre = styled.div`
  font-size: 0.7rem;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${colors.primary};
  opacity: 0.8;
  margin-top: 5px;
  font-weight: bold;
`;

const AlbumYear = styled.div`
  font-size: 0.7rem;
  padding: 5px 10px;
  border-radius: 10px;
  margin-top: 5px;
  opacity: 0.7;
`;

const AlbumPrice = styled.div`
  position: absolute;
  font-size: 0.7rem;
  padding: 5px 10px;
  border-radius: 7px;
  right: 5px;
  top: 5px;
  background-color: ${colors.background};
`;

const Album = ({
  name,
  image,
  genre,
  price,
  year,
}: {
  name: string;
  image: string;
  genre: string;
  price: string;
  year: string;
}) => {
  return (
    <Link href={`/album/${name}`}>
      <AlbumContainer>
        <AlbumInfo>
          <AlbumName>{name}</AlbumName>
          <AlbumYear>{year}</AlbumYear>
          <AlbumGenre>{genre}</AlbumGenre>
          <AlbumPrice>{price}€</AlbumPrice>
        </AlbumInfo>
        <Image
          src={`/localDB${image}` || defaultAlbum}
          style={{
            objectFit: "contain",
            borderRadius: 10,
          }}
          layout="fill"
          alt="album"
        />
      </AlbumContainer>
    </Link>
  );
};

export default Album;