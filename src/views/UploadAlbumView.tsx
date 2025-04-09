"use client";
import React, { useEffect, useState } from "react";
import colors from "../app/colors";
import { styled } from "styled-components";
import UploadAlbumImage from "../views/components/UploadAlbumImage";
import AddSong from "../views/components/AddSong";
import PrimaryButton from "../views/components/PrimaryButton";

const Container = styled.div`
  display: flex;
  height: 80vh;
  padding: 20px;
`;

const ColumnaIzquierda = styled.div`
  flex: 0 0 30%;
  margin-right: 20px;
  background-color: ${colors.tertiary};
  padding: 20px;
  border-radius: 15px;
`;

const ColumnaDerecha = styled.div`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: ${colors.secondary};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid ${colors.primary};
  border-radius: 8px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid ${colors.primary};
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid ${colors.primary};
  border-radius: 8px;
  font-size: 16px;
`;

const UploadAlbumView = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [artist, setArtist] = useState("");

  const [songs, setSongs] = useState<{ name: string; file?: File }[]>([]);

  const [genres, setGenres] = useState<{ id: string; type: string }[]>([]);

  const handleSubmit = async () => {
    const albumData = {
      name: name,
      description: description,
      image: "",
      price: parseFloat(price),
      media: [],
      artist: artist
    };

    try {
      const response = await fetch("http://localhost:8000/uploadalbum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(albumData),
      });

      if (!response.ok) {
        throw new Error("Error al subir el álbum");
      }

      const data = await response.json();
      console.log("Álbum subido:", data);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/getgenres")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return res.json();
      })
      .then((data) => {
        setGenres(data);
      })
      .catch((err) => {
        console.error("Error cargando géneros:", err);
      });
  }, []);

  return (
    <Container>
      <ColumnaIzquierda style={{ position: "relative" }}>
        <UploadAlbumImage />
        <AddSong onSongsChange={setSongs} />
        <PrimaryButton
          text="Publicar"
          onClick={handleSubmit}
          style={{ position: "absolute", bottom: "0", marginBottom: "20px" }}
          type={"button"}
        />
      </ColumnaIzquierda>
      <ColumnaDerecha>
        <h2 style={{ gridColumn: "span 2", marginBottom: "20px" }}>
          Subir Álbum
        </h2>

        <FormField>
          <Label htmlFor="titulo">Título</Label>
          <Input id="titulo" type="text" placeholder="Introduce el título del álbum"  
            onChange={(e) => setName(e.target.value)}/>
        </FormField>

        <FormField>
          <Label htmlFor="precio">Precio (€)</Label>
          <Input id="precio" type="number" placeholder="Introduce el precio"
            onChange={(e) => setPrice(e.target.value)} />
        </FormField>

        <FormField>
          <Label htmlFor="artista">Artista</Label>
          <Input id="artista" type="text" placeholder="Introduce el nombre del artista" />
        </FormField>

        <FormField>
          <Label htmlFor="genero">Género</Label>
          <Select id="genero">
            {genres.map((genre) => (
              <option key={genre.id} value={genre.type}>
                {genre.type}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField>
          <Label htmlFor="acercaDelAlbum">Acerca del álbum</Label>
          <TextArea
            id="acercaDelAlbum"
            placeholder="Escribe una descripción del álbum"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        {/* Créditos */}
        <FormField>
          <Label htmlFor="creditos">Créditos</Label>
          <TextArea
            id="creditos"
            placeholder="Escribe los créditos del álbum"
            rows={3}
          />
        </FormField>

        {/* Etiquetas */}
        <FormField>
          <Label htmlFor="etiquetas">Etiquetas</Label>
          <Input id="etiquetas" type="text" placeholder="Introduce las etiquetas del álbum" />
        </FormField>
      </ColumnaDerecha>
    </Container>
  );
};

export default UploadAlbumView;