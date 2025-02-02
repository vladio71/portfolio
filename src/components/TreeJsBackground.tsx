import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { PerspectiveCamera } from "three";

const TreeJsBackground = () => {
  const refContainer = useRef(null);
  const mountRef = useRef(0);
  useEffect(() => {
    if (mountRef.current === 0) {
      mountRef.current += 1;

      let camera, scene, raycaster, renderer;

      const mouse = new THREE.Vector2();
      const init = () => {
        camera = new PerspectiveCamera(
          60,
          window.innerWidth / window.innerHeight,
          10,
          3000
        );
        camera.position.set(1, 2, 1300);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        scene.add(new THREE.AmbientLight(0xffffff));

        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);

        const triangle = new THREE.TetrahedronGeometry(6, 0);
        const material = new THREE.MeshLambertMaterial({
          color: "#0077ff",
          emissive: "#0091ff",
        });

        const instancedMesh = new THREE.InstancedMesh(triangle, material, 2000);
        scene.add(instancedMesh);

        const tempMatrix = new THREE.Matrix4();
        const tempQuaternion = new THREE.Quaternion();
        const tempPosition = new THREE.Vector3();
        const tempScale = new THREE.Vector3(1, 1, 1);

        for (let i = 0; i < 800; i++) {
          const x = Math.random() * 2500 - 1250;
          const y = Math.random() * 800 - 400;
          const z = Math.random() * 2500 - 1250;

          tempPosition.set(x, y, z);
          tempQuaternion.setFromEuler(
            new THREE.Euler(
              Math.random() * 800 - 400,
              Math.random() * 800 - 400,
              Math.random() * 800 - 400
            )
          );

          if (x * x + y * y + z * z < 1000000) {
            tempMatrix.compose(tempPosition, tempQuaternion, tempScale);
            instancedMesh.setMatrixAt(i, tempMatrix);
          }
        }

        for (let i = 0; i < 400; i++) {
          const x = Math.random() * 1000 - 500;
          const y = Math.random() * 1000 - 500;
          const z = Math.random() * 1000 - 500;

          tempPosition.set(x, y, z);
          tempQuaternion.setFromEuler(
            new THREE.Euler(
              Math.random() * 800 - 400,
              Math.random() * 800 - 400,
              Math.random() * 800 - 400
            )
          );

          if (x * x + y * y + z * z < 1000000) {
            tempMatrix.compose(tempPosition, tempQuaternion, tempScale);
            instancedMesh.setMatrixAt(i, tempMatrix);
          }
        }

        raycaster = new THREE.Raycaster();

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        refContainer.current &&
          refContainer.current.appendChild(renderer.domElement);

        const effectController = {
          focalLength: 15,
          fstop: 2.8,
          showFocus: false,
          focalDepth: 3,
        };
      };

      window.addEventListener("resize", onWindowResize, false);
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      const axis = new THREE.Vector3(0, 1, 0);
      const angle = 0.0005;
      function rotateScene() {
        requestAnimationFrame(rotateScene);

        scene.quaternion.premultiply(
          new THREE.Quaternion().setFromAxisAngle(axis, angle)
        );

        renderer.render(scene, camera);
      }

      init();
      rotateScene();
    }
  }, []);
  return (
    <div>
      <div
        ref={refContainer}
        style={{
          zIndex: -100,
          position: "fixed",
        }}
      ></div>
    </div>
  );
};

export default TreeJsBackground;
