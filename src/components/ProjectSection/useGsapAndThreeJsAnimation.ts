import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

// The small game above the "Awesome Projects" heading.
//
// A paper-plane-like cone floats in a transparent WebGL canvas laid over the
// page. Point at it, or tap it on a touch screen, and it flies off along a
// spline, leaving a fading trail. The third hit dissolves it and hands over to
// the DOM paper plane, which flies down to the contact section.

type PathPoint = { x: number; y: number; z: number };

type Flight = {
  path: PathPoint[];
  reversed: boolean;
  // Radians. The plane rolls a few full turns while it flies.
  spin: number;
  durationSeconds: number;
  // The plane starts floating again a little before the flight tween ends.
  settleAfterMs: number;
  nextStage: Stage;
};

enum Stage {
  Ready,
  AfterFirstFlight,
  AfterSecondFlight,
}

const PLANE_COLOR = "#0077ff";
const PLANE_EMISSIVE = "#0091ff";

// Hand-tuned camera pose that puts the resting plane next to the heading.
const CAMERA_HOME = new THREE.Vector3(
  72.28770880931377,
  22.49685421676286,
  26.678550283842746
);
const CAMERA_ROTATION = new THREE.Euler(
  -1.0253332894190896,
  1.1777702643836174,
  0.9895359756638236,
  "XYZ"
);

// The plane ignores the pointer until the page intro has played.
const READY_DELAY_MS = 2000;
// Normalized pointer coordinates well outside the canvas: nothing points at it.
const POINTER_AWAY = 10;
// The hit test sits slightly above the real pointer position. Tuned by eye.
const POINTER_Y_OFFSET = 0.05;
// A finger is far less precise than a cursor, so taps are tested against a
// sphere this many times larger than the plane instead of its triangles.
const TOUCH_HIT_SCALE = 1.6;

export default function useAnimationProjectSection() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const paperPlane = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = sceneRef.current;
    const paperPlaneElement = paperPlane.current;
    if (!container) return;

    let planeScene: { dispose: () => void } | undefined;
    try {
      planeScene = createPlaneScene(container, () =>
        flyPaperPlaneToContacts(paperPlaneElement)
      );
    } catch (error) {
      // No WebGL (old device, blocked GPU): the page works without the game.
      console.warn("The 3D scene could not start", error);
    }

    return () => {
      planeScene?.dispose();
      if (paperPlaneElement) gsap.killTweensOf(paperPlaneElement);
    };
  }, []);

  return { sceneRef, paperPlane };
}

