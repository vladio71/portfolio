import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Euler,
  MeshLambertMaterial,
  TetrahedronGeometry,
  Vector3,
  Quaternion,
} from "three";

import { Instances, Instance, InstancesProps } from "@react-three/drei";
const RotatingScene = () => {
  const numObjects = 1000;
  const sphereRadius = 50;
  const meshRef = useRef<any>();

  const material = new MeshLambertMaterial({
    color: "#0077ff",
    emissive: "#0091ff",
  });

  const geometry = new TetrahedronGeometry(0.24, 0);
  const items = useMemo(() => {
    return randomPosition(350, 25, 30).concat(randomPosition(350, 20, 15));
  }, []);

  function randomPosition(count, r, radiusOffset) {
    const tempQuaternion = new Quaternion();

    return new Array(count).fill(0).map(() => {
      const radius = Math.random() * Math.random() * r + radiusOffset;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      let y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const squeezeFactor = 0.69;
      y *= squeezeFactor;

      const randomRotationX = Math.random() * Math.PI * 2;
      const randomRotationY = Math.random() * Math.PI * 2;
      const randomRotationZ = Math.random() * Math.PI * 2;

      tempQuaternion.setFromEuler(
        new Euler(randomRotationX, randomRotationY, randomRotationZ)
      );

      tempQuaternion;
      return {
        position: new Vector3(x, y, z),
        rotation: new Euler(
          tempQuaternion.x,
          tempQuaternion.y,
          tempQuaternion.z
        ),
      };
    });
  }

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  }, 0);

  return (
    <Instances
      ref={meshRef}
      limit={1000}
      geometry={geometry}
      material={material}
    >
      {items.map((item, index) => (
        <Instance
          key={index}
          position={item.position}
          rotation={item.rotation}
        />
      ))}
    </Instances>
  );
};

const TreeJsBackground = () => {
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
      <RotatingScene />
    </Canvas>
  );
};

export default TreeJsBackground;
