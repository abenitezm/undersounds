"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Merch from "./Merch";

interface MerchItem {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  stock: number;
  description: string;
  artist: string;
}
const MerchDashboard = ({ id }: { id: string }) => {
  const [merch, setMerch] = useState<MerchItem[] | undefined>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://127.0.0.1:8000/getartistmerch/${id}`);
      const data = await response.json();
      if (data) {
        setMerch(data);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {(merch.length !== 0 || merch !== undefined) && (
        <div>
          <h2 style={{ fontSize: 20 }}>Merch</h2>
          <ArtistMerch>
            {merch.map((item) => (
              <Merch
                id={item.id}
                key={item.id}
                title={item.name}
                description={item.description}
                tipo={item.type}
                price={item.price}
                image={item.image}
                stock={item.stock}
                artist={id}
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
