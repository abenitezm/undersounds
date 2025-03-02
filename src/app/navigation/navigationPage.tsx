'use client';

import React from "react";
import { CSSProperties } from "react";
import Chips from "../components/chips";
import Multiselect from "../components/Multiselect";
import data from "../content.json";
import GridComponent from "../components/GridContent";

export default function NavigationPage() {
    return (
        <div id="chips-container" style={styles.container}>
            {/* Descomentar si queréis ver estéticamente el componente chip

            <Chips name = "Rock" onDelete = {() =>{}}/>
            <Chips name = "Cloud" onDelete = {() =>{}}/>
            <Chips name = "Funk" onDelete = {() =>{}}/>
            <Chips name = "Metal" onDelete = {() =>{}}/>

            */}
            {/* Descomentar si queréis ver estéticamente el componente GridComponent 
            
            <GridComponent data = {data}/>
            
            */}
            {/* Descomentar si queréis ver el funcionamiento de la multiselect 
            
            <Multiselect />
            
            */}
        </div>
    );
}

const styles: { container: CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px"
    },
}
