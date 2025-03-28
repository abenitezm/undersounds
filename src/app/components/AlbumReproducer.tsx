'use client';
import { useState, useRef, useEffect } from "react";
import { styled , keyframes} from "styled-components";
import colors from "../colors";
import { Play, ChevronsLeft, ChevronsRight,  Shuffle, Pause} from "lucide-react"; 
import ArtistCard from "./ArtistCard";
import CopiarEnlaceNavegacion from "./CopiarEnlaceNavegacion";
import { useAuth } from "../components/AuthContext";
import { animacionEntrada }  from "../components/ShopValidator";
import { toast, ToastContainer } from "react-toastify";
import Link from 'next/link';
import PrimaryButton from "./PrimaryButton";
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
    comentarios : string;
    comentador : string;
    type : string[];
}

type AlbumReproducerProps = {
    album : Album;
}

const ReproducerContainer = styled.div`
    background-color: ${colors.tertiary};
    padding: 20px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    height: 130vh;
    position: fixed; //Para mantenerlo fijo
    right: 60px;
    top: 60pxpx;
    width: 52vh;
    max-height: calc(100vh - 80px);
    overflow-y: auto;
`;

const BotonesControl = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
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

const PagarContainer = styled.div`
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 30px;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.6);
    color: ${colors.primary};
    padding: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: center;
`;

const DeployRestrictiveBackground = styled.div<{ $isOpen : boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px); // Agrega un desenfoque al fondo
    display: ${({$isOpen}) => ($isOpen ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    z-index: 100;
`;

const DeployContent = styled.div`
    background: ${colors.background};
    color: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
    animation: ${animacionEntrada} 0.3s ease-in-out;
    position: relative;
    max-width: 700px;
    height: 50vh;
    width: 90%;
    text-align: center;
    margin-bottom: 10px;
    z-index: 101;
`;

const BotonCerrar = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: ${colors.background};
    color: ${colors.secondary};
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background: ${colors.primary};
    }
`;


export default function AlbumReproducer( { album } : AlbumReproducerProps ) {
    const [currentSong, setCurrentSong] = useState<Cancion | null>(null);
    const [isOpen, setIsOpen] = useState(true);
    const [progreso, setProgreso] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [pagar, setPagar] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { userRole } = useAuth();

    {/* Si existe una canción a escuchar, se reproduce */}
    useEffect(() => {
        if ( audioRef.current && userRole === "registrado" ){
            audioRef.current.src = currentSong?.url || '';
            if ( isPlaying ){
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        } else {
            toast.warn("¡Ciudado!, debes de iniciar sesión", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "light"
            });
            console.log(userRole);
        }
    }, [currentSong, isPlaying, userRole]); //Depende useEffect de los valores de estas dos variables

    /* Sirve para la actualización constante del tiempo de la canción que se está escuchando */
    useEffect(() => {
        const actualizarProgreso = () => {
            if ( audioRef.current && userRole === "registrado"){
                const porcentaje = audioRef.current ? (audioRef.current.currentTime / audioRef.current.duration) * 100 : 0;
                setProgreso(porcentaje);
            }
            /* Si estás mas de 90 segundos escuchándola, tienes que pagar */
            if ( audioRef.current && audioRef.current.currentTime >= 90){
                audioRef.current.pause();
                setPagar(true);

            } else {
                if ( isPlaying ){
                    audioRef.current?.play();
                    setPagar(false);
                }
            }
        };

        audioRef.current?.addEventListener("timeupdate", actualizarProgreso);
        return () => {
            audioRef.current?.removeEventListener("timeupdate", actualizarProgreso);
        };
    }, [currentSong, isPlaying]);

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

    const reproducirSiguienteCancion = ( songs : Cancion[] ): void => {
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
            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>{album.title}</h2>
            <audio ref = {audioRef} ></audio>
            <img src = {album.canciones[0].image} style = {{ 
                width:"45.5vh", 
                height:"300px",
                position:"relative", 
                alignSelf: "center", 
                borderRadius: "10px",
                opacity: pagar ? 0.4 : 1,
                transition: "opacity 0.5s ease-in-out"}} 
                alt = "foto canción"
            />
            {pagar && ( <PagarContainer>Demo Gratuita Finalizada</PagarContainer>)}
            <BotonesControl>
                <ChevronsLeft onClick = {() => reproducirCancionAnterior(album.canciones)}/>  
                { isPlaying && userRole === "registrado" ? (
                    <Pause onClick={pausarSong} />
                ) : (
                    <Play onClick={ () => reproducirSong(album.canciones[0])} />
                )}
                { userRole === "invitado" && 
                    <DeployRestrictiveBackground $isOpen={isOpen}>
                        <ToastContainer/>
                        <DeployContent>
                            <h2 style={{ padding: "50px"}}>Debes iniciar sesión para acceder a este contenido</h2>
                            <BotonCerrar onClick={() => setIsOpen(false)}>✖</BotonCerrar>
                            <Link href="/login">
                                <PrimaryButton text="Iniciar Sesión" onClick={() => {}} style={{textAlign: "center"}} type="button"/>
                            </Link>
                        </DeployContent>
                    </DeployRestrictiveBackground>  
                }
                <label htmlFor="progress-bar"><input id="progress-bar" type="range" min="0" max="100" value={isNaN(progreso) ? "0" : progreso} 
                    onChange={(e : any) =>{
                        const nuevoTiempo = audioRef.current?.duration ? (audioRef.current.duration * e.target.value) / 100 : 0;
                        if (audioRef.current) {
                            audioRef.current.currentTime = nuevoTiempo;
                        }
                        setProgreso(e.target.value);
                    }}/></label>
                <ChevronsRight onClick = {() => reproducirSiguienteCancion(album.canciones)} />
                <Shuffle onClick = {() => shuffleReproducer(album.canciones)} />
            </BotonesControl>
            <ListaCanciones>
                {album.canciones.map((cancion) => (
                    <CancionLista key={cancion.id} onClick={() => reproducirSong(cancion)}>
                        <span>{cancion.titulo} - {cancion.time}</span>
                    </CancionLista>
                ))}
                { userRole === "registrado" && <CopiarEnlaceNavegacion url={currentSong?.url || ''}/>}
            </ListaCanciones>
            <ArtistCard album={album}/>
        </ReproducerContainer>
    );
}