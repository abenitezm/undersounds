'use client';

import React from "react";
import Chips from "../components/chips";

export default function NavigationPage() {
    return (
        <div id="chips-container" style={styles.container}>
            <Chips name="Rock" />
            <Chips name="Cloud" />
            <Chips name="Funk" />
            <Chips name="Metal" />
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px"},
}
