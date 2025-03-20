'use client'
import React from "react";
import styled from "styled-components";
import colors from "../colors";

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 1224px;
  padding: 20px 20px 20px 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 200px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/graffiti3.svg") no-repeat center center;
    background-size: cover;
    opacity: 1;
    z-index: -1;
  }
`;

const Main = styled.div`
  grid-row: span 3 / auto;
  grid-column: span 2 / auto;
`;

const ItemContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 4px solid transparent;
  transition: border 0.3s ease-in-out;

  &:hover {
    border: 4px solid ${colors.primary};
  }

  &:hover .image {
    transform: scale(1.05);
  }

  &:hover .caption {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Item = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  transition: transform 0.3s ease-in-out;
`;

const Caption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(${parseInt(colors.tertiary.slice(1, 3), 16)}, 
                   ${parseInt(colors.tertiary.slice(3, 5), 16)}, 
                   ${parseInt(colors.tertiary.slice(5, 7), 16)}, 0.7); /* 70% de opacidad */
  color: ${colors.secondary};
  text-align: left;
  padding: 15px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  border-radius: 0 0 12px 12px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  font-weight: bold;
`;

const Description = styled.p`
  margin: 8px 0 0;
  font-size: 1.1rem;
`;

export default function CategoryButton() {
  return (
    <Grid>
      <Main>
        <ItemContainer>
          <Item className="image" src="https://f4.bcbits.com/img/0038984935_171.jpg" />
          <Caption className="caption">
            <Title>Riffs Brutalistas: Una guía sobre math rock</Title>
            <Description>Esto es lo que ocurrió cuando la energía del hardcore punk se encontró con la habilidad técnica del heavy metal</Description>
          </Caption>
        </ItemContainer>
      </Main>

      <ItemContainer>
        <Item className="image" src="https://f4.bcbits.com/img/0038974398_170.jpg" />
        <Caption className="caption">
          <Title>Explorando el genio de Ronald Shannon Jackson</Title>
          <Description>LISTA</Description>
        </Caption>
      </ItemContainer>

      <ItemContainer>
        <Item className="image" src="https://f4.bcbits.com/img/0038961073_170.jpg" />
        <Caption className="caption">
          <Title>Will Guthrie, en muchos disfraces</Title>
          <Description>LISTA</Description>
        </Caption>
      </ItemContainer>

      <ItemContainer>
        <Item className="image" src="https://f4.bcbits.com/img/0038924611_170.jpg" />
        <Caption className="caption">
          <Title>El show de hip hop</Title>
          <Description>Mereba se une al programa para hablar sobre su nuevo álbum, "The Breeze Grew A Fire"</Description>
        </Caption>
      </ItemContainer>
    </Grid>
  );
}
