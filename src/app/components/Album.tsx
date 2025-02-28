"use client";

import styled from "styled-components";
import Image from "next/image";
import colors from "../colors";
import defaultAlbum from "../../assets/img/defaultAlbum.jpg";

const AlbumContainer = styled.div`
  display: flex;
  width: 150px;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  background-color: ${colors.primary};

  &:hover {
    background-color: ${colors.secondary};
  }
`;

const AlbumName = styled.span`
  font-size: 16px;
  margin-top: 5px;
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
