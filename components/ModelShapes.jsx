import {
  AccumulativeShadows,
  Center,
  Float,
  MeshTransmissionMaterial,
  Outlines,
  RandomizedLight,
  Text,
  useGLTF,
} from "@react-three/drei";
import React from "react";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { AdditiveBlending, BackSide, Color, DoubleSide, Vector3 } from "three";

export default function ModelShapes() {
  const { viewport } = useThree();
  const { nodes } = useGLTF("/shapes/hand-jar.glb");

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
      <group position={[0, -2.2, 0]}>
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
  const outlineScale = 1.01; // smaller scale to avoid large filled areas
  const outlineThreshold = 0.1; // tweak to control thickness
  const { name, geometry, position, rotation, scale } = data;
  return (
    <>
    <Text
        // font={"/fonts/PPNeueMontreal-Bold.otf"}
        position={[2.5, 2, 0]}
        fontSize={0.4}
        color="#F04E2E"
        anchorX="center"
        anchorY="middle"
        dispose={null}
      >
        The Thing
      </Text>
      {name === "Sphere" ? (
        <>
          <group position={position} rotation={rotation} scale={scale}>
            {/* invisible depth-only mesh: writes depth but not color */}
            <mesh geometry={geometry} renderOrder={1}>
              <meshStandardMaterial
                // do not write color (so it's invisible) but do write depth
                color="#F04E2E"
                colorWrite={false}
                transparent={true}
                opacity={0.0}
                depthWrite={true}
                side={DoubleSide}
              />
            </mesh>

            {/* shader-based silhouette: draw only rim (no filled interior) */}
            <mesh
              geometry={geometry}
              scale={[outlineScale, outlineScale, outlineScale]}
              renderOrder={2}
            >
              <shaderMaterial
                side={BackSide}
                depthWrite={false}
                depthTest={true}
                polygonOffset={true}
                polygonOffsetFactor={1}
                polygonOffsetUnits={1}
                uniforms={{
                  uColor: { value: new Color(0xF04E2E) },
                  uThreshold: { value: outlineThreshold },
                }}
                vertexShader={`
                  varying vec3 vNormal;
                  varying vec3 vViewDir;
                  void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    vViewDir = -mvPosition.xyz;
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * mvPosition;
                  }
                `}
                fragmentShader={`
                  precision mediump float;
                  varying vec3 vNormal;
                  varying vec3 vViewDir;
                  uniform vec3 uColor;
                  uniform float uThreshold;
                  void main() {
                    float d = abs(dot(normalize(vNormal), normalize(vViewDir)));
                    // keep only near-edge fragments (silhouette)
                    if (d > uThreshold) discard;
                    gl_FragColor = vec4(uColor, 1.0);
                  }
                `}
              />
            </mesh>

            {/* specular-only pass: additive highlights only, no fill */}
            <mesh
              geometry={geometry}
              scale={[outlineScale, outlineScale, outlineScale]}
              renderOrder={3}
            >
              <shaderMaterial
                blending={AdditiveBlending}
                transparent={true}
                depthWrite={false}
                depthTest={true}
                polygonOffset={true}
                polygonOffsetFactor={1}
                polygonOffsetUnits={1}
                uniforms={{
                  uSpecColor: { value: new Color(0xF04E2E) }, // highlight color
                  uShininess: { value: 30.0 }, // glossiness
                  uSpecIntensity: { value: 1.2 }, // boost highlight brightness
                  uThreshold: { value: 0.02 }, // cutoff to avoid filling
                  uLightPos: { value: new Vector3(-2.5, 3, -2.5) }, // world-space light
                }}
                vertexShader={`
                  varying vec3 vNormal;
                  varying vec3 vViewDir;
                  varying vec3 vWorldPos;
                  void main() {
                    vec4 worldPos = modelMatrix * vec4(position, 1.0);
                    vWorldPos = worldPos.xyz;
                    vNormal = normalize(mat3(modelMatrix) * normal);
                    vViewDir = normalize(cameraPosition - vWorldPos);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                  }
                `}
                fragmentShader={`
                  precision mediump float;
                  varying vec3 vNormal;
                  varying vec3 vViewDir;
                  varying vec3 vWorldPos;
                  uniform vec3 uSpecColor;
                  uniform float uShininess;
                  uniform float uSpecIntensity;
                  uniform float uThreshold;
                  uniform vec3 uLightPos;
                  void main() {
                    vec3 N = normalize(vNormal);
                    vec3 L = normalize(uLightPos - vWorldPos);
                    vec3 V = normalize(vViewDir);
                    vec3 H = normalize(L + V);
                    float spec = pow(max(dot(N, H), 0.0), uShininess);
                    // discard low spec values so only bright highlights draw (no fill)
                    if (spec < uThreshold) discard;
                    vec3 color = uSpecColor * spec * uSpecIntensity;
                    gl_FragColor = vec4(color, spec); // alpha proportional to spec
                  }
                `}
              />
            </mesh>
          </group>
        </>
      ) : (
        <mesh {...data}>
          {/* <MeshTransmissionMaterial {...materialProps} /> */}
          {/* <meshBasicMaterial color="#333" /> */}
          {/* {data.name !== "Circle" && <Outlines thickness={0.5} color="#333333" />} */}
        </mesh>
      )}
    </>
  );
}
