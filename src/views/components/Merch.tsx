import Image from "next/image";
import styled from "styled-components";
import colors from "../../app/colors";

const Merch = ({
  id, title, description, tipo, price, image, stock, artist
}: {
  title: string;
  tipo: string;
  price: number;
  image: string;
}) => {
  return (
    <MerchContainer>
      <MerchInfo>
        <MerchTitle>{title}</MerchTitle>
        <MerchType>{tipo}</MerchType>
        <MerchPrice>{price}</MerchPrice>
      </MerchInfo>
      <Image
        src={`/localDB${image}`}
        style={{
          objectFit: "contain",
          borderRadius: 10,
        }}
        layout="fill"
        alt="merch"
      />
    </MerchContainer>
  );
};

const MerchContainer = styled.div`
  display: flex;
  aspect-ratio: 1 / 1;
  position: relative;
  flex-direction: column;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.1s linear;
  background-color: ${colors.tertiary};
  border: 2px solid transparent;
  &:hover {
    border: 2px solid ${colors.primary};
`;

const MerchInfo = styled.div`
  position: relative;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: rgba(0, 0, 0, 0.65); /* Fondo translúcido */
  transition: opacity 0.2s ease-in-out;
  padding: 10px;
  opacity: 0;

  ${MerchContainer}:hover & {
    opacity: 1;
  }
`;

const MerchTitle = styled.h3`
  font-size: 1rem;
  width: 90%;
  padding-top: 10px;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MerchType = styled.p`
  font-size: 0.7rem;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${colors.primary};
  opacity: 0.8;
  margin-top: 5px;
  font-weight: bold;
`;

const MerchPrice = styled.p`
  position: absolute;
  font-size: 0.7rem;
  padding: 5px 10px;
  border-radius: 7px;
  right: 5px;
  top: 5px;
  background-color: ${colors.background};
`;

export default Merch;
