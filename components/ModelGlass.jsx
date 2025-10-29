import React, { useRef } from "react";
import { useGLTF, Text, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { fragment2, vertex2 } from "./shaders/Shader2";

export default function ModelGlass() {
  // const { nodes } = useGLTF("/medias/torrus.glb");
  const { viewport } = useThree();
  // const torus = useRef(null);
  const icosphere = useRef(null);
  const material = useRef();

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
    amplitude: { value: 0.25, min: 0, max: 2, step: 0.1 },
    waveLength: { value: 1, min: 0, max: 20, step: 0.5 },
  });
  const { amplitude, waveLength } = useControls({
    amplitude: { value: 0.25, min: 0, max: 2, step: 0.1 },
    waveLength: { value: 1, min: 0, max: 20, step: 0.5 },
  });

  const uniforms = useRef({
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
  });

  useFrame(({ clock }) => {
    icosphere.current.rotation.x += 0.02;

    if (material.current) {
      material.current.material.uniforms.uTime.value =
        clock.getElapsedTime() * 4;
      material.current.material.uniforms.uAmplitude.value = amplitude;
      material.current.material.uniforms.uWaveLength.value = waveLength;
    }
  });

  return (
    <group scale={viewport.width / 3.75}>
      {/* <Text
        // font={"/fonts/PPNeueMontreal-Bold.otf"}
        position={[0, 0, -1]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        dispose={null}
      >
        hello world!
      </Text> */}
      <mesh ref={material} position={[0, 0, -1]}>
        <planeGeometry args={[4, 4, 15, 15]} />
        <shaderMaterial
          fragmentShader={fragment2}
          vertexShader={vertex2}
          uniforms={uniforms.current}
        />
      </mesh>
      <mesh ref={icosphere}>
        <icosahedronGeometry radius={10} />
        <MeshTransmissionMaterial {...materialProps} />
        {/* <meshBasicMaterial/> */}
      </mesh>
    </group>
  );
}
