'use client';
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import colors from "../colors";
import { Play, ChevronsLeft, ChevronsRight,  Shuffle, Pause } from "lucide-react"; 
import ArtistCard from "./ArtistCard";

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
    idAlbum: number,
    title : string;
    canciones : Cancion[];
    artista : string;
    oyentes : string;
    imagenGrupo : string;
    descripcion : string;
}

type AlbumReproducerProps = {
    album : Album;
}

const ReproducerContainer = styled.div`
    background-color: ${colors.tertiary};
    padding: 20px;
    margin-left: auto;
    margin-top: -1077px;
    border-radius: 10px;
    height: 130vh;
`;

const BotonesControl = styled.div`
    display: flex;
    justify-content: center;
`;

const ListaCanciones = styled.ul`
    list-style: none;
    cursor: pointer;
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
        if ( audioRef.current ){
            audioRef.current.src = currentSong?.url || '';
            if ( isPlaying ){
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
        if (audioRef.current) {
            audioRef.current.volume = 0.30;
        }
    }   

    {/* Maneja la pausa de la canción actual */}
    const pausarSong = () => {
        setIsPlaying(false);
    }

    const reproducirSiguienteCancion = ( songs : Cancion[] ) => {
        /* Caso base, si las canciones se encuentran vacías termino */
        if ( songs.length === 0 ){
            return;
        } else { // Si no se encuentran vacías procedo a coger la siguiente a la actual
            
            const index = songs.findIndex((x) => x.id === currentSong?.id);
            
            // Si el índice no sobrepasa los límites del vector y la función "findIndex" no me da error, se elige como current song a la siguiente de la actual 
            if ( index !== -1 && index < songs.length - 1 ){
                setCurrentSong(songs[ index + 1 ]);
                setIsPlaying(true);
            }
        }
    };

    const reproducirCancionAnterior = ( songs : Cancion[] ) => {
        /* Caso base, si las canciones se encuentran vacías termino */
        if ( songs.length === 0 ){
            return;
        } else { // Si no se encuentran vacías procedo a coger la anterior de la actual
            
            const index = songs.findIndex((x) => x.id === currentSong?.id);
            
            /* Comprobación de si el índice es > 0: ¿Por qúe? 

                - Si la lista tiene un solo valor canciones[0], no vas a poder coger la anterior

                - Si index es -1 significa que el findIndex ha dado error asi que tampoco se podrá coger la anterior
            */
           if ( index > 0 ){
                setCurrentSong(songs[ index - 1 ]);
                setIsPlaying(true);
           }
        }
    };

    const shuffleReproducer = ( songs: Cancion[] ) => {

        //Cojo una canción random del vector de canciones
        const randomSong = Math.floor(Math.random() * songs.length);
        setCurrentSong(songs[randomSong]);
    };

    return (
        <ReproducerContainer>
            <h2 style={{ textAlign: "center" }}>{album.title}</h2>
            <audio ref = {audioRef} ></audio>
            <img src = {currentSong?.image} style = {{ width:"330px", height:"300px", alignSelf: "center", borderRadius: "10px"}} alt = "foto canción" />
            <BotonesControl>
                <ChevronsLeft onClick = {() => reproducirCancionAnterior(album.canciones)}/>
                { isPlaying ? (
                    <Pause onClick={pausarSong} />
                ) : (
                    <Play onClick={ () => reproducirSong(album.canciones[0])} />
                )}
                <ChevronsRight onClick = {() => reproducirSiguienteCancion(album.canciones)} />
                <Shuffle onClick = {() => shuffleReproducer(album.canciones)} />
            </BotonesControl>
            <ListaCanciones>
                {album.canciones.map((cancion) => (
                    <CancionLista key={cancion.id} onClick={() => reproducirSong(cancion)}>
                        <span>{cancion.titulo} - {cancion.time}</span>
                    </CancionLista>
                ))}
            </ListaCanciones>
            <ArtistCard album={album}/>
        </ReproducerContainer>
    );
}