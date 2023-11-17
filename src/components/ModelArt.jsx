import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { fabric } from 'fabric'
import * as THREE from 'three'

function ModelArt(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/ModelArt2.gltf')
  const { gl } = useThree()
  const Size = new THREE.Vector3()

  nodes.IMPRESSION.geometry.boundingBox.getSize(Size)

  // Changer la taille du modèle

  const { nodes: nodes2, materials: materials2 } = useGLTF('/ModelArt3.gltf') // Modification ici

  const newGeometry = nodes2.IMPRESSION.children[0].geometry
  const newMaterial = materials2['Map-Material']

  let canvas = Array.from(document.getElementsByTagName('canvas'))[1],
    ctx,
    texture
  ctx = canvas.getContext('2d')
  texture = new THREE.CanvasTexture(ctx.canvas)
  texture.flipY = false // Vous pouvez essayer true si nécessaire.

  texture.anisotropy = gl.capabilities.getMaxAnisotropy()
  texture.needsUpdate = true
  /* ANIMATION */

  useFrame((state, delta) => {
    if (props.animation) {
      group.current.rotation.z += 0.01 * 3 // Vitesse de rotation
    }
    texture.needsUpdate = true
  })

  return (
    // DESCRIPTION DU MODELE
    <>
      <group {...props} position={[0, -2.1, 0]} rotation={[0, Math.PI / 2, 0]} dispose={null}>
        <mesh castShadow receiveShadow geometry={newGeometry} material={newMaterial} scale={0.02}>
          <meshStandardMaterial attach="material" map={texture}>
            <canvasTexture attach="map" image={canvas} />
          </meshStandardMaterial>
        </mesh>
      </group>
    </>
  )
}

useGLTF.preload('/ModelArt2.gltf')

export default ModelArt
