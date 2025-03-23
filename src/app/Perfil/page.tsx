"use client";

import React, { useState } from "react";
import { styled } from "styled-components";
import colors from "../colors";
import data from "../bd.json";
import data2 from "../favoritos.json";
import data3 from "../siguiendo.json";
import GridFavoritas from "../components/GridCancionesFavoritas";
import GridSiguiendo from "../components/GridArtistasSiguiendo";
import GridComponent from "../components/GridNavigContent";
import AlbumReproducer, { Album } from "../components/AlbumReproducer";

import SettingsIcon from "@mui/icons-material/Settings";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PrimaryButton from "../components/PrimaryButton";
import { useRegister } from '../components/RegisterContext';
import { useRouter } from "next/router";
import Link from "next/link";

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

type Artista = {
  id: number;
  artista: string;
  imagen: string;
  oyentes: string;
  descripcion: string;
};

const Fondo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200vh;
  width: 100%;
  overflow: hidden; /* Para evitar que el fondo se desborde */
  z-index: -1; /* Asegura que el fondo esté detrás de los botones */
  /* Fondo estático */
  &::before {
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/graffiti.svg") no-repeat center center;
    background-size: cover;
    z-index: -2; /* Asegura que el fondo esté detrás de los botones */
  }
`;

const ContenedorElementos = styled.div`
  display: flex;
  justify-content: flex-start; /* Alinea los elementos al principio */
  align-items: center;
  width: 80%; /* Asegura que el contenedor ocupe todo el ancho */
  min-height: 100vh; /* Asegura que ocupe toda la altura de la pantalla */
  background: ${colors.tertiary};
  box-shadow: initial;
  border-radius: 30px;
  overflow-x: hidden; /* Evita que los elementos sobresalgan horizontalmente */
  padding: 20px; /* Ajusta los márgenes internos del contenedor */
  position: relative; /* Asegura que todo se alinee dentro del contenedor */
  z-index: -1;
  pointer-events: none; /* Evita que el contenedor reciba eventos de puntero */
`;

const NombreUsuario = styled.h1`
  font-size: 45px;
  font-weight: bold;
  display: inline-flex;
  align-items: flex-start;
  white-space: nowrap;
  position: absolute;
  font-family: "Montserrat", sans-serif;
  z-index: 1; /* Asegura que el nombre esté encima de otros elementos */
  left: 500px;
  top: 150px;
`;

const Descripcion = styled.p`
  font-size: 18px;
  color: ${colors.secondary};
  position: absolute;
  left: 500px;
  top: 225px;
  max-width: 75ch;
  line-height: 1.8;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 400px;
  margin-right: 500px;
  z-index: 1; /* Asegura que los botones estén sobre el fondo */
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

  &::after {
    content: "";
    display: block;
    height: 3px;
    width: 100%;
    background: ${colors.primary};
    position: absolute;
    bottom: 5px; /* Bajarlo un poco para que no quede pegado */
    left: 0;
    transition: transform 0.3s ease-in-out;
    transform: scaleX(${({ $isSelected }) => ($isSelected ? 1 : 0)});
    transform-origin: left;
  }
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10%;
  object-fit: cover;
  position: absolute;
  top: 150px;
  left: 100px;
  border: 5px solid ${colors.primary}; /* Borde de 5px de color primario */
`;

const NavigationButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 100px;
  right: 30px;
`;

const NavigationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${colors.primary};
  color: ${colors.background};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: ${colors.secondary};
  }

  transition: background-color 0.2s;
`;

export default function Perfil() {
  const [selectedButton, setSelectedButton] = useState(0); // Mantener el botón seleccionado
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const { registerRole } = useRegister();

  console.log("Datos recibidos:", data);
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <NavigationButtonsDiv>
        <Link href="/account">
          <NavigationButton>
            {" "}
            <SettingsIcon /> Ajustes
          </NavigationButton>
        </Link>
        <Link href="/dashboard">
          <NavigationButton>
            {" "}
            <ShowChartIcon /> Dashboard{" "}
          </NavigationButton>
        </Link>
      </NavigationButtonsDiv>
      <Fondo />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-6">
        <div className="flex items-center">
          <ProfileImage src="https://i.pinimg.com/originals/7a/e7/c2/7ae7c223b094d4e57b4ea0d3ee519813.jpg" />
          <NombreUsuario>Mercox06</NombreUsuario>
          <Descripcion>
            ¡Hola! Soy Mercox, un amante de la música con un gusto tan ecléctico
            como mi colección de discos. Desde los clásicos hasta lo más
            experimental, siempre estoy buscando nuevos sonidos y artistas para
            explorar. Mi perfil es un reflejo de mi pasión por descubrir música
            que quizás aún no conoces, pero que seguro te va a encantar. Me
            encanta seguir de cerca a nuevos talentos y, por supuesto, nunca
            dejo de escuchar a mis favoritos de siempre. Si te gusta encontrar
            nuevos géneros y artistas frescos, ¡sígueme y comparte tus
            recomendaciones también!
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
        {registerRole === "artista" && (<Link href="uploadAlbum">
          <PrimaryButton text="Subir Álbum" onClick={() => 0} type="button" />
        </Link>)}
      </ButtonContainer>

      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      {/* Mostrar el Grid correspondiente al botón seleccionado */}
      {selectedButton === 0 && (
        <GridFavoritas data={data2 as Cancion[]} /*onAlbumClick={manejadorAlbum}*/ />
      )}
      {selectedButton === 1 && (
        <GridSiguiendo data={data3} /*onAlbumClick={manejadorAlbum}*/ />
      )}
      </div>

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
