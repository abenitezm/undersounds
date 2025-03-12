'use client';
import styled from "styled-components";
import colors from "../colors";
import { useState } from "react";
import { Album } from "./AlbumReproducer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";


const ArtistCardContainer = styled.div`
    background-color: ${colors.tertiary};
    border-radius: 10px;
    overflow: hidden;
    flex-direction: column;
    height: 70vh;
    margin-top: 30px;
`;

/* Este div va a tener un parámetro obligatorio que es 
la url de la imagen para no tener que meter una etiqueta 
img dentro de el mismo.
 */
const ArtistImageContainer = styled.div<{ imageurl : string }>`
    position: relative;
    height: 50%; //La mitad superior
    background-image: url(${(props) => props.imageurl});
    background-size: cover;
    background-position: center;

    /*Texto sobre la imagen*/
    .artist-text {
        position: absolute;
        top: 0px;
        left: 0px;
        color: white;
        font-size: 1rem;
        font-weight: bold;
        padding: 4px 10px;
        border-radius: 5px;
    }
`;

const ArtistInfoContainer = styled.div`
    height: 50%; //La mitad inferior
    background-color: ${colors.background};
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;

    h3 {
        margin: 0;
        font-size: 1rem;
        margin-bottom: 10px;
    }

    .followers {
        font-size: 0.8rem;
        opacity: 0.8;
        margin-bottom: 10px;
    }

    .description {
        font-size: 0.85rem;
        overflow: hidden; //Evita que el texto se salga
        word-break: break-all;
        width: 300px;
        margin-top: 40px;
    }
`;

const AnimatedSeguirButton = styled.div`
    border-radius: 10px;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gray;
    margin: 0 auto;
    margin-left: 0;
    margin-bottom: 10px;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    text-align: center;
    gap: 5px;
    background-color: ${colors.tertiary};
    color: ${colors.secondary};
    border: none;
    width: 100%;
    padding: 8px 15px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.9rem;
`;

const ArtistName = styled.h3`
    &:hover {
        text-decoration-line: underline;
    }   
`;


export default function ArtistCard( {album} : { album : Album } ){

    const [siguiendo, setSiguiendo] = useState(false);

    return (
        <ArtistCardContainer>
            <Link href={`artist/${album.artista}`}><ArtistImageContainer imageurl = {album.imagenGrupo}>
                <div className="artist-text">Información sobre el artista</div>
            </ArtistImageContainer></Link>
            <ArtistInfoContainer>
                <Link href={`artist/${album.artista}`}><ArtistName>{album.artista}</ArtistName></Link>
                <p className="followers">{album.oyentes}</p>
                <AnimatedSeguirButton>
                    <Button  onClick={ () => setSiguiendo(!siguiendo)}>
                        <FavoriteIcon />
                        {siguiendo ? "Siguiendo" : "Seguir"}
                    </Button>
                </AnimatedSeguirButton>
                <p className="description" style={{marginTop: "-5px"}}>{album.descripcion}</p>
            </ArtistInfoContainer>
        </ArtistCardContainer>
    );
}