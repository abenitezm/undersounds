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
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [songs, setSongs] = useState<{ 
    name: string; 
    file: File;
    album: string;
    commentator?: string;
    comments?: string;
    genre: string;
    trackLength: string;
  }[]>([]);

  const [genres, setGenres] = useState<{ id: string; type: string }[]>([]);

  const handleImageUpload = (file: File) => {
    setImage(file);
  };

  const handleSubmit = async () => {
    if (!name || !artist || !genre ) {
      setMessage({ text: "Por favor completa todos los campos requeridos", type: "error" });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // 1. Subir el álbum primero
      const albumFormData = new FormData();
      albumFormData.append("name", name);
      albumFormData.append("description", description);
      albumFormData.append("price", price);
      albumFormData.append("artist", artist);
      albumFormData.append("genre", genre);
      if (image) {
        albumFormData.append("image", image);
      }

      const albumResponse = await fetch("http://localhost:8000/uploadalbum", {
        method: "POST",
        body: albumFormData,
      });

      if (!albumResponse.ok) {
        throw new Error("Error al subir el álbum");
      }

      const albumResult = await albumResponse.json();
      const albumId = albumResult.id;

      // 2. Subir las canciones asociadas al álbum
      for (const song of songs) {
        const songFormData = new FormData();
        songFormData.append("name", song.name);
        songFormData.append("album", albumId);
        songFormData.append("genre", song.genre || genre);
        songFormData.append("trackLength", song.trackLength || "0");
        if (song.commentator) songFormData.append("commentator", song.commentator);
        if (song.comments) songFormData.append("comments", song.comments);
        songFormData.append("file", song.file);

        const songResponse = await fetch("http://localhost:8000/uploadsong", {
          method: "POST",
          body: songFormData,
        });

        if (!songResponse.ok) {
          throw new Error(`Error al subir la canción: ${song.name}`);
        }
      }

      setMessage({ text: "Álbum y canciones subidos correctamente", type: "success" });
      // Reset form after successful upload
      setName("");
      setDescription("");
      setPrice("");
      setArtist("");
      setGenre("");
      setImage(null);
      setSongs([]);
    } catch (error: any) {
      console.error("Error:", error);
      setMessage({ text: error.message || "Ocurrió un error al subir el álbum", type: "error" });
    } finally {
      setIsLoading(false);
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
        if (data.length > 0) setGenre(data[0].type); // Set default genre
      })
      .catch((err) => {
        console.error("Error cargando géneros:", err);
      });
  }, []);

  return (
    <Container>
      <ColumnaIzquierda style={{ position: "relative" }}>
        <UploadAlbumImage onImageUpload={handleImageUpload} />
        <AddSong 
          onSongsChange={setSongs} 
          genres={genres.map(g => g.type)} 
          defaultGenre={genre}
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
          text={isLoading ? "Subiendo..." : "Publicar"}
          onClick={handleSubmit}
          style={{ 
            position: "absolute", 
            bottom: "0", 
            marginBottom: "20px",
            width: "calc(100% - 40px)"
          }}
          type="button"
          disabled={isLoading}
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
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
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