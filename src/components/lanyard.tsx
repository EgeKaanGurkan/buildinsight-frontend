// @ts-nocheck
"use client"

import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber"
import { useTexture, Environment, Lightformer, Html } from "@react-three/drei"
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier"
import { MeshLineGeometry, MeshLineMaterial } from "meshline"
import { useControls } from "leva"
import type { RapierRigidBody } from "@react-three/rapier"

// Extend RigidBody type to include lerped property for smooth animation
interface ExtendedRigidBody extends RapierRigidBody {
  lerped?: THREE.Vector3
}

extend({ MeshLineGeometry, MeshLineMaterial })
useTexture.preload(
  // "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg",
  "/banner.png"
)

export interface LanyardProps {
  name?: string;
  email?: string;
}

export default function Lanyard({ name, email }: LanyardProps) {
  const { debug } = useControls({ debug: false })
  return (
    <div className="w-full h-screen">
      {" "}
      {/* Ensure canvas takes full space */}
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <ambientLight intensity={Math.PI} />
        <Physics debug={debug} interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band name={name} email={email} />
        </Physics>
        <Environment background blur={0.75}>
          <color attach="background" args={["black"]} />
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  )
}

function Band({ maxSpeed = 50, minSpeed = 10, name, email }: { maxSpeed?: number; minSpeed?: number; name?: string; email?: string }) {
  const band = useRef<THREE.Mesh>(null)
  const fixed = useRef<ExtendedRigidBody | null>(null)
  const j1 = useRef<ExtendedRigidBody | null>(null)
  const j2 = useRef<ExtendedRigidBody | null>(null)
  const j3 = useRef<ExtendedRigidBody | null>(null)
  const card = useRef<ExtendedRigidBody | null>(null)
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3() // prettier-ignore
  const segmentProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 2,
    linearDamping: 2,
  }
  const texture = useTexture(
    // "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg",
    "/banner.png"
  )
  const cardTexture = useTexture("/gradient-bg.jpeg")
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
  )
  const [dragged, drag] = useState<false | THREE.Vector3>(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]) // prettier-ignore

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab"
      return () => void (document.body.style.cursor = "auto")
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      ;[j1, j2].forEach((ref) => {
        if (ref.current && !ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        }
        if (ref.current && ref.current.lerped) {
          const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
          ref.current.lerped.lerp(
            ref.current.translation(),
            delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
          )
        }
      })
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped!)
      curve.points[2].copy(j1.current.lerped!)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(32))
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  curve.curveType = "chordal"
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[0, 5, 0]} rotation={[0, 0, 20]} className="">
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
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={1.5}
            position={[0, -0.4, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current?.translation() || new THREE.Vector3())))
            )}
          >
            <mesh>
              <boxGeometry args={[1, 1.4, 0.001]} />
              <meshPhysicalMaterial
                map={cardTexture}
                roughness={0.1}
                metalness={0.1}
                clearcoat={0.8}
                clearcoatRoughness={0.2}
              />
            </mesh>

            {/* HTML Content Overlay - UPDATED with new layout */}
            <Html transform occlude position={[0, 0, 0.02]} rotation={[0, 0, 0]} scale={0.1} wrapperClass="flex">
              <div
                className="flex flex-col justify-between text-black tracking-tighter select-none overflow-hidden p-6 pointer-events-none"
                style={{ width: "400px", height: "500px" }}
              >
                {/* Top Right: Glassmorphic Chip */}
                <div className="flex justify-between w-full gap-2">
                  <div className="flex flex-col">
                    <p className="font-semibold text-black tracking-tight text-xl">
                      buildsinsight.dev
                    </p>
                    <p className="font-medium text-black tracking-tighter">
                      Your next gen UX solution
                    </p>
                  </div>
                </div>

                {/* Bottom Left: Name and Email */}
                <div className="flex flex-col pointer-events-none gap-3">
                  <p className="font-medium text-white text-7xl tracking-tight">{name || "Enter On Form"}</p>
                  {email && (
                    <p className="text-white font-medium text-xl">
                      {email}
                    </p>
                  )}
                </div>
              </div>
            </Html>

            <mesh position={[0, 1.0, 0.02]}>
              <boxGeometry args={[0.3, 0.1, 0.05]} />
              <meshPhysicalMaterial color="#666666" roughness={0.3} metalness={0.8} />
            </mesh>

            <mesh position={[0, 1.15, 0.04]}>
              <cylinderGeometry args={[0.05, 0.05, 0.03]} />
              <meshPhysicalMaterial color="#888888" roughness={0.3} metalness={0.8} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}

