'use client';

import React, { useEffect } from "react";
import { useState } from "react";
import Multiselect from "../../views/components/Multiselect";
import data from "../../assets/bd.json";
import GridComponent from "../../views/components/GridNavigContent";
import AlbumReproducer, { Album } from "../../views/components/AlbumReproducer";
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
        comentador: cancion.comentador,
        type : cancion.type
    } as Album;
});

const viniloData = data
    .filter((item) => item.type.includes("Vinilo"));

export default function NavigationPage() {
    /* Almacena el album seleccionado */
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    /* Almacena los filtros seleccionados */
    const [filters, setFilters] = React.useState<string[]>([]);

    /* Manejador que me permite mostrar las canciones del album MOLTING AND DANCING TODO: hacerlo para cualquier album */
    const manejadorAlbum = ( albumId : number ) => {
        if ( albumId >= 0 && albumId < viniloData.length ){
            setSelectedAlbum({
                idAlbum: Number(viniloData[albumId].id) ?? 0,
                title: viniloData[albumId].titulo,
                canciones: Array.isArray(viniloData[albumId].canciones) ? viniloData[albumId].canciones : [],
                artista: viniloData[albumId].artista ?? "",
                oyentes: viniloData[albumId].oyentes ?? "",
                imagenGrupo: viniloData[albumId].imagenGrupo ?? "",
                descripcion: viniloData[albumId].descripcion ?? "",
                comentarios: viniloData[albumId].comentarios ?? "",
                comentador: viniloData[albumId].comentador ?? "",
                type: viniloData[albumId].type,
            });
        } else {
            console.log(viniloData);
            console.log(albumId);
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
            <Multiselect tipo = "Vinilo"/>
            <GridComponent data = {viniloData} onAlbumClick = {manejadorAlbum}/>
            {selectedAlbum && <AlbumReproducer album={selectedAlbum}/>}
        </GlobalContainer>

    );
};