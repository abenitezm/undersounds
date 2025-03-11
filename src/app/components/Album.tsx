"use client";

import styled from "styled-components";
import Image from "next/image";
import colors from "../colors";
import defaultAlbum from "../../assets/img/defaultAlbum.jpg";

const AlbumContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 12px;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: all 0.1s linear;
  background-color: ${colors.tertiary};
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${colors.primary};
  }
`;

const AlbumName = styled.span`
  font-size: 0.9rem;
  padding-top: 10px;
  margin: auto;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
`;

const AlbumGenre = styled.div`
  font-size: 0.7rem;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${colors.primary};
  opacity: 0.8;
  margin-top: 5px;
`;

const AlbumYear = styled.div`
  font-size: 0.7rem;
  padding: 5px 10px;
  border-radius: 10px;
  margin-top: 5px;
  opacity: 0.7;
`;

const AlbumPrice = styled.div`
  font-size: 0.7rem;
  padding: 5px 10px;
  border-radius: 7px;
  position: absolute;
  right: 5px;
  top: 5px;
  background-color: ${colors.background};
  z-index: 1;
`;

const AlbumRow = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0;
`;

export const Album = ({
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
    <AlbumContainer>
      <Image
        src={image || defaultAlbum}
        style={{
          objectFit: "cover",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        width={160}
        height={160}
        alt="album"
      />
      <AlbumName>{name}</AlbumName>
      <AlbumRow>
        <AlbumYear>{year}</AlbumYear>
        <AlbumGenre>{genre}</AlbumGenre>
      </AlbumRow>
      <AlbumPrice>{price}€</AlbumPrice>
    </AlbumContainer>
  );
};
