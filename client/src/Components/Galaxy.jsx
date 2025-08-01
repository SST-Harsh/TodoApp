
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Galaxy = ({
  mouseRepulsion = true,
  mouseInteraction = true,
  density = 1.5,
  glowIntensity = 0.5,
  saturation = 0.8,
  hueShift = 240
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0, lastTime: 0 });
  
  useEffect(() => {
    // Initialize Three.js
    init();
    
    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    // Handle mouse movement
    const handleMouseMove = (e) => {
      const now = performance.now();
      const mouse = mouseRef.current;
      
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      if (mouse.lastTime) {
        const dt = now - mouse.lastTime;
        const dx = e.clientX - mouse.lastX;
        const dy = e.clientY - mouse.lastY;
        
        mouse.vx = (dx / dt) * 1000;
        mouse.vy = (dy / dt) * 1000;
      }
      
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      mouse.lastTime = now;
    };
    
    window.addEventListener('resize', handleResize);
    if (mouseInteraction || mouseRepulsion) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (sceneRef.current) {
        while(sceneRef.current.children.length > 0) { 
          sceneRef.current.remove(sceneRef.current.children[0]); 
        }
      }
    };
  }, [mouseInteraction, mouseRepulsion]);
  
  const init = () => {
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 15;
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    
    containerRef.current.appendChild(renderer.domElement);
    
    // Create galaxy
    createGalaxy();
  };
  
  const createGalaxy = () => {
    const scene = sceneRef.current;
    const starCount = Math.floor(window.innerWidth * window.innerHeight * density / 10000);
    const stars = [];
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      // Position
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 20;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      // Color
      const hue = (Math.random() * 60 + hueShift) % 360;
      const saturationVal = saturation * 100;
      const lightness = 50 + Math.random() * 50 * glowIntensity;
      const color = new THREE.Color(`hsl(${hue}, ${saturationVal}%, ${lightness}%)`);
      
      // Create star
      const geometry = new THREE.SphereGeometry(0.05 + Math.random() * 0.1, 8, 8);
      const material = new THREE.MeshBasicMaterial({ 
        color,
        transparent: true,
        opacity: 0.8
      });
      
      const star = new THREE.Mesh(geometry, material);
      star.position.set(x, y, z);
      star.userData.originalPosition = new THREE.Vector3(x, y, z);
      star.userData.speed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005
      );
      
      scene.add(star);
      stars.push(star);
    }
    
    starsRef.current = stars;
  };
  
  const animate = () => {
    requestAnimationFrame(animate);
    
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const stars = starsRef.current;
    const mouse = mouseRef.current;
    
    if (!scene || !camera || !renderer) return;
    
    // Slightly rotate camera for subtle movement
    camera.position.x = Math.sin(Date.now() * 0.0001) * 2;
    camera.position.y = Math.cos(Date.now() * 0.0001) * 2;
    camera.lookAt(scene.position);
    
    // Update stars
    stars.forEach(star => {
      // Natural movement
      star.position.x += star.userData.speed.x;
      star.position.y += star.userData.speed.y;
      star.position.z += star.userData.speed.z;
      
      // Mouse interaction
      if (mouseInteraction) {
        const dx = star.position.x - (mouse.x * 20);
        const dy = star.position.y - (mouse.y * 20);
        const dz = star.position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < 5) {
          const force = (5 - distance) * 0.02;
          star.position.x += dx * force;
          star.position.y += dy * force;
        }
      }
      
      // Mouse repulsion
      if (mouseRepulsion && (Math.abs(mouse.vx) > 10 || Math.abs(mouse.vy) > 10)) {
        const dx = star.position.x - (mouse.x * 20);
        const dy = star.position.y - (mouse.y * 20);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 8) {
          const force = (8 - distance) * 0.01;
          star.position.x -= mouse.vx * 0.0005 * force;
          star.position.y += mouse.vy * 0.0005 * force;
        }
      }
      
      // Return to original position gradually
      const returnSpeed = 0.01;
      star.position.x += (star.userData.originalPosition.x - star.position.x) * returnSpeed;
      star.position.y += (star.userData.originalPosition.y - star.position.y) * returnSpeed;
      star.position.z += (star.userData.originalPosition.z - star.position.z) * returnSpeed;
      
      // Pulsing effect
      const scale = 0.8 + Math.sin(Date.now() * 0.001 + star.position.x) * 0.2;
      star.scale.set(scale, scale, scale);
    });
    
    renderer.render(scene, camera);
  };
  
  return <div ref={containerRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />;
};

export default Galaxy;