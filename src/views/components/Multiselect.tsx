'use client';

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import colors from "../../app/colors";
import { Search, ArrowUpDown, Clock, Delete} from "lucide-react";
import Chips from "./chips";
import { Chip } from "@mui/material";
import PrimaryButton from "./PrimaryButton";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { filter } from "framer-motion/client";
import { FilterAltOffSharp } from "@mui/icons-material";

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction:column;
    align-items: start;
    gap: 8px;
    height: 15vh;
    background-color: ${colors.tertiary};
    border-radius: 10px;
    width: 70%;
`;

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background-color: ${colors.tertiary};
    padding: 15px 5px;
    border-radius: 10px;
    min-width: 250px;
`;

const Input = styled.input`
    border: none;
    outline: none;
    padding: 8px;
    flex-grow: 1;
    font-size: 14px;
    border-radius:10px;
    margin-left: 10px;
    background: ${colors.background};
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
    position: absolute;
    left: 250px;
    width: 300px; /*Subjetiva, dependiendo de la posición donde se ponga en la view, cambiará para que el flex-wrap funcione bien*/
    gap: 8px;
    height: 62.8px;
    flex-wrap: wrap;
`;

const ContenedorBotonesAdicionales = styled.div`
    display: flex;
    gap: 290px;
    margin-top:20px;
    margin-left: 10px;
`;

const BotonAdicional = styled.button`
    border-radius:3px;
    width: 118px;
    background-color: ${colors.tertiary};    
    border:none;
    color: ${colors.secondary};
    margin-top: -3%;
    border: 1px solid transparent;
    
    &:hover{
        border: 1px solid white;
    }
`;

/* Posible método que se usará en el filtrado con la BD

type MultiselectProps = {
    onCambioFiltro: (filters: string[]) => void;
}

*/

export default function Multiselect( {tipo, selectedGenre, onGenreChange} : {tipo : string, selectedGenre: string[], onGenreChange: (genres: string[]) => void} ){
    const [mostrarDropdown, setMostrarDropdown] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const dropdownRef = React.useRef<HTMLUListElement>(null);
    const [filters, setFilters] = React.useState<string[]>([]);

    {/* Definición de vector de tipos de géneros que se usarán para facilitar el filtrado */}
    const generos = ["Pop", "Rap", "Indie", "Hopecore", "Hip-Hop"];

    {/* Definición de variable que contendrá una función la cual manejará los inputs de texto que se hagan */}
    const manejadorBusqueda = (genre : string) => {
        {/* Si el genero seleccionado de la lista no está en el vector, se introduce */} 
        /*if (!filters.includes(genre) && (generos.includes(search) || generos.includes(genre))) {
            setFilters([...filters, genre]);
        } */
       if ( !selectedGenre.includes(genre) && generos.includes(genre)) {
            onGenreChange([...selectedGenre, genre]); // Actualizamos el estado del padre
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
        //const nuevosFiltros = filters.filter((filter) => filter !== genre); //Actualización del array filters eliminando los filtros que se han seleccionado
        const nuevosFiltros = selectedGenre.filter((filter) => filter !== genre);
        //setFilters(nuevosFiltros);
        onGenreChange(nuevosFiltros);
    }

    const eliminarTodosLosFiltros = () => {
        //filters.splice(0, filters.length);
        //setFilters(filters);
        onGenreChange([]);
    }

    /* Posible método que se usará en el filtrado con la BD
    
    const actualizarFiltros = (filters : string[]) => {
        setFilters(filters);
    }

    */

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
        document.addEventListener("mousedown", cerrarDropdown);
        return () => {
            document.removeEventListener("mousedown", cerrarDropdown);
        }

    }, []);

    /* Proceso de filtrado en base a los filtros aplicados */

    return (
        <Container>
            {/* Contenedor donde almaceno todos los componentes necesarios de búsqueda por defecto */}
            <SearchContainer>
                <FilterAltIcon style={{ fontSize: 24, color: colors.primary }} />
                <Input id="input"
                    type = "text"   
                    placeholder = "Filtra contenido por género"
                    value = {search}
                    onChange = { ( e : any )  => setSearch(e.target.value)} // Cuando cambie el valor del input, se actualiza la varible que guarda las busquedas por teclado
                    onClick = { () => setMostrarDropdown(true)}
                    onKeyDown={(e : any) => {
                        /* si se ha pulsado al enter y el input no está vacío entro */
                        if ( e.key === "Enter" && search.trim() !== ""){
                            manejadorBusqueda(search.trim());
                        }
                    }}
                />
            </SearchContainer>

            {/* Despliegue de las opciones de filtro a elegir en la barra de búsqueda */}
            <Dropdown ref={dropdownRef} className={mostrarDropdown ? "open" : ""}>
                {
                    generos
                        /* Filtra los géneros en base al input que yo le estoy metiendo*/
                        .filter((genero) => 
                            genero.toUpperCase().includes(search.toUpperCase())
                        )
                        .map((genero, indice) => (
                            <DropdownItem key = {indice} onClick = { () => manejadorBusqueda(genero)}>
                                {genero}
                            </DropdownItem>
                        ))   
                }
            </Dropdown>

            <ContenedorBotonesAdicionales>
                <BotonAdicional>
                    <span style = {{display: "flex"}}>
                        <ArrowUpDown />
                        <p style = {{marginLeft: "10px", alignSelf: "center"}}>Más vendidos</p>
                    </span>
                </BotonAdicional>
                <BotonAdicional style = {{width: "100px"}}>
                    <span style = {{display: "flex"}}>
                        <Clock />
                        <p style = {{marginLeft: "10px", alignSelf: "center"}}>Nuevo</p>
                    </span>
                </BotonAdicional>
                <BotonAdicional style = {{ width: "132px"}} onClick={eliminarTodosLosFiltros}>
                    <span style = {{display: "flex"}}>
                        <p style = {{marginRight: "10px", alignSelf: "center"}}>Eliminar Filtros</p>
                        <Delete />
                    </span>
                </BotonAdicional>
            </ContenedorBotonesAdicionales>

            {/* Renderización de los Chips que el usuario ha elegido */}
            <ChipsContainer >
                {
                    //Comprobación de que he entrado en Vinilo, Cassetes, CDs...
                    //Si he entrado, quedo marcado un filtro por defecto en base a la página en la que me encuentre.
                    tipo !== "" && (
                        <PrimaryButton
                            text = {tipo}
                            onClick = {() => {}}
                            type = "button"
                        />
                    )
                }
                {
                    selectedGenre.map((genre, index) => (
                        <PrimaryButton
                            key = {index}
                            text = {genre}
                            onClick = {() => eliminarFiltros(genre)}
                            type = "button"
                        />
                    ))
                }
            </ChipsContainer>
        </Container>
    );
}