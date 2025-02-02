import { useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";

export enum AnimationsStages {
  readyIdle = 0,
  firstIdle,
  secondIdle,
}

export default function useAnimationProjectSection() {
  const sceneRef = useRef<HTMLDivElement>();
  const animCountRef = useRef<number>(null);
  const sceneCountRef = useRef<number>(0);
  const paperPlane = useRef<any>();

  function handleAnimation() {
    if (sceneRef.current && sceneCountRef.current == 0) {
      setTimeout(() => {
        animCountRef.current = 0;
      }, 2000);
      sceneCountRef.current = 1;
      const container = sceneRef.current;
      let scene,
        camera,
        renderer,
        path,
        path2,
        originalCameraPosition,
        mouse,
        raycaster,
        mesh,
        stats,
        edgesMaterial;

      initTheSceneStuff();
      setUpCurvePaths();
      onWindowResize();
      floatingAnimation();

      function initTheSceneStuff() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
          30,
          container.clientWidth / container.clientHeight,
          0.1,
          4000
        );

        originalCameraPosition = new THREE.Vector3(
          72.28770880931377,
          22.49685421676286,
          26.678550283842746
        );
        camera.position.set(
          72.28770880931377,
          22.49685421676286,
          26.678550283842746
        );
        camera.rotation.set(
          -1.0253332894190896,
          1.1777702643836174,
          0.9895359756638236,
          "XYZ"
        );

        const rect = container.getBoundingClientRect();
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        renderer.setSize(rect.width, rect.height);
        renderer.setClearColor(0x000000, 0);
        renderer.setAnimationLoop(animationLoop);
        container.appendChild(renderer.domElement);

        var ambientLight = new THREE.AmbientLight("white", 0.5);
        scene.add(ambientLight);

        const triangle = new THREE.ConeGeometry(2, 8, 3);

        mesh = new THREE.Mesh(
          triangle,
          new THREE.MeshStandardMaterial({
            color: "#0077ff",
            emissive: "#0091ff",
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide,
            depthWrite: false,
          })
        );
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;

        const edgesGeometry = new THREE.EdgesGeometry(mesh.geometry);
        edgesMaterial = new THREE.LineBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 1,
        });
        const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
        mesh.add(edges);
        scene.add(mesh);

        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();

        // Stats
        // stats = new Stats();
        // document.body.appendChild(stats.dom);
      }

      window.addEventListener("mousemove", (event) => {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1 + 0.05;
      });

      function setUpCurvePaths() {
        const points = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(-5, 2, 3),
          new THREE.Vector3(-10, 4, 6),
          new THREE.Vector3(-11, 7, 6),
          new THREE.Vector3(-9, 9, 4.5),
          new THREE.Vector3(-6.5, 11, 3.4),
          new THREE.Vector3(-3, 8, 2),
          new THREE.Vector3(-3.2, 6, 2.5),
          new THREE.Vector3(-4.7, 3.7, 3.3),
          new THREE.Vector3(-6.3, 3, 4),
          new THREE.Vector3(-8, 2, 5),
          new THREE.Vector3(-12, 2, 6.6),
          new THREE.Vector3(-16, 7, 9.2),
        ];

        const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");

        const pnts = curve.getPoints(99);
        const geometry = new THREE.BufferGeometry().setFromPoints(pnts);

        const clonedGeometry = geometry.clone();
        const clonedMaterial = new THREE.LineBasicMaterial({ color: "yellow" });

        const mirrorMatrix = new THREE.Matrix4().makeScale(1, 1, -1);

        const scaleMatrix = new THREE.Matrix4().makeScale(2, 1.6, 1);

        const offset = new THREE.Vector3(8, -2.5, -18.4);
        clonedGeometry.translate(offset.x, offset.y, offset.z);

        clonedGeometry.applyMatrix4(mirrorMatrix);
        clonedGeometry.applyMatrix4(scaleMatrix);

        clonedGeometry.attributes.position.needsUpdate = true;

        const clonedLine = new THREE.Line(clonedGeometry, clonedMaterial);
        rotateLineAroundLastPoint(clonedLine, -0.215, "Y");
        rotateLineAroundLastPoint(clonedLine, -0.25, "X");

        path2 = ThreeJsPointsToGsapPath(getLinePoints(clonedLine));

        path = ThreeJsPointsToGsapPath(pnts);
      }

      function footprintAnimaton() {
        timeoutProgression(20, 50, 500, () => {
          var tmp = mesh.clone();
          tmp.material = new THREE.MeshLambertMaterial({
            color: "#0077ff",
            transparent: true,
            opacity: 1,
          });
          scene.add(tmp);
          tmp.material.transparent = true;

          gsap.to(tmp.material, {
            duration: 1,
            opacity: 0,
          });
          gsap.to(tmp.scale, {
            duration: 0.8,
            x: 0.6,
            y: 0.6,
            z: 0.6,
            ease: "power3.out",
          });

          setTimeout(() => {
            scene.remove(tmp);
          }, 1200);
        });
      }

      function firstAnimation(proxy, updateMesh) {
        footprintAnimaton();
        gsap.to(proxy, {
          rotateX: -20,
          rotatez: -5,
          duration: 5,
          ease: "power3.out",
          onUpdate: updateMesh,
        });

        gsap.to(proxy, {
          duration: 5,
          motionPath: {
            path,
            curviness: 10,
            type: "cubic",
          },
          ease: "power3.out",
          onUpdate: updateMesh,
        });
      }

      function secondAnimation(proxy, updateMesh) {
        footprintAnimaton();
        gsap.to(proxy, {
          rotateX: -20,
          rotatez: -5,
          duration: 5,
          ease: "power3.out",
          onUpdate: updateMesh,
        });

        gsap.to(proxy, {
          duration: 5,
          motionPath: {
            path: path2,
            start: 1,
            end: 0,
            curviness: 10,
            type: "cubic",
          },
          ease: "power3.out",
          onUpdate: updateMesh,
        });
      }

      function thirdAnimation() {
        mesh.material = new THREE.MeshLambertMaterial({
          color: "#0077ff",
          transparent: true,
          opacity: 1,
        });
        gsap.to(mesh.position, {
          duration: 0.4,
          y: mesh.position.y - 3,
          ease: "power3.out",
        });
        gsap.to(mesh.scale, {
          duration: 0.4,
          x: 0.6,
          y: 0.6,
          z: 0.6,
          ease: "power3.out",
        });
        gsap.to(mesh.material, {
          duration: 0.4,
          opacity: 0,
          ease: "power3.out",
        });
        gsap.to(edgesMaterial, {
          duration: 0.4,
          opacity: 0,
          ease: "power3.out",
        });
        planeAnimation();
      }

      function makeProxyForMeshAndAnimate(mesh, func) {
        var proxy = document.createElement("div");

        var setX = gsap.quickSetter(mesh.position, "x");
        var setY = gsap.quickSetter(mesh.position, "y");
        var setZ = gsap.quickSetter(mesh.position, "z");
        var setRotX = gsap.quickSetter(mesh.rotation, "x");
        var setRotZ = gsap.quickSetter(mesh.rotation, "z");
        var setRotY = gsap.quickSetter(mesh.rotation, "y");

        function updateMesh() {
          setX(gsap.getProperty(proxy, "x"));
          setY(gsap.getProperty(proxy, "y"));
          setZ(gsap.getProperty(proxy, "z"));
          setRotX(gsap.getProperty(proxy, "rotateX"));
          setRotY(gsap.getProperty(proxy, "rotateY"));
          setRotZ(gsap.getProperty(proxy, "rotateZ"));
        }

        func(proxy, updateMesh);
      }

      function floatingAnimation() {
        const { x, y, z } = mesh.position;
        let { x: angleX, y: angleY, z: angleZ } = mesh.rotation;

        const randomX = random(-1, +1);
        const randomY = random(-1, +1);
        const randomZ = random(-1, +1);
        const randomTime = random(3, 5);
        const randomTime2 = random(5, 10);
        const randomAngle = random(-0.8, 0.8);

        moveX(mesh.position, 1);
        moveY(mesh.position, -1);
        moveZ(mesh.position, 1);
        rotate(mesh.rotation, 1);

        function rotate(target, direction) {
          gsap.to(target, randomTime2(), {
            x: angleX + randomAngle(direction),
            y: angleY + randomAngle(direction),
            z: angleZ + randomAngle(direction),
            ease: "sine.inOut",
            onComplete: rotate,
            onCompleteParams: [target, direction * -1],
          });
        }

        function moveX(target, direction) {
          gsap.to(target, randomTime(), {
            x: x + randomX(direction),
            ease: "sine.inOut",
            onComplete: moveX,
            onCompleteParams: [target, direction * -1],
          });
        }

        function moveZ(target, direction) {
          gsap.to(target, randomTime(), {
            z: z + randomZ(direction),
            ease: "sine.inOut",
            onComplete: moveZ,
            onCompleteParams: [target, direction * -1],
          });
        }

        function moveY(target, direction) {
          gsap.to(target, randomTime(), {
            y: y + randomY(direction),
            ease: "sine.inOut",
            onComplete: moveY,
            onCompleteParams: [target, direction * -1],
          });
        }

        function random(min, max) {
          const delta = max - min;
          return (direction = 1) => (min + delta * Math.random()) * direction;
        }
      }

      function gsapCancelMeshAnimations(mesh) {
        gsap.killTweensOf(mesh);
        gsap.killTweensOf(mesh.position);
        gsap.killTweensOf(mesh.material);
        gsap.killTweensOf(mesh.rotation);
      }

      window.addEventListener("resize", onWindowResize, false);

      function onWindowResize() {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(container.offsetWidth, container.offsetHeight);

        const cwidth = container.offsetWidth;

        //custom
        if (k(cwidth) > 0.3) {
          scaleCameraPosition(1 + k(cwidth) + k(cwidth) * 1.2, -23 * k(cwidth));
        } else if (cwidth < 1700) {
          scaleCameraPosition(1 + k(cwidth));
        } else {
          scaleCameraPosition(1);
        }
      }

      function scaleCameraPosition(scaleFactor, zOffset?) {
        const offset = zOffset ? zOffset : 0;
        camera.position.set(
          originalCameraPosition.x * scaleFactor,
          originalCameraPosition.y * scaleFactor,
          originalCameraPosition.z * scaleFactor + offset
        );
      }

      function animationLoop(t) {
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(mesh);

        if (intersects.length > 0) {
          if (animCountRef.current === AnimationsStages.readyIdle) {
            gsapCancelMeshAnimations(mesh);
            makeProxyForMeshAndAnimate(mesh, firstAnimation);
            animCountRef.current = null;
            setTimeout(() => {
              floatingAnimation();
              animCountRef.current = AnimationsStages.firstIdle;
            }, 4000);
          } else if (animCountRef.current == AnimationsStages.firstIdle) {
            gsapCancelMeshAnimations(mesh);
            makeProxyForMeshAndAnimate(mesh, secondAnimation);
            animCountRef.current = null;
            setTimeout(() => {
              floatingAnimation();
              animCountRef.current = AnimationsStages.secondIdle;
            }, 4000);
          } else if (animCountRef.current == AnimationsStages.secondIdle) {
            gsapCancelMeshAnimations(mesh);
            thirdAnimation();
            animCountRef.current = null;
          }
        }
        // stats.begin();
        renderer.render(scene, camera);
        // stats.end();
      }
    }
  }

  function planeAnimation() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    gsap.to(paperPlane.current, {
      duration: 1,
      opacity: 1,
    });
    gsap.to(paperPlane.current, {
      duration: 2.25,
      scale: 2,
      ease: "power1.inOut",
      motionPath: {
        path: "#plane",
        align: "#plane",
        autoRotate: true,
        curviness: 1.5,
        alignOrigin: [0.5, 0.7],
        type: "cubic",
      },
    });
    gsap.set(paperPlane.current, {
      opacity: 0,
    });
  }

  return {
    handleAnimation,
    sceneRef,
    paperPlane,
  };
}

