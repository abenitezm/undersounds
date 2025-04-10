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
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [songs, setSongs] = useState<{ 
    name: string;
    file: File;
  }[]>([]);

  const [genres, setGenres] = useState<{ id: string; type: string }[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState("");

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setArtist("");
    setSelectedGenreId("");
    setImage(null);
    setSongs([]);
  };

  const handleImageUpload = (file: File) => {
    setImage(file);
  };

  const handleSubmit = async () => {
    if (!name || !artist || !selectedGenreId || !image || songs.length === 0) {
      setMessage({ text: "Por favor completa todos los campos requeridos", type: "error" });
      return;
    }

    setMessage({ text: "", type: "" });

    try{
      // PASO 1: Se sube la imagen del álbum
      const imageFormData = new FormData();
      imageFormData.append("file", image);

      const imageResponse = await fetch("http://localhost:8000/upload/albumImage", {
        method: "POST",
        body: imageFormData
      });
      if (!imageResponse.ok) throw new Error("Error al subir la imagen del álbum");
      const { url: imageUrl } = await imageResponse.json();

      // PASO 2: Se suben los datos del álbum en la BD
      const albumResponse = await fetch("http://localhost:8000/upload/albumData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artist,
          description,
          genre: selectedGenreId,
          image : imageUrl,
          name,
          price: parseFloat(price) || 0
        })
      })
      if (!albumResponse.ok) throw new Error("Error al subir los datos del álbum");
      const { id : albumId } = await albumResponse.json();

      // PASO 3: Se suben los ficheros y los datos de cada canción
      for (const song of songs) {
        // PASO 3.1: Archivo MP3
        const fileFormData = new FormData();
        fileFormData.append("file", song.file)

        const fileResponse = await fetch("http://localhost:8000/upload/songFile", {
          method: "POST",
          body: fileFormData
        });
        if (!fileResponse.ok) throw new Error(`Error al subir archivo: ${song.name}`);
        const { file_url } = await fileResponse.json();

        // PASO 3.2: Datos
        const songResponse = await fetch("http://localhost:8000/upload/songData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            album: albumId,
            genre: selectedGenreId,
            name: song.name,
            url: file_url
          })
        })
        if (!songResponse.ok) throw new Error(`Error al registrar canción: ${song.name}`)
      }
      setMessage({ text: "Álbum y canciones subidos exitosamente", type: "success" });
      resetForm();
    }
    catch (error:any) {
      console.error("Error completo:", error);
      setMessage({
        text: error.message || "Error en el proceso de creación",
        type: "error"
      });
    } 
  };

  useEffect(() => {
    fetch("http://localhost:8000/getgenres")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data);
        if(data.length > 0) {
          setSelectedGenreId(data[0].id); //El primero es el predeterminado
        }
      })
  }, []);

  return (
    <Container>
      <ColumnaIzquierda style={{ position: "relative" }}>
        <UploadAlbumImage onImageUpload={handleImageUpload} />
        <AddSong 
          onSongsChange={setSongs} 
        />
        {message.text && (
          <div style={{
            color: message.type === "error" ? "red" : "green",
            margin: "10px 0",
            textAlign: "center"
          }}>
            {message.text}
          </div>
        )}
        <PrimaryButton
          text={"Publicar"}
          onClick={handleSubmit}
          style={{ 
            position: "absolute", 
            bottom: "0", 
            marginBottom: "20px",
            width: "calc(100% - 40px)"
          }}
          type="button"
        />
      </ColumnaIzquierda>
      <ColumnaDerecha>
        <h2 style={{ gridColumn: "span 2", marginBottom: "20px" }}>
          Subir Álbum
        </h2>

        <FormField>
          <Label htmlFor="titulo">Título*</Label>
          <Input 
            id="titulo" 
            type="text" 
            placeholder="Introduce el título del álbum"  
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="precio">Precio (€)</Label>
          <Input 
            id="precio" 
            type="number" 
            placeholder="Introduce el precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
          />
        </FormField>

        <FormField>
          <Label htmlFor="artista">Artista*</Label>
          <Input 
            id="artista" 
            type="text" 
            placeholder="Introduce el nombre del artista" 
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="genero">Género*</Label>
          <Select 
            id="genero" 
            value={selectedGenreId}
            onChange={(e) => {
              const selected = genres.find(g => g.id === e.target.value);
              setSelectedGenreId(e.target.value);
            }}
            required
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.type}>
                {genre.type}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField>
          <Label htmlFor="acercaDelAlbum">Descripción</Label>
          <TextArea
            id="acercaDelAlbum"
            placeholder="Escribe una descripción del álbum"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        <FormField>
          <Label htmlFor="creditos">Créditos</Label>
          <TextArea
            id="creditos"
            placeholder="Escribe los créditos del álbum"
            rows={3}
          />
        </FormField>

        <FormField>
          <Label htmlFor="etiquetas">Etiquetas</Label>
          <Input 
            id="etiquetas" 
            type="text" 
            placeholder="Introduce las etiquetas del álbum" 
          />
        </FormField>
      </ColumnaDerecha>
    </Container>
  );
};

export default UploadAlbumView;