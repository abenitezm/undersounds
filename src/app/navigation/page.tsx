'use client';

import React, { useEffect } from "react";
import { useState } from "react";
import Multiselect from "../components/Multiselect";
import data from "../content.json";
import canciones from "../canciones.json";
import GridComponent from "../components/GridContent";
import AlbumReproducer, { Album } from "../components/AlbumReproducer";
import { styled } from "styled-components";
import colors from "../colors";


const GlobalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    margin: 10px 50px 20px 0;
    width: 90%;
`;

const albumData : Album[] = canciones.map((cancion) => {
    return {
        idAlbum: cancion.idAlbum,
        title: cancion.title,
        canciones: cancion.canciones,
        artista: cancion.artista,
        oyentes: cancion.oyentes,
        imagenGrupo: cancion.imagenGrupo,
        descripcion: cancion.descripcion
    } as Album;
});


export default function NavigationPage() {
    /* Almacena el album seleccionado */
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    
    /* Manejador que me permite mostrar las canciones del album MOLTING AND DANCING TODO: hacerlo para cualquier album */
    const manejadorAlbum = ( albumId : number ) => {
        if ( albumId >= 0 && albumId < albumData.length ){
            setSelectedAlbum(albumData[albumId]);
        } else {
            console.log(albumId);
            console.log(albumData.length);
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

