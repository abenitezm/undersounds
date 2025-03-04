'use client';

import React, { useEffect } from "react";
import { useState } from "react";
import Chips from "../components/chips";
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
            {"id": 1, "titulo": "Nacht", "url": "/audio/Nacht.mp3", "image": "/audio/Lauren.jpg", "time": "3:05"},
            {"id": 2, "titulo": "Almond", "url": "/audio/Almond.mp3", "image": "/audio/Lauren.jpg",  "time": "3:31"},
            {"id": 3, "titulo": "BOYFRIEND", "url": "/audio/BOYFRIEND.mp3", "image": "/audio/Lauren.jpg", "time": "3:20"}
        ],
    },
    {
        idAlbum: 1,
        title: "GIMME A HUG",
        canciones : [
            {"id": 1, "titulo": "GIMME A HUG", "url": "/audio/Hug.mp3", "image": "/audio/Hug.jpg", "time": "0:00"}
        ],
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
    /* Controla si puedo mostrar las canciones del album */
    const [mostrarAlbum, setMostrarAlbum] = useState(false);
    /* Manejador que me permite mostrar las canciones del album MOLTING AND DANCING TODO: hacerlo para cualquier album */
    const manejadorAlbum = ( albumId : number ) => {
        if ( albumId >= 0 && albumId < albumData.length ){
            setSelectedAlbum(albumData[albumId]);
            setMostrarAlbum(true);
        } else {
            console.error("Indice del album fuera de rango");
        }
       
    };

    return (

        <GlobalContainer>
            <Multiselect />
            <GridComponent data = {data} onAlbumClick = {manejadorAlbum}/>
            {mostrarAlbum && selectedAlbum && <AlbumReproducer album={selectedAlbum} controlAudio={true} />}
        </GlobalContainer>

    );
};

