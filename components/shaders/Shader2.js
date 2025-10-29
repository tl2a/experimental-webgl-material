export const vertex2 = `
uniform float uTime;
uniform float uAmplitude;
uniform float uWaveLength;
void main() {
    vec3 newPosition = position;

    float wave = uAmplitude * sin(position.x * uWaveLength + uTime);
    newPosition.z = position.z + wave; 

    // Final position
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
  }
`

export const fragment2 = `
void main() {
    gl_FragColor = vec4(1.0,1.0,1.0,1.0);
}`