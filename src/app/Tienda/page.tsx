"use client";
import TiendaView from "@/views/TiendaView";
import data from "../../assets/bd.json";
import { Merch } from "../../views/components/GridTiendComponent";
import React, { useEffect, useState } from "react";


  

export default function Tienda() {
  const [merchData, setMerchData] = useState<Merch[]>([]); // Estado para almacenar los datos de mercancía
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error, por si algo falla

  useEffect(() => {
    // Realizamos el fetch a la API de backend
    const fetchMerchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/getmerch"); // Ajusta la URL al endpoint de tu backend
        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.statusText}`);
        }
        const data = JSON.parse(await response.json()); // Suponiendo que el backend devuelve JSON

        // Verifica qué contiene la respuesta
        console.log("Respuesta de la API:", data);

        // Verifica si 'data' es un array
        if (Array.isArray(data)) {
          // Filtrar y mapear los datos si 'data' es un array
          const mappedData: Merch[] = data
            .filter((item: any) => item.merch) // Filtra los artículos que tienen merch
            .flatMap((item: any) =>
              item.merch?.map((merch: any) => ({
                // Mapea los datos a la estructura que necesitas
                id: merch.id,
                titulo: merch.name, // Adaptado a los campos del backend
                tipo: merch.type,
                precio: merch.price,
                imagen: `localDB${merch.image}`,
                artista: merch.artist,
              })) || []
            );

          setMerchData(data); // Actualiza el estado con los datos procesados
        } else {
          throw new Error("Los datos no son un array.");
        }
        
        setLoading(false); // Termina la carga
      } catch (error: any) {
        console.error("Error al obtener datos del backend:", error);
        setError("Hubo un error al cargar los datos de mercancía.");
        setLoading(false); // Termina la carga, aunque haya error
      }
    };

    fetchMerchData();
  }, []); // Solo se ejecuta cuando el componente se monta
  return <TiendaView merchData={merchData} />;
}