function timeoutProgression(firstDelay, step, stop, func) {
  let currentDelay = firstDelay;

  cycle();

  function cycle() {
    setTimeout(() => {
      currentDelay += step;
      func();
      if (currentDelay < stop) cycle();
    }, currentDelay);
  }
}

function rotateLineAroundLastPoint(line, angle, axis = "Y") {
  const geometry = line.geometry;
  const points = geometry.attributes.position.array;

  const lastPoint = new THREE.Vector3(
    points[points.length - 3],
    points[points.length - 2],
    points[points.length - 1]
  );

  const translateToOrigin = new THREE.Matrix4().makeTranslation(
    -lastPoint.x,
    -lastPoint.y,
    -lastPoint.z
  );
  geometry.applyMatrix4(translateToOrigin);

  let rotationMatrix;
  if (axis === "Y") {
    rotationMatrix = new THREE.Matrix4().makeRotationY(angle);
  } else if (axis === "X") {
    rotationMatrix = new THREE.Matrix4().makeRotationX(angle);
  } else if (axis === "Z") {
    rotationMatrix = new THREE.Matrix4().makeRotationZ(angle);
  }

  geometry.applyMatrix4(rotationMatrix);

  const translateBack = new THREE.Matrix4().makeTranslation(
    lastPoint.x,
    lastPoint.y,
    lastPoint.z
  );
  geometry.applyMatrix4(translateBack);

  geometry.attributes.position.needsUpdate = true;
}

function getLinePoints(line) {
  const positions = line.geometry.attributes.position.array;
  const points = [];

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];
    points.push(new THREE.Vector3(x, y, z));
  }

  return points;
}

function ThreeJsPointsToGsapPath(points) {
  return points.map((p) => {
    return {
      x: p.x,
      y: p.y,
      z: p.z,
    };
  });
}

function k(x) {
  return 360 / x;
}
