import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PointMaterial, Points } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Generates positions and per-vertex colors for a spherical particle cloud.
 */
function generateParticleData(
  count: number,
  minRadius: number,
  maxRadius: number,
  colorCenter: THREE.Color,
  colorEdge: THREE.Color,
  whiteNoiseRatio = 0.05
) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    // Spherical distribution with radius variation
    const r = minRadius + Math.random() * (maxRadius - minRadius)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    // Color based on radius ratio (0 near center, 1 at outer edge)
    const t = (r - minRadius) / (maxRadius - minRadius)
    let color: THREE.Color

    // Add some random white stars for sparkle
    if (Math.random() < whiteNoiseRatio) {
      color = new THREE.Color(0xffffff)
    } else {
      color = colorCenter.clone().lerp(colorEdge, t)
      // Slight random hue shift for extra richness
      color.offsetHSL(0, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.2)
    }

    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  return { positions, colors }
}

function ParticleSphere({ darkMode }: { darkMode: boolean }) {
  const outerRef = useRef<THREE.Points>(null)
  const innerRef = useRef<THREE.Points>(null)
  const starRef = useRef<THREE.Points>(null)

  const particleCount = 2200
  const starCount = 800

  // Outer cloud: deep blue to electric cyan
  const outerData = useMemo(() => {
    const centerColor = new THREE.Color(0x1e3a8a) // deep blue
    const edgeColor = new THREE.Color(0x06b6d4) // cyan
    return generateParticleData(particleCount, 1.8, 3.4, centerColor, edgeColor, 0.03)
  }, [])

  // Inner cloud: rich violet to magenta/pink
  const innerData = useMemo(() => {
    const centerColor = new THREE.Color(0x4c1d95) // deep violet
    const edgeColor = new THREE.Color(0xec4899) // vibrant pink
    return generateParticleData(particleCount, 0.9, 2.1, centerColor, edgeColor, 0.02)
  }, [])

  // Starfield background: scattered tiny stars in a larger sphere
  const starData = useMemo(() => {
    const positions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      // Distribute in a large sphere radius 7 to 12 units
      const r = 7 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    // All white with slight opacity variation
    const colors = new Float32Array(starCount * 3).map(() => 0.8 + Math.random() * 0.2)
    return { positions, colors }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const pointerX = state.pointer.x
    const pointerY = state.pointer.y

    if (outerRef.current) {
      // Elegant, slower base rotation + parallax
      outerRef.current.rotation.y = t * 0.04
      outerRef.current.rotation.x = t * 0.02
      outerRef.current.rotation.y += (pointerX * 0.6 - outerRef.current.rotation.y) * 0.03
      outerRef.current.rotation.x += (-pointerY * 0.4 - outerRef.current.rotation.x) * 0.03
    }

    if (innerRef.current) {
      // Opposite direction for dynamic layering
      innerRef.current.rotation.y = -t * 0.06
      innerRef.current.rotation.z = t * 0.02
      innerRef.current.rotation.y += (-pointerX * 0.5 - innerRef.current.rotation.y) * 0.03
      innerRef.current.rotation.x += (pointerY * 0.3 - innerRef.current.rotation.x) * 0.03
    }

    if (starRef.current) {
      // Very slow background drift
      starRef.current.rotation.y = t * 0.01
      starRef.current.rotation.x = t * 0.005
    }
  })

  // Opacity based on dark mode
  const outerOpacity = darkMode ? 0.85 : 0.7
  const innerOpacity = darkMode ? 0.9 : 0.75
  const starOpacity = darkMode ? 0.5 : 0.35

  return (
    <group>
      {/* Outer particle cloud */}
      <Points ref={outerRef} positions={outerData.positions} colors={outerData.colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.055}
          sizeAttenuation
          depthWrite={false}
          opacity={outerOpacity}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Inner particle cloud */}
      <Points ref={innerRef} positions={innerData.positions} colors={innerData.colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.045}
          sizeAttenuation
          depthWrite={false}
          opacity={innerOpacity}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Background starfield */}
      <Points ref={starRef} positions={starData.positions} colors={starData.colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.025}
          sizeAttenuation
          depthWrite={false}
          opacity={starOpacity}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Central subtle glow dome */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Ambient fill light */}
      <ambientLight intensity={0.15} />
      <pointLight position={[2, 3, 4]} intensity={0.5} color="#4c1d95" />
      <pointLight position={[-2, 1, 3]} intensity={0.4} color="#06b6d4" />
    </group>
  )
}

export default function Canvas3D({ darkMode = false }: { darkMode?: boolean }) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '420px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 55 }}
        style={{ pointerEvents: 'auto', background: 'transparent' }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ParticleSphere darkMode={darkMode} />
        </Suspense>
      </Canvas>
    </div>
  )
}