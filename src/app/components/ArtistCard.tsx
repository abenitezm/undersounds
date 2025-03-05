'use client';
import styled from "styled-components";
import colors from "../colors";
import { useState } from "react";
import { Album } from "./AlbumReproducer";


const ArtistCardContainer = styled.div`
    background-color: ${colors.tertiary};
    border-radius: 10px;
    overflow: hidden;
    flex-direction: column;
    height: 60vh;
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
    
    .btn:link,
    .btn:visited {
        text-transform: uppercase;
        text-decoration: none;
        padding: 5px 10px;
        display: inline-block;
        border-radius: 50px;
        transition: all .2s;
        position: absolute;
    }

    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .btn:active {
        transform: translateY(-1px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .btn-white {
        background-color: #fff;
        color: #777;
    }

    .btn::after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 100%;
        border-radius: 100px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: all .4s;
    }

    .btn-white::after {
        background-color: #fff;
    }

    .btn:hover::after {
        transform: scaleX(1.2) scaleY(1.3);
        opacity: 0;
    }

    .btn-animated {
        animation: moveInBottom 5s ease-out;
        animation-fill-mode: backwards;
    }

    @keyframes moveInBottom {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }

        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }
`;


export default function ArtistCard( {album} : { album : Album } ){

    const [siguiendo, setSiguiendo] = useState(false);

    return (
        <ArtistCardContainer>
            <ArtistImageContainer imageurl = {album.imagenGrupo}>
                <div className="artist-text">Información sobre el artista</div>
            </ArtistImageContainer>
            <ArtistInfoContainer>
                <h3>{album.artista}</h3>
                <p className="followers">{album.oyentes}</p>
                <AnimatedSeguirButton className="text-box" onClick={ () => setSiguiendo(!siguiendo)}>
                    <a href="#" className="btn btn-white btn-animate">{siguiendo ? "Siguiendo" : "Seguir"}</a>
                </AnimatedSeguirButton>
                <p className="description">{album.descripcion}</p>
            </ArtistInfoContainer>
        </ArtistCardContainer>
    );
}