function createPlaneScene(container: HTMLDivElement, onFinished: () => void) {
  // Everything that is still running or still holds GPU memory is tracked
  // here, so dispose() can stop and free all of it.
  const liveTweens = new Set<gsap.core.Tween>();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const footprintMaterials = new Set<THREE.Material>();

  // null while the plane is busy: not ready yet, flying or dissolving.
  let stage: Stage | null = null;
  let visible = false;
  let disposed = false;

  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight("white", 0.5));

  const camera = new THREE.PerspectiveCamera(
    30,
    container.clientWidth / container.clientHeight,
    0.1,
    4000
  );
  camera.position.copy(CAMERA_HOME);
  camera.rotation.copy(CAMERA_ROTATION);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const planeGeometry = new THREE.ConeGeometry(2, 8, 3);
  planeGeometry.computeBoundingSphere();
  const edgesGeometry = new THREE.EdgesGeometry(planeGeometry);
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 1,
  });
  const plane = new THREE.Mesh<THREE.ConeGeometry, THREE.Material>(
    planeGeometry,
    new THREE.MeshStandardMaterial({
      color: PLANE_COLOR,
      emissive: PLANE_EMISSIVE,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
  plane.add(new THREE.LineSegments(edgesGeometry, edgesMaterial));
  scene.add(plane);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(POINTER_AWAY, POINTER_AWAY);
  const touchHitSphere = new THREE.Sphere();
  let pointerIsTouch = false;

  const paths = buildFlightPaths();
  const firstFlight: Flight = {
    path: paths.first,
    reversed: false,
    spin: -18.6,
    durationSeconds: 3.2,
    settleAfterMs: 2620,
    nextStage: Stage.AfterFirstFlight,
  };
  const secondFlight: Flight = {
    path: paths.second,
    reversed: true,
    spin: -15.5,
    durationSeconds: 3.5,
    settleAfterMs: 3000,
    nextStage: Stage.AfterSecondFlight,
  };

  function later(callback: () => void, ms: number) {
    const id = setTimeout(() => {
      timers.delete(id);
      if (!disposed) callback();
    }, ms);
    timers.add(id);
  }

  function animate(target: object, vars: gsap.TweenVars) {
    const { onComplete, ...rest } = vars;
    const tween = gsap.to(target, {
      ...rest,
      onComplete: () => {
        liveTweens.delete(tween);
        onComplete?.();
      },
    });
    liveTweens.add(tween);
  }

  function stopTweensOf(...targets: object[]) {
    liveTweens.forEach((tween) => {
      const tweened = tween.targets<object>();
      if (tweened.some((target) => targets.includes(target))) {
        tween.kill();
        liveTweens.delete(tween);
      }
    });
  }

  // Idle state: the plane drifts and sways around the spot where it stopped.
  function float() {
    const { x, y, z } = plane.position;
    const { x: angleX, y: angleY, z: angleZ } = plane.rotation;

    const drift = (
      axis: "x" | "y" | "z",
      origin: number,
      direction: number
    ) => {
      animate(plane.position, {
        [axis]: origin + randomBetween(-1, 1) * direction,
        duration: randomBetween(3, 5),
        ease: "sine.inOut",
        onComplete: () => drift(axis, origin, -direction),
      });
    };

    const sway = (direction: number) => {
      animate(plane.rotation, {
        x: angleX + randomBetween(-0.8, 0.8) * direction,
        y: angleY + randomBetween(-0.8, 0.8) * direction,
        z: angleZ + randomBetween(-0.8, 0.8) * direction,
        duration: randomBetween(5, 10),
        ease: "sine.inOut",
        onComplete: () => sway(-direction),
      });
    };

    drift("x", x, 1);
    drift("y", y, -1);
    drift("z", z, 1);
    sway(1);
  }

  function stopFloating() {
    stopTweensOf(plane.position, plane.rotation);
  }

  // A short burst of fading copies behind the plane. The gap between copies
  // grows by 50 ms each time, so the trail thins out as the plane slows down.
  function leaveTrail() {
    let delay = 20;

    const next = () => {
      later(() => {
        delay += 50;
        addFootprint();
        if (delay < 320) next();
      }, delay);
    };

    next();
  }

  function addFootprint() {
    const footprint = plane.clone();
    const material = new THREE.MeshLambertMaterial({
      color: PLANE_COLOR,
      transparent: true,
      opacity: 1,
    });
    footprint.material = material;
    footprintMaterials.add(material);
    scene.add(footprint);

    animate(material, { opacity: 0, duration: 1 });
    animate(footprint.scale, {
      x: 0.6,
      y: 0.6,
      z: 0.6,
      duration: 0.8,
      ease: "power3.out",
    });

    // The geometry is shared with the plane, the material is not: free it.
    later(() => {
      scene.remove(footprint);
      material.dispose();
      footprintMaterials.delete(material);
    }, 1200);
  }

  function fly(flight: Flight) {
    stage = null;
    stopFloating();
    leaveTrail();

    // The flight is tweened on a detached element and copied to the plane on
    // every tick, so position and spin come from one place.
    const proxy = document.createElement("div");
    const read = (property: string) =>
      gsap.getProperty(proxy, property) as number;
    const follow = () => {
      plane.position.set(read("x"), read("y"), read("z"));
      plane.rotation.set(read("rotateX"), read("rotateY"), read("rotateZ"));
    };

    animate(proxy, {
      rotateX: flight.spin,
      duration: flight.durationSeconds,
      ease: "power3.out",
      onUpdate: follow,
    });
    animate(proxy, {
      duration: flight.durationSeconds,
      ease: "power3.out",
      onUpdate: follow,
      motionPath: {
        path: flight.path,
        curviness: 10,
        type: "cubic",
        ...(flight.reversed ? { start: 1, end: 0 } : {}),
      },
    });

    later(() => {
      float();
      stage = flight.nextStage;
    }, flight.settleAfterMs);
  }

  function dissolve() {
    stage = null;
    stopFloating();

    const solid = plane.material;
    const fading = new THREE.MeshLambertMaterial({
      color: PLANE_COLOR,
      transparent: true,
      opacity: 1,
    });
    plane.material = fading;
    solid.dispose();

    const fade = { duration: 0.4, ease: "power3.out" };
    animate(plane.position, { ...fade, y: plane.position.y - 3 });
    animate(plane.scale, { ...fade, x: 0.6, y: 0.6, z: 0.6 });
    animate(fading, { ...fade, opacity: 0 });
    animate(edgesMaterial, { ...fade, opacity: 0 });

    // Once the plane has faded there is nothing left to draw: stop rendering
    // and give the canvas memory back.
    later(dispose, 600);

    onFinished();
  }

  function onHit() {
    if (stage === Stage.Ready) fly(firstFlight);
    else if (stage === Stage.AfterFirstFlight) fly(secondFlight);
    else if (stage === Stage.AfterSecondFlight) dissolve();
  }

  function pointerHitsPlane() {
    raycaster.setFromCamera(pointer, camera);

    if (pointerIsTouch) {
      touchHitSphere
        .copy(planeGeometry.boundingSphere)
        .applyMatrix4(plane.matrixWorld);
      touchHitSphere.radius *= TOUCH_HIT_SCALE;
      const hit = raycaster.ray.intersectsSphere(touchHitSphere);
      // A tap is a one-off, unlike a cursor that rests where it was left.
      pointer.set(POINTER_AWAY, POINTER_AWAY);
      return hit;
    }

    return raycaster.intersectObject(plane).length > 0;
  }

  function frame() {
    if (stage !== null && pointerHitsPlane()) onHit();
    renderer.render(scene, camera);
  }

  // Render only while the scene is on screen.
  function updateLoop() {
    renderer.setAnimationLoop(visible && !disposed ? frame : null);
  }

  function onPointer(event: PointerEvent) {
    const rect = container.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y =
      -((event.clientY - rect.top) / rect.height) * 2 + 1 + POINTER_Y_OFFSET;
    pointerIsTouch = event.pointerType !== "mouse";
  }

  function placeCamera(scale: number, zOffset = 0) {
    camera.position.set(
      CAMERA_HOME.x * scale,
      CAMERA_HOME.y * scale,
      CAMERA_HOME.z * scale + zOffset
    );
    // The raycaster reads the camera's world matrix, and three.js only
    // refreshes that matrix inside render(). The hit test runs before the
    // first render, so without this it would shoot its first ray from the
    // world origin, which is exactly where the plane rests.
    camera.updateMatrixWorld();
  }

  function resize() {
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    // The narrower the page, the further back the camera sits, so the plane
    // keeps its place next to the heading.
    const narrowness = 360 / width;
    if (narrowness > 0.3) {
      placeCamera(1 + narrowness + narrowness * 1.2, -23 * narrowness);
    } else if (width < 1700) {
      placeCamera(1 + narrowness);
    } else {
      placeCamera(1);
    }
  }

  function dispose() {
    if (disposed) return;
    disposed = true;

    renderer.setAnimationLoop(null);
    visibilityObserver?.disconnect();
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("pointerdown", onPointer);
    window.removeEventListener("resize", resize);

    timers.forEach((id) => clearTimeout(id));
    timers.clear();
    liveTweens.forEach((tween) => tween.kill());
    liveTweens.clear();

    footprintMaterials.forEach((material) => material.dispose());
    footprintMaterials.clear();
    plane.material.dispose();
    planeGeometry.dispose();
    edgesGeometry.dispose();
    edgesMaterial.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }

  const visibilityObserver =
    typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver((entries) => {
          visible = entries[entries.length - 1].isIntersecting;
          updateLoop();
        });

  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("pointerdown", onPointer, { passive: true });
  window.addEventListener("resize", resize);

  resize();
  float();
  later(() => {
    stage = Stage.Ready;
  }, READY_DELAY_MS);

  if (visibilityObserver) {
    visibilityObserver.observe(container);
  } else {
    visible = true;
    updateLoop();
  }

  return { dispose };
}

// The DOM paper plane takes over from the 3D one: the page scrolls to the
// bottom while the image follows the hidden SVG path down to the contacts.
function flyPaperPlaneToContacts(paperPlane: HTMLElement | null) {
  if (!paperPlane) return;

  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  gsap.to(paperPlane, {
    duration: 1,
    opacity: 1,
  });
  gsap.to(paperPlane, {
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
  gsap.set(paperPlane, {
    opacity: 0,
  });
}

function buildFlightPaths(): { first: PathPoint[]; second: PathPoint[] } {
  const curve = new THREE.CatmullRomCurve3(
    [
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
    ],
    false,
    "centripetal"
  );
  const firstPoints = curve.getPoints(99);

  // The second path is the first one shifted, mirrored and stretched so that
  // its last point lands where the first flight ended, then turned around
  // that point. The second flight runs along it backwards.
  const second = new THREE.BufferGeometry().setFromPoints(firstPoints);
  second.translate(8, -2.5, -18.4);
  second.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));
  second.applyMatrix4(new THREE.Matrix4().makeScale(2, 1.6, 1));
  rotateAroundLastPoint(second, new THREE.Matrix4().makeRotationY(-0.215));
  rotateAroundLastPoint(second, new THREE.Matrix4().makeRotationX(-0.25));

  const secondPoints = readPoints(second);
  second.dispose();

  return {
    first: firstPoints.map(toPathPoint),
    second: secondPoints.map(toPathPoint),
  };
}

function rotateAroundLastPoint(
  geometry: THREE.BufferGeometry,
  rotation: THREE.Matrix4
) {
  const positions = geometry.getAttribute("position");
  const pivot = new THREE.Vector3().fromBufferAttribute(
    positions,
    positions.count - 1
  );

  geometry.translate(-pivot.x, -pivot.y, -pivot.z);
  geometry.applyMatrix4(rotation);
  geometry.translate(pivot.x, pivot.y, pivot.z);
}

function readPoints(geometry: THREE.BufferGeometry): THREE.Vector3[] {
  const positions = geometry.getAttribute("position");
  const points: THREE.Vector3[] = [];

  for (let i = 0; i < positions.count; i++) {
    points.push(new THREE.Vector3().fromBufferAttribute(positions, i));
  }

  return points;
}

function toPathPoint(point: THREE.Vector3): PathPoint {
  return { x: point.x, y: point.y, z: point.z };
}

function randomBetween(min: number, max: number) {
  return min + (max - min) * Math.random();
}
