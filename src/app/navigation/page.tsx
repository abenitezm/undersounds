'use client';

import React from "react";
import { useState } from "react";
import { CSSProperties } from "react";
import Chips from "../components/chips";
import Multiselect from "../components/Multiselect";
import data from "../content.json";
import GridComponent from "../components/GridContent";
import AlbumReproducer, { Album } from "../components/AlbumReproducer";

/* Definición de datos del album, TODO: cambiar por el compoente album */
const albumData : Album = {
    title: "MOLTING AND DANCING",
    canciones : [
        {"id": 1, "titulo": "Nacht", "url": "/audio/Nacht.mp3", "image": "/audio/Lauren.jpg", "time": "3:05"},
        {"id": 2, "titulo": "Almond", "url": "/audio/Almond.mp3", "image": "/audio/Lauren.jpg",  "time": "3:31"},
        {"id": 3, "titulo": "BOYFRIEND", "url": "/audio/BOYFRIEND.mp3", "image": "/audio/Lauren.jpg", "time": "3:20"}
    ],
};


export default function NavigationPage() {
    { /* Almacena el album seleccionado */}
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    { /* Controla si puedo mostrar las canciones del album */}
    const [mostrarAlbum, setMostrarAlbum] = useState(false);
    { /* Manejador que me permite mostrar las canciones del album MOLTING AND DANCING TODO: hacerlo para cualquier album */}
    const manejadorAlbum = ( albumTitle : string ) => {
        if (albumTitle === "MOLTING AND DANCING"){
            setSelectedAlbum(albumData);
            setMostrarAlbum(true);
            console.log('Hola');
        }
    };

    return (

        <div id="chips-container" style={styles.container}>
            {/* Descomentar si queréis ver estéticamente el componente chip

            <Chips name = "Rock" onDelete = {() =>{}}/>
            <Chips name = "Cloud" onDelete = {() =>{}}/>
            <Chips name = "Funk" onDelete = {() =>{}}/>
            <Chips name = "Metal" onDelete = {() =>{}}/>

            */}
            
            
            <GridComponent data = {data} onAlbumClick = {manejadorAlbum}/>
            {mostrarAlbum && selectedAlbum && <AlbumReproducer album = {albumData} />}
                
            {/* Descomentar si queréis ver el funcionamiento de la multiselect 
            
            <Multiselect />
            
            */}
        </div>
    );
};

const styles: { container: CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px"
    },
}

