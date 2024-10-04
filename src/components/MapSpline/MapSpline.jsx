import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import styles from './MapSpline.module.css';

const MapSpline = ({ selectedCategory }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#a2d6ff');

    const camera = new THREE.PerspectiveCamera(22, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(80, 25, 70);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.minPolarAngle = Math.PI / 2.8; // Limitar para cima
    controls.maxPolarAngle = Math.PI / 3; // Limitar para baixo
    controls.minDistance = 10; // Zoom mínimo
    controls.maxDistance = 170; // Zoom máximo

    //luz ambiente
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    //luz direcional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.1);
    directionalLight.position.set(20, 20, 20); //Posição
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      '/map/map.glb',
      function (glb) {
        const root = glb.scene;
        scene.add(root);

        root.traverse((child) => {
          if (child.isMesh) {
            child.material = child.material.clone();
            child.material.needsUpdate = true;

            // Definir as cores iniciais
            if (child.name.startsWith('CD')) {
              child.material.color.set('#00a4fd'); // Caixas D'água
            } else if (child.name.startsWith('PB')) {
              child.material.color.set('#007bc0'); // Poços de Bombeamento
            } else if (child.name.startsWith('PM')) {
              child.material.color.set('#419e98'); // Poços de Monitoramento
            } else if (child.name.startsWith('PT')) {
              child.material.color.set('#d543cb'); // Poços de Tratamento
            } else if (child.name.startsWith('ETAS')) {
              child.material.color.set('#f05f22'); // ETAS
            } else if (child.name.startsWith('HD')) {
              child.material.color.set('#6d46c8'); // Hidrômetros
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
            } else if (child.name.startsWith('texto_ponto')) {
              child.material.color.set('#FFFFFF'); // Texto dos pontos
            }

            const isPointOrText =
              child.name.startsWith('CD') ||
              child.name.startsWith('PB') ||
              child.name.startsWith('PM') ||
              child.name.startsWith('PT') ||
              child.name.startsWith('ETAS') ||
              child.name.startsWith('HD') ||
              child.name.startsWith('texto_ponto_');

            // Lógica para mostrar apenas os pontos e textos correspondentes
            if (isPointOrText && selectedCategory) {
              if (
                child.name.startsWith(selectedCategory) ||
                child.name.startsWith(`texto_ponto_${selectedCategory.toLowerCase()}`)
              ) {
                // Se o child é da categoria selecionada ou do texto associado, ele é mostrado
                child.visible = true;
              } else {
                // Caso contrário, é ocultado
                child.visible = false;
              }
            } else if (isPointOrText) {
              // Se nenhuma categoria estiver selecionada, todos os pontos são mostrados
              child.visible = true;
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
      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedCategory]);

  return <canvas ref={canvasRef} className={styles.sizemap}></canvas>;
};

export default MapSpline;
