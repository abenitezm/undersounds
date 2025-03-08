'use client';
import React from "react";
import { styled } from "styled-components";
import GridComponent from "../components/GridContent";

const Fondo = styled.div`
  background: linear-gradient(135deg, rgba(118, 171, 174, 0.8), rgba(49, 54, 63, 0.8));
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;


export default function Tienda(){
    return(
        <Fondo>
            <h1>Hola</h1>
        </Fondo>
    )
};