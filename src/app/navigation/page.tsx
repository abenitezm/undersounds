'use client';

import React, { useEffect } from "react";
import { useState } from "react";
import Multiselect from "../components/Multiselect";
import data from "../bd.json";
import GridComponent from "../components/GridNavigContent";
import AlbumReproducer, { Album } from "../components/AlbumReproducer";
import { styled } from "styled-components";

const GlobalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    margin: 10px 50px 20px 0;
    width: clamp(300px, 90%, 1400px);

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("/graffiti2.svg") no-repeat center center;
        background-size: cover;
        opacity: 1;
        z-index: -1;
     }
`;

const albumData : Album[] = data.map((cancion) => {
    return {
        idAlbum: cancion.id,
        title: cancion.titulo,
        canciones: cancion.canciones,
        artista: cancion.artista,
        oyentes: cancion.oyentes,
        imagenGrupo: cancion.imagenGrupo,
        descripcion: cancion.descripcion,
        comentarios: cancion.comentarios,
        comentador: cancion.comentador
    } as Album;
});


export default function NavigationPage() {
    /* Almacena el album seleccionado */
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    /* Almacena los filtros seleccionados */
    const [filters, setFilters] = React.useState<string[]>([]);

    /* Manejador que me permite mostrar las canciones del album MOLTING AND DANCING TODO: hacerlo para cualquier album */
    const manejadorAlbum = ( albumId : number ) => {
        if ( albumId >= 0 && albumId < albumData.length ){
            setSelectedAlbum(albumData[albumId]);
            console.log(albumData[albumId].comentarios);
        } else {
            console.error("Indice del album fuera de rango");
        }
       
    };
    /* Posible método que se usará en el filtrado con la BD
    
    const actualizarFiltros = (filters : string[]) => {
        setFilters(filters);
    }

    */

    return (

        <GlobalContainer>
            <Multiselect/>
            <GridComponent data = {data} onAlbumClick = {manejadorAlbum}/>
            {selectedAlbum && <AlbumReproducer album={selectedAlbum}/>}
        </GlobalContainer>

    );
};

