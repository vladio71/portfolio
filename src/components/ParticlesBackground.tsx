import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Euler, InstancedMesh, Matrix4, Quaternion, Vector3 } from "three";

const PARTICLE_COLOR = "#0077ff";
const PARTICLE_EMISSIVE = "#0091ff";
const PARTICLE_SIZE = 0.24;

// Radians per second, so the cloud turns at the same speed on 60 Hz and 120 Hz
// screens.
const ROTATION_SPEED = 0.06;

// Two shells of particles around the camera axis: an outer, sparser one and an
// inner, denser one.
const SHELLS = [
  { count: 350, spread: 25, innerRadius: 30 },
  { count: 350, spread: 20, innerRadius: 15 },
];
const PARTICLE_COUNT = SHELLS.reduce((total, shell) => total + shell.count, 0);

// The cloud is flattened a little so it reads as a disc, not a ball.
const VERTICAL_SQUEEZE = 0.69;

function buildParticleMatrices(): Matrix4[] {
  const position = new Vector3();
  const rotation = new Euler();
  const quaternion = new Quaternion();
  const scale = new Vector3(1, 1, 1);
  const matrices: Matrix4[] = [];

  for (const shell of SHELLS) {
    for (let i = 0; i < shell.count; i++) {
      // The product of two random numbers keeps most particles close to the
      // inner radius and lets only a few drift far out.
      const radius =
        Math.random() * Math.random() * shell.spread + shell.innerRadius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) * VERTICAL_SQUEEZE,
        radius * Math.cos(phi)
      );
      rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      quaternion.setFromEuler(rotation);

      matrices.push(new Matrix4().compose(position, quaternion, scale));
    }
  }

  return matrices;
}

const Particles = () => {
  const meshRef = useRef<InstancedMesh>(null);
  const matrices = useMemo(buildParticleMatrices, []);

  // The particles never move relative to each other, so their matrices are
  // written once. After that the whole cloud is one draw call and the only
  // per-frame work is turning it.
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    matrices.forEach((matrix, index) => mesh.setMatrixAt(index, matrix));
    mesh.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * ROTATION_SPEED;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, PARTICLE_COUNT]}
      frustumCulled={false}
    >
      <tetrahedronGeometry args={[PARTICLE_SIZE, 0]} />
      <meshLambertMaterial
        color={PARTICLE_COLOR}
        emissive={PARTICLE_EMISSIVE}
      />
    </instancedMesh>
  );
};

const ParticlesBackground = () => {
  return (
    <Canvas
      resize={{ scroll: false }}
      camera={{
        position: [0, 2, 50],
        fov: 60,
        near: 0.1,
        far: 2000,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    >
      <Particles />
    </Canvas>
  );
};

export default ParticlesBackground;
