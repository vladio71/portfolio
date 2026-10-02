# Portfolio

Personal site of Vlad Dobrinov: about, experience, skills, projects and contacts on one page, with two small 3D scenes.

Live: https://portfolio-vladio71.vercel.app/

## Stack

- Next.js 13 (pages router), React 18, TypeScript
- three.js and react-three-fiber for the 3D scenes
- GSAP (ScrollTrigger, MotionPath) for animation
- Sass and CSS modules

## 3D scenes

**Particle background** (`src/components/ParticlesBackground.tsx`). 700 tetrahedrons drawn as one instanced mesh, so the whole cloud is a single draw call. The matrices are written once; the only per-frame work is turning the cloud.

**Plane game** (`src/components/ProjectSection/useGsapAndThreeJsAnimation.ts`). A paper-plane-like cone floats next to the "Awesome Projects" heading. Point at it, or tap it on a touch screen, and it flies away along a Catmull-Rom spline and leaves a fading trail. The third hit dissolves it and a DOM paper plane flies down to the contact section.

- Plain three.js, no wrapper: scene, camera and renderer are created in one function that returns `dispose()`.
- The hit test is a raycast from the pointer: the geometry of the plane for a mouse, a larger bounding sphere for a finger.
- Flights are GSAP MotionPath tweens over points sampled from the spline.
- The scene renders only while it is on screen (IntersectionObserver) and frees its GPU resources when the game is over or the component unmounts.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Where the content lives

| What       | File                                                      |
| ---------- | --------------------------------------------------------- |
| About      | `src/components/AboutSection/AboutSection.tsx`            |
| Experience | `src/components/WorkExpepienceSection/WorkExperience.tsx` |
| Skills     | `src/components/SkillsSection/SkillsSection.tsx`          |
| Projects   | `initialData.ts`                                          |
| Contacts   | `src/components/GetInTouch/GetInTouchSection.tsx`         |
