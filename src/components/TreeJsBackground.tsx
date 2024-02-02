import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {CinematicCamera} from "three/examples/jsm/cameras/CinematicCamera";
import GUI from "three/examples/jsm/libs/lil-gui.module.min";


const TreeJsBackground = () => {

    const refContainer = useRef(null);
    const mountRef = useRef(0);
    useEffect(() => {
        if (mountRef.current === 0) {
            mountRef.current += 1


            let camera, scene, raycaster, renderer;

            const mouse = new THREE.Vector2();

            init();
            animate();

            function init() {

                camera = new CinematicCamera(60, window.innerWidth / window.innerHeight, 10, 2000);
                camera.setLens(5);
                camera.position.set(1, 2, 1000);

                scene = new THREE.Scene();
                scene.background = new THREE.Color(0xf0f0f0);

                scene.add(new THREE.AmbientLight(0xffffff));

                const light = new THREE.DirectionalLight(0xffffff);
                light.position.set(1, 1, 1).normalize();
                scene.add(light);

                const triangle = new THREE.TetrahedronGeometry(6, 0);

                for (let i = 0; i < 1500; i++) {

                    const object = new THREE.Mesh(triangle, new THREE.MeshLambertMaterial({color: '#0077ff'}));

                    object.position.x = Math.random() * 2500 - 1250;
                    object.position.y = Math.random() * 2500 - 1250;
                    object.position.z = Math.random() * 2500 - 1250;
                    object.rotation.set(Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400)
                    if (Math.sqrt(Math.pow(object.position.x, 2) + Math.pow(object.position.y, 2) + Math.pow(object.position.z, 2)) < 1600)
                        scene.add(object);

                }

                raycaster = new THREE.Raycaster();

                renderer = new THREE.WebGLRenderer({antialias: true});
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                refContainer.current && refContainer.current.appendChild(renderer.domElement);



                const effectController = {
                    focalLength: 15,
                    fstop: 2.8,
                    showFocus: false,
                    focalDepth: 3,
                };

                const matChanger = function () {

                    for (const e in effectController) {

                        if (e in camera.postprocessing.bokeh_uniforms) {

                            camera.postprocessing.bokeh_uniforms[e].value = effectController[e];

                        }

                    }

                    camera.postprocessing.bokeh_uniforms['znear'].value = camera.near;
                    camera.postprocessing.bokeh_uniforms['zfar'].value = camera.far;
                    camera.setLens(effectController.focalLength, camera.frameHeight, effectController.fstop, camera.coc);
                    effectController['focalDepth'] = camera.postprocessing.bokeh_uniforms['focalDepth'].value;

                };


                matChanger();

            }

            function animate() {

                requestAnimationFrame(animate, renderer.domElement);
                scene.rotation.y += 0.001;

                render();

            }

            const r = 100

            function render() {

                camera.lookAt(scene.position);
                camera.updateMatrixWorld();

                raycaster.setFromCamera(mouse, camera);


                if (camera.postprocessing.enabled) {

                    camera.renderCinematic(scene, renderer);

                } else {

                    scene.overrideMaterial = null;

                    renderer.clear();
                    renderer.render(scene, camera);

                }

            }


        }
    }, []);
    return (
        <div>
            <div ref={refContainer} style={{
                zIndex: -100,
                position: "fixed"
            }}></div>

        </div>
    );
};

export default TreeJsBackground;