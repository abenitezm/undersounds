'use client';
import React, {useState} from "react";
import { styled } from "styled-components";
import GridTiendContent from "../../views/components/GridTiendComponent";
import colors from "../colors";
import data from "../../assets/bd.json";
import MerchImg3D from "../../views/components/3D";
import { Merch } from "../../views/components/GridTiendComponent";

const Fondo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/graffiti.svg") no-repeat center center;
    background-size: cover;
    opacity: 1;
    z-index: -1;
  }
`;

const ContenedorElementos = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1260px;
    height: 640px;
    background: ${colors.tertiary};
    //background: linear-gradient(135deg, rgba(204, 163, 65, 0.9), rgba(218, 94, 85, 0.9));
    box-shadow: initial;
    color: black;
    border-radius: 30px;
    overflow-x: hidden; //Evita que los elementos sobresalgan
    overflow-y: overlay;
    padding-left: 10px;
`;

const TituloView = styled.h1`
    font-size: 46px;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 15px;
    white-space: nowrap;
`;

const Logo = styled.img`
    height: 34px;
    width: auto;
    vertical-align: middle;
`;

const merchData: Merch[] = data
    .filter((item) => item.merch) //Descarto los objetos de data que no tienen merch
    .flatMap((item) => item.merch?.map((merch) => ({ //Mapea cada merch si existe en un nuevo array
        id: merch.id,
        titulo: merch.titulo,
        tipo: merch.tipo,
        precio: merch.price,
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
            <TituloView>
                TIENDA DE <Logo src = "./longLogo.svg" alt = "Logo Undersounds" />
            </TituloView>
            <ContenedorElementos> 
                <GridTiendContent data = {merchData} onMerchClick={manejadorMerch} />
                {selectedMerch && <MerchImg3D merch = {selectedMerch}/>} 
            </ContenedorElementos>
        </Fondo>
    )
};