import styled from "styled-components";
import colors from "../../app/colors";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type Cancion = {
  id: number;
  titulo: string;
  url: string;
  image: string;
  time: string;
};

const AlbumSongs = ({ canciones }: { canciones: Cancion[] }) => {
  return (
    <div>
      {canciones.map((cancion, index) => (
        <>
          {index !== 0 && <SongSeparator key={0} />}
          <Song key={cancion.id}>
            <div style={{ display: "flex", gap: 20 }}>
              <SongIndex>{index + 1}</SongIndex>
              <SongPlayButton>
                <PlayArrowIcon />
              </SongPlayButton>
              <div>{cancion.titulo}</div>
            </div>
            <div>{cancion.time}</div>
          </Song>
        </>
      ))}
    </div>
  );
};

const Song = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.tertiary};
  }
`;

const SongSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.tertiary};
`;

const SongIndex = styled.div`
  font-size: 1rem;
  margin-right: 10px;
  width: 1ch;
`;

const SongPlayButton = styled.div`
  margin: 0;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  opacity: 0;
  ${Song}:hover & {
    opacity: 1;
  }
`;

export default AlbumSongs;
