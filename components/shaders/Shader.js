export const vertex = `
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

    // Point size
    gl_PointSize = 0.15 + 50.0;
    gl_PointSize *= (1.0 / - viewPosition.z);
  }
`

export const fragment = `
void main() {
    vec2 uv = gl_PointCoord;
    float distanceToCenter = length(uv - vec2(0.5));

    if(distanceToCenter > 0.5)
        discard;

    gl_FragColor = vec4(1.0,1.0,1.0,1.0);
}
`