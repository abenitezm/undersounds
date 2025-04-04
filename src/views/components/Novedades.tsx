import React from 'react';
import styled from 'styled-components';
import Albums from "../../assets/bd.json"
import colors from '../../app/colors';
import { Album } from './Album';

const Novedades = () => {
  return (
        <Container>
        <TextContainer>
            <h2>Novedades</h2>
            <p>Descubre los álbumes más recientes de tus artistas favoritos. ¡No te pierdas lo último!</p>
        </TextContainer>
        <Grid>
            {Albums && Albums.slice(0, 6).map(album => (
            <AlbumCardWrapper key={album.id}>
                <Album
                    key={album.id}
                    name={album.titulo}
                    image={album.imagen}
                    genre={album.genre}
                    price="0.00"
                    year="2021"
                />
            </AlbumCardWrapper>
            ))}
        </Grid>
        </Container>
  );
};

export default Novedades;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-stat;
  padding: 40px;
  max-width: 1224px;
`;

const TextContainer = styled.div`
  width: 50%;
  text-align: left;
  padding-right: 60px;
  h2 {
    color: ${colors.primary};
    font-size: 3rem;
    margin-bottom: 30px;
  }
  p {
    font-size: 2rem;
    color: ${colors.secondary};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-self: flex-end;
  gap: 15px;
  width: 50%;
`;

const AlbumCardWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;
