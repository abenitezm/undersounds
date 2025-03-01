'use client';

import React from "react";
import Chips from "../components/chips";
import Multiselect from "../components/Multiselect";

export default function NavigationPage() {
    return (
        <div id="chips-container" style={styles.container}>
            <Chips name = "Rock" onDelete = {() =>{}}/>
            <Chips name = "Cloud" onDelete = {() =>{}}/>
            <Chips name = "Funk" onDelete = {() =>{}}/>
            <Chips name = "Metal" onDelete = {() =>{}}/>
            <Multiselect />
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px"
    },
}
