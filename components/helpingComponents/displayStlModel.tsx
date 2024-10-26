import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Html, Center } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

const Model = ({ url }: { url: string }) => {
  const geometry = useLoader(STLLoader, url) as THREE.BufferGeometry;
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    if (groupRef.current) {
      // Get the bounding box of the model
      const boundingBox = new THREE.Box3().setFromObject(groupRef.current);
      const center = boundingBox.getCenter(new THREE.Vector3());
      const size = boundingBox.getSize(new THREE.Vector3());
      
      // Calculate the radius of the bounding sphere
      const radius = Math.max(size.x, size.y, size.z) * 0.5;
      
      // Calculate camera position based on model size
      const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
      const distance = radius / Math.sin(fov / 2);
      
      camera.position.set(0, 0, distance);
      camera.near = distance / 100;
      camera.far = distance * 100;
      camera.lookAt(center);
      camera.updateProjectionMatrix();

      // Center the model
      groupRef.current.position.set(-center.x, -center.y, -center.z);
    }
  }, [geometry, camera]);

  return (
    <Center>
      <group ref={groupRef}>
        {/* Main mesh */}
        <mesh 
          geometry={geometry}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
        >
          <meshPhongMaterial 
            color="#e0e0e0"
            specular="#ffffff"
            shininess={100}
          />
        </mesh>
        
        {/* Edge wireframe */}
        <mesh 
          geometry={geometry}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
        >
          <meshBasicMaterial
            color="#000000"
            wireframe={true}
            wireframeLinewidth={1}
            transparent={true}
            opacity={0.15}
          />
        </mesh>
        
        {/* Edge highlighting */}
        <lineSegments
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
        >
          <edgesGeometry args={[geometry]} />
          <lineBasicMaterial 
            color="#000000" 
            opacity={0.3}
            transparent={true}
          />
        </lineSegments>
      </group>
    </Center>
  );
};

const LoadingIndicator = () => {
  return (
    <Html center>
      <div className="text-blue-500 text-lg">Loading...</div>
    </Html>
  );
};

const STLViewer = ({ url = '/sample.stl' }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true
        }}
        camera={{ 
          fov: 45,
          near: 0.1,
          far: 50000,
          position: [0, 0, 1400]
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <PerspectiveCamera 
            makeDefault 
            fov={45}
          />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Model url={url} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default STLViewer;