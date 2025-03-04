'use client';

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import colors from "../colors";
import { Search } from "lucide-react";
import Chips from "./chips";
import { Chip } from "@mui/material";
import SecondaryButton from "./SecondaryButton";

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background-color: ${colors.background};
    padding: 15px 5px;
    border-radius: 10px;
    min-width: 150px;
`;

const Input = styled.input`
    border: none;
    outline: none;
    padding: 8px;
    flex-grow: 1;
    font-size: 14px;
    background: transparent;
`;

const Dropdown = styled.ul`
    position: absolute;
    top: 50px;
    left: 0;
    width: 225px;
    background-color: ${colors.background};
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 8px;
    display: none;

    &.open {
        display: block; /* Hago esto para que cuando la clase de Dropdown se llame open, despliego el contenido */
    }
`;

const DropdownItem = styled.li`
    padding: 8px;
    cursor: pointer;

    &:hover {
        background-color: ${colors.primary};
        border-radius: 10px;
        color: white;
    }
`;

const ChipsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 300px; /*Subjetiva, dependiendo de la posición donde se ponga en la view, cambiará para que el flex-wrap funcione bien*/
    gap: 8px;
    flex-wrap: wrap;
`;


export default function Multiselect(){
    const [mostrarDropdown, setMostrarDropdown] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const dropdownRef = React.useRef<HTMLUListElement>(null);
    const [filters, setFilters] = React.useState<string[]>([]);

    {/* Definición de vector de tipos de géneros que se usarán para facilitar el filtrado */}
    const generos = ["Rock", "Cloud", "Funk", "Metal"];

    {/* Definición de variable que contendrá una función la cual manejará los inputs de texto que se hagan */}
    const manejadorBusqueda = (genre : string) => {
       {/* Si el genero seleccionado de la lista no está en el vector, se introduce */}
        if (!filters.includes(genre)) {
            setFilters([...filters, genre]);
        }    
        /* 
            - Podemos hacer que aparezca en el input el genero seleccionado 
              setSearch(genre);

            - No aparece nada en el input setSearch("");
        */
        setSearch("");
        setMostrarDropdown(false);
    }

     {/* Función que me elimina los filtros del array de filtros */}
     const eliminarFiltros  = (genre : string) => {
        console.log("Eliminando filtro", genre);
        setFilters(filters.filter((filter) => filter !== genre)); //Actualización del array filters eliminando los filtros que se han seleccionado
    }

    {/* Cerrar el Dropdown si se hace click fuera TOOD: hacer que funcione */}
    useEffect(() => {
        const cerrarDropdown = (e : MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
                setMostrarDropdown(false);
            }
        };

        /* Si se produce un dropdown, cierro el desplegable */
        /*
            Por qué elijo el evento de mousedown y no el de click?
            
            -click: El usuario tiene que presionar y soltar el botón del
            ratón, estando el cursor situado dentro del mismo elemento.

            -mousedown: El usuario tiene que presionar inicialmente el botón.

        */
        document.addEventListener("mousedown", cerrarDropdown)

        return () => {
            document.removeEventListener("mousedown", cerrarDropdown);
        }

    }, []);


    return (
        <Container>
            {/* Contenedor donde almaceno todos los componentes necesarios de búsqueda por defecto */}
            <SearchContainer>
                <Search size="24" color={colors.primary} />
                <Input 
                    type = "text"
                    placeholder = "Filtra contenido por género"
                    value = {search}
                    onChange = { ( e : any )  => setSearch(e.target.value)} // Cuando cambie el valor del input, se actualiza la varible que guarda las busquedas por teclado
                    onClick = { () => setMostrarDropdown(true)}
                />
            </SearchContainer>

            {/* Despliegue de las opciones de filtro a elegir en la barra de búsqueda */}
            <Dropdown className={mostrarDropdown ? "open" : ""}>
                {
                    generos
                        .map((genero, indice) => (
                            <DropdownItem key = {indice} onClick = { () => manejadorBusqueda(genero) }>
                                {genero}
                            </DropdownItem>
                        ))   
                }
            </Dropdown>

            {/* Renderización de los Chips que el usuario ha elegido */}
            <ChipsContainer >
                {
                    filters.map((genre, index) => (
                        <SecondaryButton
                            key = {index}
                            text = {genre}
                            onClick = {() => eliminarFiltros(genre)}
                        />
                    ))
                }
            </ChipsContainer>
        </Container>
    );
}