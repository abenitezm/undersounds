'use client';

import React from "react";
import styled from "styled-components";
import colors from "../../app/colors";
import Link from "next/link";



const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 100px;
    justify-content: center;
    justify-items: center;
    max-width: 70%;
    padding-top: 50px;
    margin: 50 ;
    height: auto;
    overflow-y: visible;
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

const Title = styled.h1`
    font-size: 18px;
    margin: 10px 0;
`;

const Oyentes = styled.h3`
    font-size: 12px;
    color: black;
`;

const ArtistImg = styled.img`
    width: 187px;
    height: 187px;
    border-radius: 10px;
`;

type GridComponentProps = {
    data: any[]; // Datos recibidos
//    onAlbumClick: (songId: number) => void; // Función para manejar el clic en la canción
}

const GridSiguiendo = ({ data } : GridComponentProps) => {

    // Función para manejar el clic en cada elemento y pasar el ID a la función en el componente padre
    const manejadorElementoMostrado = (albumId: number) => {
       // onAlbumClick(albumId);
    };

    return (
        /* Contenedor de la cuadrícula */
        <GridContainer>
            {/* Recorremos los datos del JSON para mostrar su contenido */}
            {data.map((elemento: any) => (
                <GridItem key={elemento.id} onClick={() => manejadorElementoMostrado(elemento.id)}>
                <Link href={`/artist/${elemento.artista}`}>
                <ArtistImg src={elemento.imagen} alt={elemento.artista} />
                <Title>{elemento.artista}</Title>
                <Oyentes>{elemento.oyentes} oyentes mensuales</Oyentes>
                </Link>
                </GridItem>
            ))}
        </GridContainer>
    );
}
export default GridSiguiendo;

