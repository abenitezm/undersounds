import TiendaView from "@/views/TiendaView";
import data from "../../assets/bd.json";
import { Merch } from "../../views/components/GridTiendComponent";

const merchData: Merch[] = data
  .filter((item) => item.merch) //Descarto los objetos de data que no tienen merch
  .flatMap(
    (item) =>
      item.merch?.map((merch) => ({
        //Mapea cada merch si existe en un nuevo array
        id: merch.id,
        titulo: merch.titulo,
        tipo: merch.tipo,
        precio: merch.price,
        imagen: merch.imagen,
        artista: merch.artista,
      })) || []
  );

export default function Tienda() {
  return <TiendaView merchData={merchData} />;
}
