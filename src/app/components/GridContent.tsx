'use client';

import React from "react";
import styled from "styled-components";
import colors from "../colors";
import Link from "next/link";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    justify-content: start;
    justify-items: start;
    margin-left: 0;
    max-width: 70%;
    margin-right: auto;
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
    onAlbumClick: (albumId : number) => void;
}

export default function GridContent( { data, onAlbumClick } : GridComponentProps) {

    { /* 
        Se llama cuando se hace click en un álbum. 
        Pasa el título del album a la funcion onAlbumClick que es manejada
        en el componente padre.
    */}
    const manejadorElementoMostrado = ( albumId : number ) => {
        onAlbumClick(albumId);
    };

    return (
        /* Cargamos el contenedor donde almacenaremos los productos */
        <GridContainer>
            {/* Recorremos los datos del JSON para mostrar su contenido de una manera bonita visualmente*/}
            {data.map(( elemento : any ) => (
                <GridItem key = { elemento.id } onClick = {() => manejadorElementoMostrado(elemento.id)}>
                    <AlbumImg src = { elemento.imagen } alt = { elemento.titulo } />
                    <Title>{ elemento.titulo }</Title>
                    <ArtistName><Link href={`/artist/${elemento.id}`}>{ elemento.artista }</Link></ArtistName> 
                </GridItem>
            ))}
        </GridContainer>
    );
}