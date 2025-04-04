import React, { useState } from 'react';
import styled from 'styled-components';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import colors from '../../app/colors';

const UploadBox = styled.label`
  width: 200px;
  height: 200px;
  background-color: ${colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  font-size: 16px;
  color: ${colors.tertiary};
  text-align: center;
  background-size: cover;
  background-position: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadAlbumImage = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <UploadBox style={{ backgroundImage: image ? `url(${image})` : "none" }}>
      {!image && <CameraAltIcon style={{ fontSize: 50 }} />}
      {!image && <span>Subir</span>}
      <HiddenInput type="file" accept="image/*" onChange={handleImageUpload} />
    </UploadBox>
  );
};

export default UploadAlbumImage;