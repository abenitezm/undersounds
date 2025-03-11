import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import {Merch} from "./GridTiendComponent";
import { useRef } from "react";
import { Mesh } from "three";
import { Rotate3D } from "lucide-react";
import styled from "styled-components";

const Container3D = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
    height: 640px;
`;

type MerchImageProps = {
    merch ?: Merch;
};

const MerchImgMesh = ({merch} : MerchImageProps) => {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(merch?.imagen ?? "/logo.svg"); // Ruta al logo en /public

  return (
    <mesh ref={meshRef}> 
      <planeGeometry args={[3, 3]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

export default function MerchImg3D({ merch } : MerchImageProps){
  return (
    <Container3D>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MerchImgMesh merch = {merch}/>
        <OrbitControls />
      </Canvas>
      <Rotate3D style = {{marginTop : "-150px", width : "50px", height : "50px"}}/>      
    </Container3D>
  );
};