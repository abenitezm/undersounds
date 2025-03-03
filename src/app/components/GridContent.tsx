'use client';

import React from "react";
import styled from "styled-components";
import colors from "../colors";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    justify-content: center;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    padding: 20px;
`;

const GridItem = styled.div`
    background-color: ${colors.background};
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
`;

const Title = styled.h2`
    font-size: 16px;
    margin: 10px 0;
`;

const AlbumImg = styled.img`
    width: 187px;
    height: 187px;
    border-radius: 10px;
`;

type GridComponentProps = {
    data : any[]; 
    /* Sirve para almacenar la función que se pasa en el componente padre */
    onAlbumClick: (albumTitle : string) => void;
}

export default function GridContent( { data, onAlbumClick } : GridComponentProps) {

    { /* 
        Se llama cuando se hace click en un álbum. 
        Pasa el título del album a la funcion onAlbumClick que es manejada
        en el componente padre.
    */}
    const manejadorElementoMostrado = ( albumTitle : string ) => {
        onAlbumClick(albumTitle);
    };

    return (
        /* Cargamos el contenedor donde almacenaremos los productos */
        <GridContainer>
            {/* Recorremos los datos del JSON para mostrar su contenido de una manera bonita visualmente*/}
            {data.map(( elemento : any ) => (
                <GridItem key = { elemento.id } onClick = {() => manejadorElementoMostrado(elemento.titulo)}>
                    <AlbumImg src = { elemento.imagen } alt = { elemento.titulo } />
                    <Title>{ elemento.titulo }</Title>
                    <ArtistName>{ elemento.artista }</ArtistName> 
                </GridItem>
            ))}
        </GridContainer>
    );
}