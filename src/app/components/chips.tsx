'use client';

import React from "react";
import styled from "styled-components";
import colors from "../colors";

{ /* Defino el estilo de los chips unitarios seleccionados por el user */}
const ChipUnique = styled.button`

    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${colors.primary};
    gap: 5px;
    padding: 15px 25px;
    font-size: 18px;
    border-radius: 50px;
    min-height: 50px;
    min-width: 100px;
    animation-duration: 3s;
    animation: fadeInSlide 0.4s ease-out; /* Animación al aparecer, TODO cambiar a aparecer cuando se elija */

    &:hover {
        background-color: ${colors.secondary};
        box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.5);
        color: ${colors.background};
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.9);
    }

    /*Implementación de la animación, ejecutar la web para ver su uso*/
    @keyframes fadeInSlide {
    
        from {
            opacity: 0; /*No visible*/
            transform: translateX(20px); /*Desplazamiento hacia la derecha*/
        }
        to {
            opacity: 1; /*Visible*/
            transform: translateX(0);
        }
    }
`;

const CloseIcon = styled.span`
    margin-left: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.2);
    }
`;

{/* Defino el tipo del parámetro que se desbe de pasar en la instanciación del componente */}
type ChipsProps = {
    name: string;
    onDelete: () => void;
}

export default function Chips( { name , onDelete}: ChipsProps ) {
    return (
        <div>
            <ChipUnique>
                {name}
                {/* No funciona la función porque el array de filters está vacío TODO rellenarlo con las opciones seleccionadas de la lupa*/}
                <CloseIcon onClick = { onDelete }>❌</CloseIcon>
            </ChipUnique>
        </div>
    );
}