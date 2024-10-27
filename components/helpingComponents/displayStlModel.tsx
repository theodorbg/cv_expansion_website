import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Center, Edges } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

// Cache to store loaded geometries
const geometryCache = new Map<string, THREE.BufferGeometry>();

const Model = ({ url, onLoaded }: { url: string; onLoaded?: (size: THREE.Vector3) => void }) => {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Use useMemo to create the material only once
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#808080",
    roughness: 0.5,
    metalness: 0.5
  }), []);

  useEffect(() => {
    // Check if geometry is already in cache
    if (geometryCache.has(url)) {
      const cachedGeometry = geometryCache.get(url)!;
      setGeometry(cachedGeometry);
      
      if (cachedGeometry.boundingBox && onLoaded) {
        const size = new THREE.Vector3();
        cachedGeometry.boundingBox.getSize(size);
        onLoaded(size);
      }
      return;
    }

    // If not in cache, load it
    const loader = new STLLoader();
    loader.load(url, (loadedGeometry) => {
      loadedGeometry.center();
      loadedGeometry.computeVertexNormals();
      loadedGeometry.computeBoundingBox();
      loadedGeometry.rotateY(Math.PI/2);

      // Store in cache
      geometryCache.set(url, loadedGeometry);
      setGeometry(loadedGeometry);

      if (loadedGeometry.boundingBox && onLoaded) {
        const size = new THREE.Vector3();
        loadedGeometry.boundingBox.getSize(size);
        onLoaded(size);
      }
    });
  }, [url, onLoaded]);

  // Use useFrame with a stable rotation speed
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
    }
  });

  if (!geometry) return null;

  return (
    <mesh ref={meshRef} geometry={geometry} material={material}>
      <Edges
        threshold={15}
        color="black"
      />
    </mesh>
  );
};

const CameraController = ({ size, modelScale }: { size: THREE.Vector3, modelScale: number }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (size) {
      const maxDimension = Math.max(size.x, size.y, size.z);
      const distance = maxDimension * modelScale;

      camera.position.set(0, -distance, 0);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [size, camera]);

  return null;
};

interface STLViewerProps {
  url?: string;
  modelScale?: number;
}

const STLViewer: React.FC<STLViewerProps> = ({ url = '/projectPictures/dart/dart2.STL', modelScale = 1.5 }) => {
  const [modelSize, setModelSize] = useState<THREE.Vector3 | null>(null);

  const handleModelLoaded = (size: THREE.Vector3) => {
    setModelSize(size);
  };

  // Memoize the camera settings
  const cameraSettings = useMemo(() => ({
    fov: 45,
    near: 0.1,
    far: 20000,
    position: [0, -5000, 0] as [number, number, number],
    up: new THREE.Vector3(1, 0, 0)
  }), []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '8px',
    }}>
      <Canvas
        camera={cameraSettings}
        style={{ background: 'transparent' }}
      >
        {modelSize && <CameraController size={modelSize} modelScale={modelScale} />}

        <ambientLight intensity={0.6} />
        <hemisphereLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={0.8}
          castShadow
        />

        <Center>
          <Model url={url} onLoaded={handleModelLoaded} />
        </Center>

        <OrbitControls
          enableDamping={false}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          up={new THREE.Vector3(1, 0, 0)}
        />
      </Canvas>
    </div>
  );
};

export default STLViewer;