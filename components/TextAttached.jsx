import { Html } from "@react-three/drei";

const TextAttached = ({ position = [0, 0.4, 0] }) => {
  return (
    <Html
      scale={0.2}
      // rotation={[Math.PI / 2, 0, 0]}
      position={position}
      transform
      occlude
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "#333",
          borderRadius: 2,
          paddingTop: 3,
          paddingBottom: 1,
          paddingInline: 8,
          fontSize: 2,
        }}
      >
        LIVE IN YOUR
        <br />
        <span
          style={{
            fontSize: 5,
            fontWeight: "bolder",
            padding: 0,
            color: "",
          }}
        >
          SKULL
        </span>
        <div
          style={{
            position: "absolute",
            backgroundColor: "#333",
            borderRadius: 1,
            width: 5,
            height: 5,
            botttom: 0,
            insetInline: 0,
            marginInline: "auto",
            marginTop: -2,
            transform: "rotate(45deg)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            backgroundColor: "#333",
            width: 0.4,
            height: 10,
            botttom: 0,
            insetInline: 0,
            marginInline: "auto",
            borderRadius: 1,
            marginTop: 6,
          }}
        ></div>
      </div>
    </Html>
  );
};

export default TextAttached;
