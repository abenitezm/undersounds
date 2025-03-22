'use client'
import React from 'react';
import colors from "../colors";
import { styled } from 'styled-components';
import UploadAlbumImage from '../components/UploadAlbumImage';
import AddSong from '../components/AddSong';
import PrimaryButton from '../components/PrimaryButton';

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

export default function Page() {
    return (
        <Container>
            <ColumnaIzquierda style={{position: "relative"}}>
                <UploadAlbumImage />
                <AddSong />
                <PrimaryButton text="Publicar" onClick={() => alert("Álbum publicado")}
                style={{ position: "absolute", bottom: "0", marginBottom: "20px" }} type={'button'}/>
            </ColumnaIzquierda>
            <ColumnaDerecha>
                <h2 style={{ gridColumn: 'span 2', marginBottom: '20px' }}>Subir Álbum</h2>

                {/* Título */}
                <FormField>
                    <Label htmlFor="titulo">Título</Label>
                    <Input id="titulo" type="text" placeholder="Introduce el título del álbum" />
                </FormField>

                {/* Fecha de lanzamiento */}
                <FormField>
                    <Label htmlFor="fechaLanzamiento">Fecha de lanzamiento</Label>
                    <Input id="fechaLanzamiento" type="date" />
                </FormField>

                {/* Precio */}
                <FormField>
                    <Label htmlFor="precio">Precio (€)</Label>
                    <Input id="precio" type="number" placeholder="Introduce el precio" />
                </FormField>

                {/* Artista */}
                <FormField>
                    <Label htmlFor="artista">Artista</Label>
                    <Input id="artista" type="text" placeholder="Introduce el nombre del artista" />
                </FormField>

                {/* Género */}
                <FormField>
                    <Label htmlFor="genero">Género</Label>
                    <Select id="genero">
                        <option value="">Selecciona un género</option>
                        <option value="pop">Pop</option>
                        <option value="rock">Rock</option>
                        <option value="jazz">Jazz</option>
                        <option value="hiphop">Hip Hop</option>
                        <option value="electronic">Electrónica</option>
                        <option value="classical">Clásica</option>
                    </Select>
                </FormField>

                {/* Acerca del álbum */}
                <FormField>
                    <Label htmlFor="acercaDelAlbum">Acerca del álbum</Label>
                    <TextArea id="acercaDelAlbum" placeholder="Escribe una descripción del álbum" rows="4" />
                </FormField>

                {/* Créditos */}
                <FormField>
                    <Label htmlFor="creditos">Créditos</Label>
                    <TextArea id="creditos" placeholder="Escribe los créditos del álbum" rows="3" />
                </FormField>

                {/* Etiquetas */}
                <FormField>
                    <Label htmlFor="etiquetas">Etiquetas</Label>
                    <Input id="etiquetas" type="text" placeholder="Introduce las etiquetas del álbum" />
                </FormField>
            </ColumnaDerecha>
        </Container>
    )
}