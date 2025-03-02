'use client';

import React, { useRef } from "react";
import { Play } from "lucide-react";

export default function WebAudio(){
    {/* Función de audio para todas las páginas */}
    const audioRef = useRef<HTMLAudioElement>(null);

    const playMuic = () => {
        if ( audioRef.current ) {
            audioRef.current.volume = 0.40;
            audioRef.current.play().catch((error => {console.error("Audio error: no se ha podido reproducir el audio")}));
        }
    };

    const stopMusic = () => {
        if ( audioRef.current ) {
            audioRef.current.pause();
        }
    };

    return (
        <div style={ styles.container }>
            <audio ref={audioRef} style={ styles.audio } controls loop>
                <source src="/audio/web_audio.mp3" type="audio/mpeg"/>
            </audio>
            <p>Escucha canción de fondo</p>
            <button style={ styles.playButton }onClick={playMuic}>▶ </button>
            <button style={ styles.playButton } onClick={stopMusic}>⏸</button>
        </div>
    );
}

const styles = {
    container: {
        display: "flex", 
        justifyContent: "start",
        alignItems: "end",
        height: "45vh"
    },

    audio : {
        display: "none"
    },

    playButton : {
        backgroundColor: "#76ABAE",
        marginLeft: "20px",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        fontSize: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        transition: "background-color 0.3s"
    }
};