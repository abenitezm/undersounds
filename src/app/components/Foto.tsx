'use client';
import styled from "styled-components";
import colors from "../colors";
import { useState } from "react";


const FotoContainer = styled.div`
    position: relative; 
    background-color: ${colors.tertiary};
    border-radius: 10px;
    overflow: hidden;
    flex-direction: column;
    height: 60vh;
    width: 600px;
    margin-top: 30px;
    cursor: pointer;
`;

const FotoImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const FotoInfo = styled.div`
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    color: ${colors.secondary};
    width: 100%;
    padding: 40px;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    ${FotoContainer}:hover & {
        opacity: 1;
    }
`;

type FotoProps = {
    src: string;
    title: string;
    description: string;
};

export default function Foto( {src, title, description} : FotoProps ) {

    return (        
    <FotoContainer>
        <FotoImage src={src} alt={title} />
        <FotoInfo>
            <h3>{title}</h3>
            <p>{description}</p>
        </FotoInfo>
    </FotoContainer>
    );
}