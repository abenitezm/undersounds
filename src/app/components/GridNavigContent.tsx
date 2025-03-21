'use client';

import React from "react";
import { styled, keyframes } from "styled-components";
import colors from "../colors";
import Link from "next/link";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { tr } from "framer-motion/client";


const GridContainer = styled.div<{ $expandir : boolean}>`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    justify-content: start;
    justify-items: start;
    max-width: 70%;
    margin-right: auto;
    height: ${({ $expandir }) => ($expandir ? "100%" : "auto")};
    overflow-y: ${({ $expandir }) => ($expandir ? "auto" : "visible")};
    overflow-x: hidden;
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const GridItem = styled.div<{ $expandir : boolean}>`
    background-color: ${colors.tertiary};
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: all 0.3s ease;
    animation: ${fadeIn} 0.5s ease;


    &:hover {
        background-color: ${colors.primary};
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
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
    const mostrarMasResultados = data.length > 8;
    const permitirVolver = data.length % 4 === 0;

    return (
        /* Cargamos el contenedor donde almacenaremos los productos */
        <GridContainer $expandir={expandir}>
            {/* Recorremos los datos del JSON para mostrar su contenido de una manera bonita visualmente*/}
            {enseñarMasContenido.map(( elemento : any) => (
                <GridItem key = { elemento.id } $expandir = {expandir} onClick = {() => manejadorElementoMostrado(elemento.id)}>
                    <AlbumImg src = { elemento.imagen } alt = { elemento.titulo } />
                    <Title>{ elemento.titulo }</Title>
                    <Genre>{ elemento.genre }</Genre>
                    <ArtistName><Link href={`/artist/${elemento.artista}`}>{ elemento.artista }</Link></ArtistName> 
                </GridItem>
            ))}
            {mostrarMasResultados && (!expandir || permitirVolver) && (<PrimaryButton onClick = {() => setExpandir(!expandir)} type="button" 
                text={expandir ? "Volver a la vista previa" : "Ver más resultados"} style={{marginBottom: "60px", transform: "none"}}>
            </PrimaryButton>)}
        </GridContainer>
    );
}