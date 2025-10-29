import React, { useRef } from "react";
import { useControls } from "leva";
import { fragment, vertex } from "./shaders/Shader";
import { fragment2, vertex2 } from "./shaders/Shader2";
import { useFrame } from "@react-three/fiber";

export default function Model({ scrollProgress }) {
  const material = useRef();
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
    if (material.current) {
      material.current.material.uniforms.uTime.value =
        clock.getElapsedTime() * 4;
      material.current.material.uniforms.uAmplitude.value = amplitude;
      material.current.material.uniforms.uWaveLength.value = waveLength;
    }
  });

  return (
    <>
      <points ref={material}>
        <planeGeometry args={[4, 4, 15, 15]} />
        <shaderMaterial
          // wireframe={true}
          fragmentShader={fragment}
          vertexShader={vertex}
          uniforms={uniforms.current}
        />
      </points>
      <mesh ref={material}>
        <planeGeometry args={[4, 4, 15, 15]} />
        <shaderMaterial
          wireframe={true}
          wireframeLinewidth={2.0}
          fragmentShader={fragment2}
          vertexShader={vertex2}
          uniforms={uniforms.current}
        />
      </mesh>
    </>
  );
}
