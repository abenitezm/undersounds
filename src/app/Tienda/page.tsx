'use client';
import React, {useState} from "react";
import { styled } from "styled-components";
import GridTiendContent from "../components/GridTiendComponent";
import colors from "../colors";
import data from "../bd.json";
import MerchImg3D from "../components/3D";
import { Merch } from "../components/GridTiendComponent";


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

const ContenedorElementos = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1260px;
    height: 640px;
    background-color: ${colors.secondary};
    box-shadow: initial;
    color: black;
    border-radius: 30px;
    overflow-x: hidden; //Evita que los elementos sobresalgan
    overflow-y: overlay;
    padding-left: 10px;
`;

const merchData: Merch[] = data
    .filter((item) => item.merch) //Descarto los objetos de data que no tienen merch
    .flatMap((item) => item.merch?.map((merch) => ({ //Mapea cada merch si existe en un nuevo array
        id: merch.id,
        titulo: merch.titulo,
        tipo: merch.tipo,
        precio: merch.precio,
        imagen: merch.imagen,
        artista: merch.artista
    })) || []
);



export default function Tienda(){

    const [selectedMerch, setSelectedMerch] = useState<Merch | undefined>(undefined);

    const manejadorMerch = (merchId : string) => {
        if ( merchId.length !== 0){
            const selectMerch = merchData.find((item) => item.id === merchId)
            setSelectedMerch(selectMerch);
        } else {
            console.log("Indice del merch fuera del rango ");
        }
    };

    return(
        <Fondo>
            <ContenedorElementos> 
                <GridTiendContent data = {merchData} onMerchClick={manejadorMerch} />
                {selectedMerch && <MerchImg3D merch = {selectedMerch}/>} 
            </ContenedorElementos>           
        </Fondo>
    )
};