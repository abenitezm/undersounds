"use client";
import React from "react";
import styled from "styled-components";
import colors from "../../app/colors";
import Link from "next/link";

interface ElegirUsuProps {
  title: string;
  imageSrc: string;
  bgColor: string;
  onClick: () => void; // Add the onClick property
}

const Button = styled.button`
  background-color: ${(props) => props.color || colors.secondary};
  width: 215px;
  height: 240px;
  border-radius: 15px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 15px;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${colors.secondary};
  }

  &:hover .image {
    transform: scale(1.1);
  }
`;

const Title = styled.span`
  position: absolute;
  top: 10px;
  left: 15px;
  font-size: 22px;
  font-weight: bold;
  color: ${colors.tertiary};
  z-index: 2;
`;

const Image = styled.img`
  width: 200px;
  height: auto;
  object-fit: cover;
  position: absolute;
  bottom: -20px;
  right: -30px;
  mix-blend-mode: multiply;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
`;

const ElegirUsu: React.FC<ElegirUsuProps> = ({
    title,
    imageSrc,
    bgColor,
    onClick, // Recibe la función onClick
  }) => {
    return (
      <Button color={bgColor} onClick={onClick}> {/* Implementa el evento onClick */}
        <Title>{title}</Title>
        <Image className="image" src={imageSrc} alt={title} />
      </Button>
    );
  };

export default ElegirUsu;