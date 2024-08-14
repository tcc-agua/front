import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import styles from './MapSpline.module.css';

const MapSpline = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const app = new Application(canvas);
    app.load('https://prod.spline.design/rc7amONcMUaQ-lQo/scene.splinecode');

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(1, 1, 1);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    handleResize(); // Call once to set the initial size

    window.addEventListener('resize', handleResize);

    const tick = () => {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up resources if necessary
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.sizemap}></canvas>;
};

export default MapSpline;
