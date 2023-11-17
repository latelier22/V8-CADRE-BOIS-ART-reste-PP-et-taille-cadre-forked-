import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { fabric } from 'fabric'
import * as THREE from 'three'

export function CadreBois(props) {
  const { nodes, materials } = useGLTF('/baguette.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials.Material}
        position={[-0.008, -15, 0]}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials.Material}
        position={[-0.008, 15, 0]}
        rotation={[Math.PI, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials.Material}
        position={[-11, 0, 0]}
        rotation={[Math.PI, 0, -1.571]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials.Material}
        position={[11, 0, 0]}
        rotation={[Math.PI, 0, 1.571]}
      />
    </group>
  )
}

useGLTF.preload('/baguette.gltf')

export default CadreBois
