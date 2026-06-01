'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// 🧩 Lanyard models path
const cardGLB = '/models/card.glb';
import lanyard from '../../assets/Lanyard/lanyard.png';
import dhanushPhoto from '../../assets/images/dhanush.jpg';

extend({ MeshLineGeometry, MeshLineMaterial });

// Custom hook to create a high-resolution CanvasTexture for Dhanush's security badge
function useCardTexture(photoUrl) {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // 1. Draw premium dark cyber gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, '#0a0d1a');
    grad.addColorStop(0.5, '#060810');
    grad.addColorStop(1, '#020306');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // 2. Draw subtle tech grid
    ctx.strokeStyle = 'rgba(0, 255, 220, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 1024; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 1024);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1024, i);
      ctx.stroke();
    }

    // 3. Top Security Clearance Strip
    ctx.fillStyle = '#b62424'; // Cyber red stripe
    ctx.fillRect(0, 0, 1024, 70);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('LEVEL 5 CLEARANCE // SECURITY PASS', 512, 45);

    // 4. Picture Frame Border
    ctx.strokeStyle = '#00ffdc';
    ctx.lineWidth = 6;
    ctx.strokeRect(362, 130, 300, 300);

    // 5. Draw Profile Photo
    const img = new Image();
    img.src = photoUrl;
    img.onload = () => {
      // Draw Dhanush's photo
      ctx.drawImage(img, 365, 133, 294, 294);

      // Name Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 54px "Courier New", Courier, monospace';
      ctx.fillText('DHANUSH SIDDILINGAM', 512, 510);

      // Role / Designation
      ctx.fillStyle = '#00ffdc';
      ctx.font = 'bold 34px "Courier New", Courier, monospace';
      ctx.fillText('AI DEVELOPER & SAAS BUILDER', 512, 570);

      // Security Metadata Fields
      ctx.fillStyle = '#7a8ba3';
      ctx.font = 'bold 24px "Courier New", Courier, monospace';
      ctx.fillText('ID: DS-792-LEVEL5', 512, 630);
      ctx.fillText('DEPT: FULL-STACK AI DEVS', 512, 670);
      ctx.fillText('CLEARANCE: LEVEL 5 // TOP SECRET', 512, 710);

      // Draw custom barcode lines
      ctx.fillStyle = '#ffffff';
      const barcodeY = 760;
      const barcodeHeight = 90;
      const barcodeWidths = [12, 6, 18, 10, 4, 14, 28, 6, 8, 18, 14, 4, 28, 8, 4, 14, 8, 18, 4, 12, 28, 4];
      let currentX = 260;
      barcodeWidths.forEach((w, index) => {
        ctx.fillStyle = index % 2 === 0 ? '#ffffff' : '#000000';
        ctx.fillRect(currentX, barcodeY, w * 1.5, barcodeHeight);
        currentX += w * 1.5;
      });

      // Bottom cyber pass title
      ctx.fillStyle = 'rgba(0, 255, 220, 0.12)';
      ctx.font = 'bold 90px "Courier New", Courier, monospace';
      ctx.fillText('DS SYSTEM v1.0', 512, 970);

      // Generate Three.js texture
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.needsUpdate = true;
      setTexture(tex);
    };
  }, [photoUrl]);

  return texture;
}

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position: position, fov: fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyard);
  const customCardTex = useCardTexture(dhanushPhoto);

  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.50, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={customCardTex || materials.base.map} map-anisotropy={16} clearcoat={1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.8} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
