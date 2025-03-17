"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import getArtistMerch from "../utils/getArtistMerch";
import Merch from "./Merch";

interface MerchItem {
  id: string;
  titulo: string;
  tipo: string;
  precio: number;
  imagen: string;
}
const MerchDashboard = ({ id }: { id: string }) => {
  const [merch, setMerch] = useState<MerchItem[] | undefined>([]);

  useEffect(() => {
    const data = getArtistMerch(id);
    setMerch(data);
  }, []);

  return (
    <div>
      {merch && (
        <div>
          <h2 style={{ fontSize: 20 }}>Merch</h2>
          <ArtistMerch>
            {merch.map((item) => (
              <Merch
                key={item.id}
                title={item.titulo}
                tipo={item.tipo}
                price={item.precio}
                image={item.imagen}
              />
            ))}
          </ArtistMerch>
        </div>
      )}
    </div>
  );
};

const ArtistMerch = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;

export default MerchDashboard;
