'use client';

import React, { useState } from "react";
import { styled } from "styled-components";
import colors from "../colors";
import data from "../bd.json";
import data2 from "../favoritos.json"
import GridFavoritas from "../components/GridCancionesFavoritas";
import GridComponent from "../components/GridNavigContent";
import AlbumReproducer, { Album } from "../components/AlbumReproducer";

// Generar albumData a partir de los datos JSON
const albumData: Album[] = data.slice(0, 2).map((cancion) => {
  return {
    idAlbum: cancion.id,
    title: cancion.titulo,
    canciones: cancion.canciones,
    artista: cancion.artista,
    oyentes: cancion.oyentes,
    imagenGrupo: cancion.imagenGrupo,
    descripcion: cancion.descripcion,
  } as Album;
});

type Cancion = {
  id: number;
  titulo: string;
  artista: string;
  imagen: string;
  genre: string;
  oyentes: string;
  imagenGrupo: string;
};

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

const NombreUsuario = styled.h1`
  font-size: 40px;
  font-weight: bold;
  display: inline-flex;
  align-items: flex-start;
  margin-top: 100px;
  white-space: nowrap;
  position: relative;
  right: 120px;
  font-family: 'Montserrat', sans-serif;
`;

const Descripcion = styled.p`
  font-size: 16px;
  color: gray;
  font-family: 'Montserrat', sans-serif;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 350px;
  margin-right: 500px;
`;

const ProfileButton = styled.button<{ $isSelected: boolean }>`
  position: relative;
  display: inline-block;
  background-color: transparent;
  border: 2px solid transparent;
  color: ${colors.secondary};
  font-size: 30px;
  padding: 25px 50px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.3s ease;

  ${({ $isSelected }) =>
    $isSelected &&
    `
    &::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  `}

  &::after {
    content: "";
    display: block;
    height: 3px;
    width: 100%;
    background: ${colors.primary};
    position: absolute;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease-in-out;
  }
`;

export default function Perfil() {
  const [selectedButton, setSelectedButton] = useState(0); // Mantener el botón seleccionado
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  console.log("Datos de favoritos:", data2);


  const toggleSeleccion = (index: number) => {
    setSelectedButton(index); // Cambia el botón seleccionado
  };

  const manejadorAlbum = (albumId: number) => {
    if (albumId >= 0 && albumId < albumData.length) {
      setSelectedAlbum(albumData[albumId]); // Guarda el álbum seleccionado
    } else {
      console.error("Índice del álbum fuera de rango");
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-6">
        <div className="flex items-center">
          <img
            src="https://guitarrasbros.com/public/images/1524763008_14291854_1260760517281787_800363913544828129_n.jpg"
            alt="User Avatar"
            className="rounded-full object-cover absolute top-10 left-10"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "10%",
              objectFit: "cover",
              position: "absolute",
              top: "150px",
              left: "50px",
            }}
          />
          <NombreUsuario>Paquito16</NombreUsuario>
          <Descripcion>
            Esta es una breve descripción sobre el usuario, su música o su
            perfil.
          </Descripcion>
        </div>
      </div>
      {/* Contenedor de los botones */}
      <ButtonContainer>
        <ProfileButton
          onClick={() => toggleSeleccion(0)}
          $isSelected={selectedButton === 0}
        >
          Favoritos
        </ProfileButton>
        <ProfileButton
          onClick={() => toggleSeleccion(1)}
          $isSelected={selectedButton === 1}
        >
          Siguiendo
        </ProfileButton>
        <ProfileButton
          onClick={() => toggleSeleccion(2)}
          $isSelected={selectedButton === 2}
        >
          Compras
        </ProfileButton>
      </ButtonContainer>

      {/* Mostrar el Grid correspondiente al botón seleccionado */}
      {selectedButton === 0 && (
        <GridFavoritas data={data2 as Cancion[]} /*onAlbumClick={manejadorAlbum}*/ />
      )}
      {(selectedButton === 1 || selectedButton === 2) && (
        <GridComponent data={data} onAlbumClick={manejadorAlbum} />
      )}

      {/* Mostrar detalles del álbum seleccionado */}
      {selectedAlbum && (
        <div>
          <h2>{selectedAlbum.title}</h2>
          <p>{selectedAlbum.descripcion}</p>
        </div>
      )}
    </>
  );
}
