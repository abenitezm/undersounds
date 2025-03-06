'use client';

import React, { useEffect } from "react";
import { useState } from "react";
import Multiselect from "../components/Multiselect";
import data from "../content.json";
import GridComponent from "../components/GridContent";
import AlbumReproducer, { Album } from "../components/AlbumReproducer";
import { styled } from "styled-components";
import colors from "../colors";

/* Definición de datos del album, TODO: cambiar por el compoente album */
const albumData : Album[] = [
    {   
        idAlbum: 0,
        title: "MOLTING AND DANCING",
        canciones : [
            {"id": 1, "titulo": "Nacht", "url": "/audio/Nacht.mp3", "image": "/audio/Lauren.jpg", "time": "3:05" },
            {"id": 2, "titulo": "Almond", "url": "/audio/Almond.mp3", "image": "/audio/Lauren.jpg",  "time": "3:31"},
            {"id": 3, "titulo": "BOYFRIEND", "url": "/audio/BOYFRIEND.mp3", "image": "/audio/Lauren.jpg", "time": "3:20"}
        ],
        artista: "indigo la End",
        oyentes: "1.058.763 oyentes mensuales",
        imagenGrupo: "/audio/indigo-la-end.webp",
        descripcion: "indigo la End es una banda de rock japonesa liderada por el vocalista y compositor Enon Kawatani. La banda lanzó su obra extendida debut en 2012 con el sello independiente Space Shower Records, y luego firmaron con el sub-sello Unborde de Warner."
    },
    {
        idAlbum: 1,
        title: "GIMME A HUG",
        canciones : [
            {"id": 1, "titulo": "GIMME A HUG", "url": "/audio/Hug.mp3", "image": "/audio/Hug.jpg", "time": "0:00"}
        ],
        artista: "Drake",
        oyentes: "81.491.933 oyentes mensuales",
        imagenGrupo: "/audio/Drake.webp",
        descripcion: "Aubrey Drake Graham conocido simplemente como Drake, es un rapero, cantante, compositor, productor discográfico y actor canadiense. Siendo una figura influyente en la música popular contemporánea, Drake ha sido acreditado por popularizar el canto y la sensibilidad del R&B en el hip hop."
    },
    {
        idAlbum: 2,
        title: "Cloud 9",
        canciones : [
            {"id": 2, "titulo": "Cloud 9", "url": "/audio/cloud-9-audio.mp3", "image": "/audio/cloud-9.webp", "time": "2:33"}
        ],
        artista: "Beack Bunny",
        oyentes: "6.805.115 oyentes mensuales",
        imagenGrupo: "/audio/beach-bunny-group.webp",
        descripcion: "Beach Bunny es una banda estadounidense de power pop originaria de Chicago, Illinois, y activa desde 2015. Alcanzó parte de su fama después de que sus canciones «Prom Queen» y «Cloud 9» se viralizaron en TikTok durante 2019 y 2020.",
    },
];

const GlobalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    margin: 10px 50px 20px 0;
    width: 90%;
`;


export default function NavigationPage() {
    /* Almacena el album seleccionado */
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    /* Manejador que me permite mostrar las canciones del album MOLTING AND DANCING TODO: hacerlo para cualquier album */
    const manejadorAlbum = ( albumId : number ) => {
        if ( albumId >= 0 && albumId < albumData.length ){
            setSelectedAlbum(albumData[albumId]);
        } else {
            console.error("Indice del album fuera de rango");
        }
       
    };

    return (

        <GlobalContainer>
            <Multiselect />
            <GridComponent data = {data} onAlbumClick = {manejadorAlbum}/>
            {selectedAlbum && <AlbumReproducer album={selectedAlbum} />}
        </GlobalContainer>

    );
};

