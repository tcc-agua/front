import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useTheme } from '../ThemeContext/ThemeContext';
import styles from './MapSpline.module.css';


const MapSpline = () => {
  const canvasRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();

    scene.background = new THREE.Color('#a2d6ff');

    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(40, 20, 50);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    //luz ambiente
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    //luz direcional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
    directionalLight.position.set(20, 20, 20); //Posição
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      '/map/map.glb',
      function (glb) {
        console.log(glb);
        const root = glb.scene;
        scene.add(root);

        root.traverse((child) => {
          if (child.isMesh) {
            child.material = child.material.clone();
            console.log(`Objeto: ${child.name}, Material: ${child.material.name}`);
            child.material.needsUpdate = true;

            if (child.name.startsWith('wall')) {
              child.material.color.set('#f5f5f5'); // Branco
            } else if (child.name.startsWith('CD')) {
              child.material.color.set('#00a4fd'); // Caixas D'água
            } else if (child.name.startsWith('PB')) {
              child.material.color.set('#007bc0'); // Poços de Bombeamento
            } else if (child.name.startsWith('PT')) {
              child.material.color.set('#d543cb'); // Poços de Tratamento
            } else if (child.name.startsWith('PM')) {
              child.material.color.set('#419e98'); // Poços de Monitoramento
            } else if (child.name.startsWith('window')) {
              child.material.color.set('#01a4fd'); // Janelas
            } else if (child.name.startsWith('piso')) {
              child.material.color.set('#b8b8b8'); // Calçada
            } else if (child.name.startsWith('stairs')) {
              child.material.color.set('#FFE6A6'); // Escadas
            } else if (child.name.startsWith('steel')) {
              child.material.color.set('#797e86'); // Grades
            } else if (child.name.startsWith('tube')) {
              child.material.color.set('#7f8a97'); // Canos
            } else if (child.name.startsWith('door')) {
              child.material.color.set('#5c5c5c'); // Portas
            } else if (child.name.startsWith('darkgray')) {
              child.material.color.set('#6B6B75'); // Janelas escuras
            } else if (child.name.startsWith('red')) {
              child.material.color.set('#C01717'); // Bosch
            } else if (child.name.startsWith('babyblue')) {
              child.material.color.set('#CADEFF'); // Azul claro
            } else if (child.name.startsWith('lightgray')) {
              child.material.color.set('#e0e0e0'); // Detalhes cinza claro
            }
          }
        });
      },
      undefined,
      (error) => {
        console.error('Erro ao carregar o modelo:', error);
      }
    );

    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    const tick = () => {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return <canvas ref={canvasRef} className={styles.sizemap}></canvas>;
};

export default MapSpline;