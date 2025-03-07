"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Share, CircleCheck } from "lucide-react";
import styled from "styled-components";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/ReactToastify.css";

const IconosCompartirLike = styled.div`
    margin-left: 278px;
    margin-top: -33px;
    width: 50px;

`;

export default function CopiarEnlaceNavegacion(){
    /* Almacenamiento de la ruta */
    const [ ruta, setRuta ] = useState(""); //Donde se guarda la URL
    const router = useRouter();

    useEffect(() => {
        /* 
           Comprueba que estamos ejecutando esto en la parte del cliente,
           en la parte del servidor no se podría hacer
        */
        if ( typeof window !== "undefined") {
            /* Ontiene la ruta de la página actual */
            setRuta(window.location.href);
        }
    }, []);

    const copiarPortapapeles = async () => {
        try {
            /* Asegurarse de que el código solo se ejecuta en el cliente */
            await navigator.clipboard.writeText(ruta);
            /* Da animación a un mensaje por pantalla, mejor que el alert */
            toast.success(" ¡Enlace copiado al portapapeles!", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "light" // se puede cambiar a "colored" o "dark".
            });
        } catch ( err ) {
            console.error("Error al copiar el enlace", err);
            toast.error(" Error al copiar el enlace");
        }
    };


    return (
       <IconosCompartirLike>
            <Share onClick={copiarPortapapeles}/>
            <CircleCheck />
            <ToastContainer />
        </IconosCompartirLike> 
    );
}