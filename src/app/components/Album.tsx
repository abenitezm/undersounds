"use client";

import styled from "styled-components";
import Image from "next/image";
import colors from "../colors";
import defaultAlbum from "../../assets/img/defaultAlbum.jpg";

const AlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
  transition: all 0.1s linear;
  background-color: ${colors.primary};

  &:hover {
    background-color: ${colors.secondary};
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    transform: translate(-2px, -2px);

    &:hover > span {
      color: ${colors.background};
    }
  }
`;

const AlbumName = styled.span`
  font-size: 16px;
  margin-top: 10px;
  width: 80%;
  text-align: center;
`;

export const Album = ({ name }: { name: string }) => {
  return (
    <AlbumContainer>
      <Image
        src={defaultAlbum}
        style={{ borderRadius: 10, padding: 0 }}
        width={120}
        height={120}
        alt="album"
      />
      <AlbumName>{name}</AlbumName>
    </AlbumContainer>
  );
};
