'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// 🧩 Lanyard models path
const cardGLB = '/models/card.glb';
import cardLanyard from '../../assets/Lanyard/card lanyard.png';
import lanyard from '../../assets/Lanyard/lanyard.png';
import dhanushPhoto from '../../assets/images/dhanush.jpg';

extend({ MeshLineGeometry, MeshLineMaterial });

// Custom hook to create a high-resolution CanvasTexture for Dhanush's security badge matching GLTF UV mapping
function useCardTexture(photoUrl) {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const baseImg = new Image();
    const profileImg = new Image();

    let loadedCount = 0;
    const onLoad = () => {
      loadedCount++;
      if (loadedCount === 2) {
        renderCanvas();
      }
    };

    baseImg.src = cardLanyard;
    profileImg.src = photoUrl;

    baseImg.onload = onLoad;
    profileImg.onload = onLoad;

    const renderCanvas = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // 1. Draw custom background gradient for front card (left half: x: 0 to 512)
      const frontGrad = ctx.createLinearGradient(0, 0, 512, 1024);
      frontGrad.addColorStop(0, '#0a061b');
      frontGrad.addColorStop(0.5, '#150a36');
      frontGrad.addColorStop(1, '#05020c');
      ctx.fillStyle = frontGrad;
      ctx.fillRect(0, 0, 512, 1024);

      // Draw subtle front tech grid lines in soft violet/teal
      ctx.strokeStyle = 'rgba(0, 255, 208, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 512; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 1024);
        ctx.stroke();
      }
      for (let i = 0; i < 1024; i += 32) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }

      // 2. Draw Dhanush's photo with neon emerald frame border
      ctx.save();
      ctx.filter = 'brightness(1.15) contrast(1.1)';
      ctx.drawImage(profileImg, 0, 85, 340, 475);
      ctx.restore();

      // Top Security Pass strip on Front (deep violet)
      ctx.fillStyle = '#6d28d9';
      ctx.fillRect(0, 0, 512, 75);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('LEVEL 5 CLEARANCE // ACCESS PASS', 256, 46);

      // Photo frame highlight bar (neon emerald)
      ctx.fillStyle = '#00ffd0';
      ctx.fillRect(337, 85, 3, 475);

      // Write vertical text "DHANUSH"
      ctx.save();
      ctx.translate(430, 512);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = 'rgba(167, 139, 250, 0.2)'; // semi-transparent violet
      ctx.font = 'bold 95px "Courier New", Courier, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('DHANUSH', 0, 0);
      ctx.restore();

      // Write a secondary vertical label "AI DEVS"
      ctx.save();
      ctx.translate(480, 512);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = '#00ffd0';
      ctx.font = 'bold 24px "Courier New", Courier, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('DS ACCESS // SECURE', 0, 0);
      ctx.restore();

      // 3. Draw custom Name Label over the old name area
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(25, 575, 360, 115, 16);
      } else {
        ctx.rect(25, 575, 360, 115);
      }
      ctx.fill();

      // Name Text
      ctx.fillStyle = '#0f0826';
      ctx.font = 'bold 36px "Courier New", Courier, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('DHANUSH S.', 205, 618);

      // Role Capsule (deep violet/indigo)
      ctx.fillStyle = '#1e1b4b';
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(45, 635, 320, 42, 10);
      } else {
        ctx.rect(45, 635, 320, 42);
      }
      ctx.fill();

      ctx.fillStyle = '#00ffd0'; // Neon emerald/teal text
      ctx.font = 'bold 20px "Courier New", Courier, monospace';
      ctx.fillText('AI & SAAS BUILDER', 205, 662);

      // Add a small barcode under the name tag
      ctx.fillStyle = '#ffffff';
      const barcodeY = 715;
      const barcodeHeight = 50;
      const barcodeWidths = [8, 4, 12, 6, 4, 10, 18, 4, 6, 12, 10, 4, 18, 6, 4, 10, 6, 12, 4, 8, 18, 4];
      let currentX = 50;
      barcodeWidths.forEach((w, index) => {
        ctx.fillStyle = index % 2 === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0)';
        ctx.fillRect(currentX, barcodeY, w * 1.3, barcodeHeight);
        currentX += w * 1.3;
      });

      // 4. Draw back of the card custom design (right half: x from 512 to 1024)
      ctx.fillStyle = '#030107';
      ctx.fillRect(512, 0, 512, 1024);

      const backGrad = ctx.createLinearGradient(512, 0, 1024, 1024);
      backGrad.addColorStop(0, '#05020c');
      backGrad.addColorStop(0.5, '#11082d');
      backGrad.addColorStop(1, '#020105');
      ctx.fillStyle = backGrad;
      ctx.fillRect(512, 0, 512, 1024);

      // Draw subtle grid on back side
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 512; i < 1024; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 1024);
        ctx.stroke();
      }
      for (let i = 0; i < 1024; i += 32) {
        ctx.beginPath();
        ctx.moveTo(512, i);
        ctx.lineTo(1024, i);
        ctx.stroke();
      }

      // Draw central circle & logo (violet with neon emerald core)
      ctx.strokeStyle = '#6d28d9';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(768, 512, 120, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0, 255, 208, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(768, 512, 140, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#00ffd0';
      ctx.font = 'bold 80px "Courier New", Courier, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('DS', 768, 540);

      ctx.fillStyle = '#a78bfa';
      ctx.font = 'bold 22px "Courier New", Courier, monospace';
      ctx.fillText('SECURITY CLEARANCE LEVEL 5', 768, 720);
      ctx.fillStyle = '#ef4444'; // Red alarm accent
      ctx.fillText('SYSTEM INITIATED // V1.0', 768, 760);

      // Red Clearance Strip on the back too
      ctx.fillStyle = '#6d28d9';
      ctx.fillRect(512, 0, 512, 75);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px "Courier New", monospace';
      ctx.fillText('DS SYSTEM // ACCESS PASS', 768, 48);

      const tex = new THREE.CanvasTexture(canvas);
      tex.flipY = false; // Match the GLTF texture orientation mapping
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
