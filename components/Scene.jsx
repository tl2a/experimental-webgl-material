import { Canvas } from "@react-three/fiber";
import React from "react";
// import Model from "./Model";
// import ModelGlass from "./ModelGlass";
// import ModelShapes from "./ModelShapes";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import ModelCustom from "./ModelCustom";

export default function Scene() {
  return (
    <Canvas
      style={{ background: "#333333" }}
      gl={{ preserveDrawingBuffer: true }}
      // camera={{ position: [-1, -1, -4] }}
      shadows
      camera={{ position: [8, 0, -2], fov: 10 }}
    >
      <OrbitControls
        // minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        enablePan={false}
        // enableZoom={false}
        autoRotate
        autoRotateSpeed={0.05}
        makeDefault
      />

      {/* <Model /> */}
      {/* <ModelGlass /> */}
      {/* <ModelShapes /> */}
      <ModelCustom />
      <ContactShadows
        frames={1}
        position={[0, -0.3, 0]}
        scale={8}
        opacity={0.2}
        far={2}
        blur={2}
      />

      <directionalLight intensity={2} position={[0, 2, 3]} />
      <ambientLight intensity={Math.PI} />
      {/* <Environment preset="city" /> */}
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
        background
        backgroundBlurriness={1}
      />
    </Canvas>
  );
}
