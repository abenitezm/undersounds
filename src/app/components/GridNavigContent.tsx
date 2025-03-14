'use client';

import React from "react";
import styled from "styled-components";
import colors from "../colors";
import Link from "next/link";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

const GridContainer = styled.div<{ $expandir : boolean}>`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    justify-content: start;
    justify-items: start;
    margin-left: 0;
    max-width: 100%;
    margin-right: auto;
    height: ${({ $expandir }) => ($expandir ? "350px" : "auto")};
    overflow-y: ${({ $expandir }) => ($expandir ? "auto" : "visible")};
    overflow-x: hidden;
`;

const GridItem = styled.div`
    background-color: ${colors.tertiary};
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 8px;

    &:hover {
        transform: scale(1.05);
        background-color: ${colors.primary};
    }
`;

const ArtistName = styled.p`
    font-size: 14px;
    color: ${colors.primary};

    ${GridItem}: hover & {
        color: ${colors.background};
    }

    &:hover {
        text-decoration-line: underline;
    }
`;

const Title = styled.h2`
    font-size: 14px;
    margin: 10px 0;

`;

const Genre = styled.h3`
    font-size: 14px;
    margin: 10px 0;
    color: ${colors.secondary};

`;

const AlbumImg = styled.img`
    width: 187px;
    height: 187px;
    border-radius: 10px;
`;

const BotonMasResultados = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #0070f3;
  justify-content: center;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

type GridComponentProps = {
    data : any[]; //Datos recibidos
    /* Sirve para almacenar la función que se pasa en el componente padre */
    onAlbumClick: (albumId : number) => void;
    /*filters: string[];  posible prop que se utilizará en el filtrado con la BD*/ 
}

export default function GridContent( { data, onAlbumClick } : GridComponentProps) {

    const [expandir, setExpandir] = useState(false);
    { /* 
        Se llama cuando se hace click en un álbum. 
        Pasa el título del album a la funcion onAlbumClick que es manejada
        en el componente padre.
    */}
    const manejadorElementoMostrado = ( albumId : number ) => {
        onAlbumClick(albumId);
    };

    /* Posible método que se usará en el filtrado con la BD

    const filtradoInfo =  data.filter((elemento : any) => {
        filters.includes(elemento.genre);
    })

    */

    const enseñarMasContenido = expandir ? data : data.slice(0, 8); 

    return (
        /* Cargamos el contenedor donde almacenaremos los productos */
        <GridContainer $expandir={expandir}>
            {/* Recorremos los datos del JSON para mostrar su contenido de una manera bonita visualmente*/}
            {enseñarMasContenido.map(( elemento : any ) => (
                <GridItem key = { elemento.id } onClick = {() => manejadorElementoMostrado(elemento.id)}>
                    <AlbumImg src = { elemento.imagen } alt = { elemento.titulo } />
                    <Title>{ elemento.titulo }</Title>
                    <Genre>{ elemento.genre }</Genre>
                    <ArtistName><Link href={`/artist/${elemento.artista}`}>{ elemento.artista }</Link></ArtistName> 
                </GridItem>
            ))}
            <PrimaryButton onClick = {() => setExpandir(!expandir)}
                text = { expandir ? "Ver menos resultados" : "Ver más resultados" }>
            </PrimaryButton>
        </GridContainer>
    );
}