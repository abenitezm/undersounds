import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import {Merch} from "./GridTiendComponent";
import { useRef } from "react";
import { Mesh } from "three";

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
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <MerchImgMesh merch = {merch}/>
      <OrbitControls />
    </Canvas>
  );
};