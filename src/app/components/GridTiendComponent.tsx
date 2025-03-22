"use client";

import React from "react";
import { styled, keyframes } from "styled-components";
import colors from "../colors";
import Link from "next/link";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PrimaryButton from "./PrimaryButton";
import ShopValidator from "../components/ShopValidator";
import { useAuth } from "../components/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useShoppingCart } from "./ShoppingCartContext";
import { animacionEntrada } from "../components/ShopValidator";
import PaidIcon from "@mui/icons-material/Paid";

const GridContainer = styled.div<{ $expandir : boolean}>`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    justify-content: start;
    justify-items: start;
    margin-left: 0;
    width: 90%;
    height: ${({ $expandir }) => ($expandir ? "90%" : "90%")};
    overflow-y: ${({ $expandir }) => ($expandir ? "auto" : "visible")};
    padding-right: 10px;
    overflow-x: visible;
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const GridItem = styled.div`
    background-color: ${colors.primary};
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: all 0.3s ease;
    animation: ${fadeIn} 0.5s ease; /* Animación de entrada */
    cursor: pointer;

    &:hover {
        transform: scale(1.01);
        background-color: ${colors.secondary};
        color: black;
    }
`;

const ArtistName = styled.p`
    font-size: 14px;
    color: ${colors.tertiary};

  &:hover {
    text-decoration-line: underline;
  }
`;

const Title = styled.h2`
  font-size: 14px;
  margin: 10px 0;
`;

const Tipo = styled.h3`
    font-size: 14px;
    margin: 10px 0;
    color: ${colors.tertiary};

`;

const Precio = styled.h3`
    font-size: 14px;
    margin: 10px 0;
    color: ${colors.tertiary};

`;

const Column = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 0px;
  width: 100%;
  margin-top: 10px;
  align-items: center;
`;

const MerchImg = styled.img`
  width: 187px;
  height: 187px;
  border-radius: 10px;
  object-fit: cotain; //Ajusta la imagen dentro del espacio sin deformarla
`;

const BuyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${colors.background};
  color: ${colors.secondary};
  border: none;
  padding: 5px 8px;
  margin-left: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
`;

const DeployRestrictiveBackground = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px); // Agrega un desenfoque al fondo
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 103;
`;

const DeployContent = styled.div`
    background: ${colors.background};
    color: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
    animation: ${animacionEntrada} 0.3s ease-in-out;
    position: relative;
    max-width: 700px;
    height: 50vh;
    width: 90%;
    text-align: center;
    margin-bottom: 10px;
    z-index: 104;
`;

const BotonCerrar = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: ${colors.background};
  color: ${colors.secondary};
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: ${colors.primary};
  }
`;

type GridComponentProps = {
  data: any[]; //Datos recibidos
  onMerchClick: (merchId: string) => void;
};

export type Merch = {
  id: string;
  titulo: string;
  tipo: string;
  precio: number;
  imagen: string;
  artista: string;
};

export default function GridContent({
  data,
  onMerchClick,
}: GridComponentProps) {
  const [expandir, setExpandir] = useState(false);
  const [validacionTienda, setValidacionTienda] = useState(false);
  const [imagenMerch, setImagenMerch] = useState("");
  const { userRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const enseñarMasContenido = expandir ? data : data.slice(0, 6);

   const { addToCart } = useShoppingCart();

  const manejadorElementoMerch = (merchId: string) => {
    onMerchClick(merchId);
  };

  const manejadorImagen = (imagen: any) => {
    setImagenMerch(imagen);
  };

    const manejadorValidador = () => {
        if ( userRole !== "invitado"){
            setValidacionTienda(!validacionTienda);
        } else {
            toast.warn("¡Ciudado!, debes de iniciar sesión", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "light"
            });
        }
    }

  return (
    /* Cargamos el contenedor donde almacenaremos los productos */
    <GridContainer $expandir={expandir}>
      {/* Recorremos los datos del JSON para mostrar su contenido de una manera bonita visualmente*/}
      {enseñarMasContenido.map((elemento: any) => (
        <GridItem
          key={elemento.id}
          onClick={() => {
            manejadorElementoMerch(elemento.id);
            manejadorImagen(elemento);
          }}
        >
          <MerchImg src={elemento.imagen} alt={elemento.titulo} />
          <Title>{elemento.titulo}</Title>
          <Tipo>{elemento.tipo}</Tipo>
          <ArtistName>
            <Link href={`/artist/${elemento.id}`}>{elemento.artista}</Link>
          </ArtistName>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "0px",
              width: "100%",
            }}
          >
            <Precio>${elemento.precio}</Precio>
            <Column>
                <BuyButton
                  onClick={() => {
                    addToCart({
                      id: elemento.id || "",
                      name: elemento.titulo || "",
                      image: elemento.imagen || "",
                      price: parseFloat(elemento.precio || "0.00"),
                      quantity: 1,
                    });
                  }}
                >
                <ShoppingCartIcon />
                Añadir al carrito
              </BuyButton>
              <BuyButton
                onClick={() => {
                  manejadorValidador();
                  if (userRole === "invitado") {
                    setIsOpen(true);
                    <ToastContainer />;
                  }
                }}
              >
                <PaidIcon />
                Comprar en 1 click
              </BuyButton>
            </Column>
          </span>
        </GridItem>
      ))}
      {!validacionTienda && (
        <DeployRestrictiveBackground $isOpen={isOpen}>
          <DeployContent>
            <ToastContainer />
            <h2 style={{ padding: "50px" }}>
              Debes iniciar sesión para acceder a este contenido
            </h2>
            <BotonCerrar onClick={() => setIsOpen(false)}>✖</BotonCerrar>
            <Link href="/login">
              <PrimaryButton
                text="Iniciar Sesión"
                onClick={() => {}}
                style={{ textAlign: "center" }}
                type="button"
              />
            </Link>
          </DeployContent>
        </DeployRestrictiveBackground>
      )}
      {validacionTienda && (
        <ShopValidator
          isOpen={validacionTienda}
          onClose={manejadorValidador}
          imagen={imagenMerch}
        />
      )}
      <PrimaryButton
        onClick={() => setExpandir(!expandir)}
        text={expandir ? "Ver menos resultados" : "Ver más resultados"}
        type="button"
      ></PrimaryButton>
    </GridContainer>
  );
}
