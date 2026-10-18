import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { flavors } from '../data'
import { drawLabel } from '../canLabel'

const OFF = 5 // distance (scene units) a can travels above / below the screen

function Can({ flavor, active, exiting, dir, mouse }) {
  const slide = useRef()
  const tilt = useRef()
  const target = useRef(-OFF)
  const wasActive = useRef(false)
  const { size } = useThree()
  const scale = THREE.MathUtils.clamp(size.width / 820, 0.75, 1.15)

  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(drawLabel(flavor))
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return t
  }, [flavor])

  // New active can starts off-screen on the entry side; the previous one leaves the opposite way.
  useEffect(() => {
    if (active) {
      if (!wasActive.current && slide.current) slide.current.position.y = -dir * OFF
      target.current = 0
    } else if (exiting) {
      target.current = dir * OFF
    }
    wasActive.current = active
  }, [active, exiting, dir])

  useFrame((state, dt) => {
    const g = slide.current
    const t = tilt.current
    if (!g || !t) return
    g.position.y = THREE.MathUtils.damp(g.position.y, target.current, 3.2, dt)
    const off = g.position.y
    const time = state.clock.elapsedTime
    t.position.y = Math.sin(time * 1.2) * 0.07
    t.rotation.z = -0.32 + Math.sin(time * 0.9) * 0.05 + off * 0.12
    t.rotation.x = 0.12 - mouse.current.y * 0.15 + off * 0.05
    t.rotation.y = Math.PI + Math.sin(time * 0.6) * 0.3 + mouse.current.x * 0.45 + off * 0.5
  })

  const { rim } = flavor.can

  return (
    <group ref={slide} position={[0, -OFF, 0]}>
      <group ref={tilt} scale={scale}>
        <mesh>
          <cylinderGeometry args={[0.55, 0.55, 1.5, 64, 1]} />
          <meshStandardMaterial attach="material-0" map={texture} roughness={0.35} metalness={0.1} />
          <meshStandardMaterial attach="material-1" color={rim} roughness={0.3} metalness={0.5} />
          <meshStandardMaterial attach="material-2" color={rim} roughness={0.3} metalness={0.5} />
        </mesh>

        {[0.75, -0.75].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55, 0.03, 16, 64]} />
            <meshStandardMaterial color="#d6d6d6" metalness={0.9} roughness={0.25} />
          </mesh>
        ))}

        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.5, 0.52, 0.06, 48]} />
          <meshStandardMaterial color={rim} roughness={0.35} metalness={0.5} />
        </mesh>

        {flavor.can.dollop && (
          <mesh position={[0, 0.84, 0]} scale={[1, 0.42, 1]}>
            <sphereGeometry args={[0.42, 32, 16]} />
            <meshStandardMaterial color="#fff7ea" roughness={0.6} />
          </mesh>
        )}

        <mesh position={[0.1, 1.3, 0]} rotation={[0, 0, -0.18]}>
          <cylinderGeometry args={[0.028, 0.028, 1.1, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      </group>
    </group>
  )
}

export default function CanScene({ index, prev, dir, mouse }) {
  return (
    <div className="can-wrap">
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={2.4} />
        <directionalLight position={[-4, -1, 3]} intensity={0.9} color="#ffd9a8" />
        {flavors.map((f, i) => (
          <Can key={f.id} flavor={f} active={i === index} exiting={i === prev && prev !== index} dir={dir} mouse={mouse} />
        ))}
      </Canvas>
    </div>
  )
}
