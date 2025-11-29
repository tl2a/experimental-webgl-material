import * as THREE from "three";
import {
  MeshTransmissionMaterial,
  useGLTF,
  AccumulativeShadows,
  RandomizedLight,
  Center,
} from "@react-three/drei";
import { useControls } from "leva";
import TextAttached from "./TextAttached";

export default function ModelCustom() {
  return (
    <group position={[0, -0.2, 0]}>
      <Center top>
        <GelatinousCube />
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
  );
}

export function GelatinousCube(props) {
  const config = useControls({
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    anopheles: false,
    samples: { value: 10, min: 1, max: 32, step: 1 },
    resolution: { value: 2048, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.21, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.15, min: 0, max: 1 },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: "#d5d5d5", // "#ffffff",
    color: "#ff9999", // "#c9ffa1",
    bg: "#968181", // "#839681",
  });
  const { nodes, materials } = useGLTF("/shapes/experiemental.glb");

  return (
    <group dispose={null}>
      <mesh geometry={nodes.Icosphere.geometry}>
        <TextAttached />
        {config.meshPhysicalMaterial ? (
          <meshPhysicalMaterial {...config} />
        ) : (
          <MeshTransmissionMaterial
            background={new THREE.Color(config.bg)}
            {...config}
          />
        )}
      </mesh>
      {/* {config.cube ? <mesh geometry={nodes.Cube.geometry} material={materials.cube_mat} /> : null} */}
      {config.anopheles ? (
        <group dispose={null}>
          <mesh
            geometry={nodes.AnophelesBody.geometry}
            material={materials.BODY_MOSQUITO}
          />
          <mesh
            geometry={nodes.AnophelesEyes.geometry}
            material={materials.EYES_MOSQUITO}
          />
          <mesh
            geometry={nodes.AnophelesWings.geometry}
            material={materials.WINGS}
          />
        </group>
      ) : (
        <mesh geometry={nodes.Skull.geometry} material={materials.skull} />
      )}
    </group>
  );
}
