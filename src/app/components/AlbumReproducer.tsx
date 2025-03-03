'use client';
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import colors from "../colors";
import { Play } from "lucide-react"; 
import { ChevronsLeft } from 'lucide-react';
import { ChevronsRight } from 'lucide-react';
import { Shuffle } from 'lucide-react';
import { Pause } from 'lucide-react';

{/* Tipos de datos definidos */}

type Cancion = {
    id : number;
    titulo : string;
    url : string;
    image : string;
    time : string;
}

{ /* Lo pongo como export para hacer uso de ello en el padre */}
export type Album = {
    title : string;
    canciones : Cancion[];
}

type AlbumReproducerProps = {
    album : Album;
}

const ReproducerContainer = styled.div`
    background-color: ${colors.tertiary};
    padding: 20px;
    border-radius: 10px;
`;

const BotonesControl = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
`;

const ListaCanciones = styled.ul`
    list-style: none;
    padding: 5px;
    cursor: pointer
`;

const CancionLista = styled.li`
    list-style: none;
    padding: 5px;
    cursor: pointer;

    &:hover {
        color: ${colors.primary};
    }
`;

export default function AlbumReproducer( { album } : AlbumReproducerProps ) {
    const [currentSong, setCurrentSong] = useState<Cancion | null>(null);
    const [songTime, setSongTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    {/* Si existe una canción a escuchar, se reproduce */}
    useEffect(() => {
        if ( currentSong && audioRef.current ){
            if ( isPlaying ){
                audioRef.current.src = currentSong.url;
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [currentSong, isPlaying]); //Depende useEffect de los valores de estas dos variables

    {/* Controlador para reproducir canciones */}
    const reproducirSong = ( song : Cancion ) => {
        setCurrentSong(song);
        setIsPlaying(true);
    }   

    {/* Maneja la pausa de la canción actual */}
    const pausarSong = () => {
        setIsPlaying(false);
    }

    const reproducirSiguienteCancion = () => {
        /* Caso base, si las canciones se encuentran vacías termino */
        if ( album.canciones.length === 0 ){
            return;
        } else { // Si no se encuentran vacías procedo a coger la siguiente a la actual
            
            const index = album.canciones.findIndex((x) => x.id === currentSong?.id);
            
            // Si el índice no sobrepasa los límites del vector y la función "findIndex" no me da error, se elige como current song a la siguiente de la actual 
            if ( index !== -1 && index < album.canciones.length - 1 ){
                setCurrentSong(album.canciones[ index + 1 ]);
                setIsPlaying(true);
            }
        }
    };

    const reproducirCancionAnterior = () => {
        /* Caso base, si las canciones se encuentran vacías termino */
        if ( album.canciones.length === 0 ){
            return;
        } else { // Si no se encuentran vacías procedo a coger la anterior de la actual
            
            const index = album.canciones.findIndex((x) => x.id === currentSong?.id);
            
            /* Comprobación de si el índice es > 0: ¿Por qúe? 

                - Si la lista tiene un solo valor canciones[0], no vas a poder coger la anterior

                - Si index es -1 significa que el findIndex ha dado error asi que tampoco se podrá coger la anterior
            */
           if ( index > 0 ){
                setCurrentSong(album.canciones[ index - 1 ]);
                setIsPlaying(true);
           }
        }
    };

    const shuffleReproducer = () => {

        //Cojo una canción random del vector de canciones
        const randomSong = Math.floor(Math.random() * album.canciones.length);
        setCurrentSong(album.canciones[randomSong]);
    };

    return (
        <ReproducerContainer>
            <h2>{album.title}</h2>
            <audio ref = {audioRef}></audio>
            <img src = {currentSong?.image} />
            <BotonesControl>
                <ChevronsLeft onClick = {reproducirCancionAnterior}/>
                <Play onClick = {() => currentSong ? pausarSong() : reproducirSong(album.canciones[0])}/>
                <Pause onClick = {pausarSong} />
                <ChevronsRight onClick = {reproducirSiguienteCancion} />
                <Shuffle onClick = {shuffleReproducer} />
            </BotonesControl>
            <ListaCanciones>
                {album.canciones.map((cancion) => (
                    <CancionLista key={cancion.id} onClick={() => reproducirSong(cancion)}>
                        <span>
                            <span>{cancion.titulo}</span>
                            <span style={{ marginLeft: '10px' }}>{cancion.time}</span>
                        </span>
                    </CancionLista>
                ))}
            </ListaCanciones>
        </ReproducerContainer>
    );
}