import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import colors from '../colors';

const AddSong: React.FC = () => {
  const [songs, setSongs] = useState<string[]>([]);
  const [newSong, setNewSong] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAddSongClick = () => {
    setIsAdding(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSong(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newSong.trim()) {
      setSongs([...songs, newSong]);
      setNewSong('');
      setIsAdding(false);
    }
  };

  return (
    <Container>
      <div>
        <SongList>
            {songs.map((song, index) => (
            <SongItem key={index}>{song}</SongItem>
            ))}
        </SongList>

        {isAdding ? (
          <SongInput
            type="text"
            value={newSong}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Escribe el nombre de la canción..."
            autoFocus
          />
        ) : (
          <AddButton onClick={handleAddSongClick} style={{marginTop: "10px"}}>
            <AddIcon /> Añadir canción
          </AddButton>
        )}
      </div>

    </Container>
  );
};

export default AddSong;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AddButton = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  color: ${colors.primary};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SongInput = styled.input`
  padding: 8px;
  font-size: 14px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
`;

const SongList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const SongItem = styled.div`
  margin: 5px 0;
`;