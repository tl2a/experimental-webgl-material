import {
  AccumulativeShadows,
  Center,
  Float,
  MeshTransmissionMaterial,
  RandomizedLight,
  Text,
  useGLTF,
} from "@react-three/drei";
import React from "react";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";

export default function ModelShapes() {
  const { viewport } = useThree();
  const { nodes } = useGLTF("/shapes/hexagonals.glb");

  return (
    <>
      {/* <Text
        // font={"/fonts/PPNeueMontreal-Bold.otf"}
        position={[0, 0, -10]}
        fontSize={4}
        color="white"
        anchorX="center"
        anchorY="middle"
        dispose={null}
      >
        Glass world!
      </Text> */}
      {/* <Float> */}
      {/* <group scale={viewport.width / 1.5}> */}
      <group position={[0, -1.2, 0]}>
        <Center top>
          {nodes.Scene.children.map((mesh, i) => {
            return <Mesh data={mesh} key={i} />;
          })}
        </Center>
        <AccumulativeShadows
          temporal
          frames={100}
          alphaTest={0.9}
          color="#3ead5d"
          colorBlend={1}
          opacity={0.8}
          scale={20}
        >
          <RandomizedLight
            radius={10}
            ambient={0.5}
            intensity={Math.PI}
            position={[2.5, 8, -2.5]}
            bias={0.001}
          />
        </AccumulativeShadows>
      </group>
      {/* </Float> */}
    </>
  );
}

function Mesh({ data }) {
  const materialProps = useControls({
    thickness: { value: 2.65, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.09, min: 0, max: 1 },
    backside: { value: true },
  });

  return (
    <mesh {...data}>
      <MeshTransmissionMaterial {...materialProps} />
      {/* <MeshBasicMaterial /> */}
    </mesh>
  );
}
