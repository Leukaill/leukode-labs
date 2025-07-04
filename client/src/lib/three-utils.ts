import * as THREE from 'three';

export const createParticleSystem = (count: number = 1000) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  const googleColors = [
    [0.259, 0.522, 0.957], // Google Blue
    [0.204, 0.659, 0.325], // Google Green
    [0.984, 0.737, 0.016], // Google Yellow
    [0.918, 0.263, 0.208], // Google Red
  ];
  
  for (let i = 0; i < count; i++) {
    // Position
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    
    // Color
    const colorIndex = Math.floor(Math.random() * googleColors.length);
    const color = googleColors[colorIndex];
    colors[i * 3] = color[0];
    colors[i * 3 + 1] = color[1];
    colors[i * 3 + 2] = color[2];
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
  });
  
  return new THREE.Points(geometry, material);
};

export const createHolographicMaterial = () => {
  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  
  const fragmentShader = `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    uniform vec3 color4;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
      fresnel = pow(1.0 - fresnel, 2.0);
      
      float gradient = sin(vPosition.x * 2.0 + time) * 0.5 + 0.5;
      
      vec3 color = mix(color1, color2, gradient);
      color = mix(color, color3, sin(time + vPosition.y) * 0.5 + 0.5);
      color = mix(color, color4, cos(time + vPosition.z) * 0.5 + 0.5);
      
      gl_FragColor = vec4(color, fresnel * 0.8);
    }
  `;
  
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color(0x4285F4) },
      color2: { value: new THREE.Color(0x34A853) },
      color3: { value: new THREE.Color(0xFBBC04) },
      color4: { value: new THREE.Color(0xEA4335) },
    },
    transparent: true,
    side: THREE.DoubleSide,
  });
};

export const animateParticles = (particles: THREE.Points, time: number) => {
  const positions = particles.geometry.attributes.position.array as Float32Array;
  
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] += Math.sin(time + positions[i]) * 0.001;
    positions[i] += Math.cos(time + positions[i + 1]) * 0.0005;
  }
  
  particles.geometry.attributes.position.needsUpdate = true;
  particles.rotation.y += 0.001;
};
