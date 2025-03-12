'use client';

import React from "react";
import styled from "styled-components";
import colors from "../colors";
import Link from "next/link";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PrimaryButton from "./PrimaryButton";

const GridContainer = styled.div<{ $expandir : boolean}>`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    justify-content: start;
    justify-items: start;
    margin-left: 0;
    width: 90%;
    height: ${({ $expandir }) => ($expandir ? "350px" : "570px")};
    overflow-y: ${({ $expandir }) => ($expandir ? "auto" : "visible")};
    padding-right: 10px;
    overflow-x: visible;
`;

const GridItem = styled.div`
    background-color: ${colors.tertiary};
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 8px;

    &:hover {
        transform: scale(1.05);
        background-color: ${colors.primary};
    }
`;

const ArtistName = styled.p`
    font-size: 14px;
    color: ${colors.primary};

    ${GridItem}: hover & {
        color: ${colors.background};
    }

    &:hover {
        text-decoration-line: underline;
    }
`;

const Title = styled.h2`
    font-size: 14px;
    margin: 10px 0;

`;

const Tipo = styled.h3`
    font-size: 14px;
    margin: 10px 0;
    color: ${colors.secondary};

`;

const Precio = styled.h3`
    font-size: 14px;
    margin: 10px 0;
    color: ${colors.secondary};

`;

const MerchImg = styled.img`
    width: 187px;
    height: 187px;
    border-radius: 10px;
    object-fit: cotain; //Ajusta la imagen dentro del espacio sin deformarla
`;

const BotonMasResultados = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #0070f3;
  justify-content: center;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

const BuyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${colors.background};
  color: ${colors.secondary};
  border: none;
  padding: 5px 8px;
  margin-left: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
`;

type GridComponentProps = {
    data : any[]; //Datos recibidos
    onMerchClick : (merchId : string) => void;
}

export type Merch = {
    id : string,
    titulo: string,
    tipo: string,
    precio: string,
    imagen: string,
    artista: string
};

export default function GridContent( { data, onMerchClick } : GridComponentProps) {

    const [expandir, setExpandir] = useState(false);
    const enseñarMasContenido = expandir ? data : data.slice(0, 6); 

    const manejadorElementoMerch = (merchId : string ) => {
        onMerchClick(merchId);
        console.log("hey");
    };

    return (
        /* Cargamos el contenedor donde almacenaremos los productos */
        <GridContainer $expandir={expandir}>
            {/* Recorremos los datos del JSON para mostrar su contenido de una manera bonita visualmente*/}
            {enseñarMasContenido.map(( elemento : any ) => (
                <GridItem key = { elemento.id } onClick = {() => manejadorElementoMerch(elemento.id)}>
                    <MerchImg src = { elemento.imagen } alt = { elemento.titulo } />
                    <Title>{ elemento.titulo }</Title>
                    <Tipo>{ elemento.tipo }</Tipo>
                    <ArtistName><Link href={`/artist/${elemento.id}`}>{ elemento.artista }</Link></ArtistName>
                    <span style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                        <Precio>{ elemento.precio}</Precio>
                        <BuyButton>
                            <ShoppingCartIcon />
                            Comprar
                        </BuyButton>
                    </span>
                </GridItem>
            ))}
            <PrimaryButton onClick = {() => setExpandir(!expandir)}
                text = { expandir ? "Ver menos resultados" : "Ver más resultados" }>
            </PrimaryButton>
        </GridContainer>
    );
}