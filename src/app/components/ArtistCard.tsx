'use client';
import styled from "styled-components";
import colors from "../colors";
import { useState } from "react";
import { Album } from "./AlbumReproducer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import PrimaryButton from "./PrimaryButton";


const ArtistCardContainer = styled.div`
    background-color: ${colors.tertiary};
    border-radius: 10px;
    overflow: hidden;
    flex-direction: column;
    height: 120vh;
    margin-top: 30px;
`;

/* Este div va a tener un parámetro obligatorio que es 
la url de la imagen para no tener que meter una etiqueta 
img dentro de el mismo.
 */
const ArtistImageContainer = styled.div<{ $imageurl : string }>`
    position: relative;
    height: 30%; //La mitad superior
    background-image: url(${(props) => props.$imageurl});
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
    height: 70%; //La mitad inferior
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

const CommentSectionContainer = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin-bottom: 55px;
`;

const SeccionValoraciones = styled.h3`
    color: ${colors.primary};
    font-size: 14px;
`;

const LineaEstetica = styled.div`
    width: 100%;
    height: 2px;
    border-radius: 10px;
    background-color: ${colors.primary};
`;

const Comment = styled.textarea<{ $addComment : boolean }>`
    text-align: left;
    height: 90px;
    width: 100%;
    border-radius: 10px;
    background-color: ${colors.tertiary};
    color: ${colors.primary};
    padding: 12px;
    font-size: 14px;
    font-family: 'Arial', sans-serif;
    resize: vertical;
    border: 2px solid ${colors.primary};
    transition: all 0.3s ease;
    resize: vertical;

    /* Mostrar o esconder basado en $addComment */
    display: ${({ $addComment }) => ($addComment ? "block" : "none")};

    /* Estilos para el enfoque */
    &:focus {
        outline: none;
        border-color: ${colors.primary}; /* Asegúrate de que tienes un color de resaltado */
        background-color: ${colors.secondary}; /* Fondo al enfocarse */
    }

    /* Estilos para el hover */
    &:hover {
        border-color: ${colors.secondary};
    }

    /* Estilos para mejorar la legibilidad */
    line-height: 1.5;
    letter-spacing: 0.5px;
`;

const EnviarButton = styled.button`
    background-color: ${colors.tertiary}; /* Color de fondo */
    color: ${colors.secondary}; /* Color del texto */
    font-size: 14px; /* Tamaño de la fuente */
    padding: 10px 20px; /* Espaciado interno */
    border-radius: 10px; /* Bordes redondeados */
    border: 2px solid ${colors.primary}; /* Borde del botón */
    cursor: pointer; /* Cambiar el cursor cuando se pasa por encima */
    width: 100%;
    transition: all 0.3s ease; /* Transición suave para los efectos */

    /* Efectos de hover */
    &:hover {
        background-color: ${colors.secondary}; /* Cambia el fondo cuando el mouse pasa por encima */
        border-color: ${colors.primary}; /* Cambia el color del borde en hover */
        color: ${colors.tertiary};
    }

    /* Efectos al hacer clic */
    &:active {
        transform: scale(0.98); /* Reduce ligeramente el tamaño al hacer clic */
        background-color: ${colors.tertiary}; /* Fondo cuando se hace clic */
    }
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column; /* Apila los elementos verticalmente */
    align-items: center; /* Centra los elementos en el eje horizontal */
    gap: 10px; /* Espaciado entre la caja de texto y el botón */
    width: 100%;
    border-radius: 10px; /* Bordes redondeados */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
`;

export default function ArtistCard( {album} : { album : Album } ){

    const [siguiendo, setSiguiendo] = useState(false);
    const [addComment, setAddComment] = useState(false);

    return (
        <ArtistCardContainer>
            <Link href={`artist/${album.artista}`}><ArtistImageContainer $imageurl = {album.imagenGrupo}>
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
                <CommentSectionContainer>
                    <SeccionValoraciones>Comentarios y valoraciones</SeccionValoraciones>
                    <LineaEstetica />
                    <p className="Comentario" style={{paddingTop: "10px", fontSize: "13px"}}><i>{album.comentarios}</i></p>
                    <p className="Comentador" style={{color: "#76ABAE", marginBottom: "10px"}}><a href="#"><i>{album.comentador}</i></a></p>
                    <PrimaryButton text="Añadir Comentario" onClick={() => setAddComment(!addComment)} style={{fontSize: "13px", borderRadius: "10px", width: "100%", marginBottom: "10px"}}/>
                    {addComment &&
                        <CommentContainer>
                            <Comment $addComment={addComment} />
                            <EnviarButton>Enviar</EnviarButton>
                        </CommentContainer>
                    }
                </CommentSectionContainer>
            </ArtistInfoContainer>
        </ArtistCardContainer>
    );
}