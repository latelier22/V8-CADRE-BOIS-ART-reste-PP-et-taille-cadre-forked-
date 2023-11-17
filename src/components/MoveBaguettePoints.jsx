// MoveBaguettePoints.js
import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { PointsMaterial } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function MoveBaguettePoints(props) {
  const { nodes, materials } = useGLTF('/BaguetteTextureMelange.gltf')

  console.log(nodes.Baguette)

  const pmaterial = new THREE.PointsMaterial({ color: 0xff0000 })
  pmaterial.size = 0.5

  // Clone the original geometry to prevent modifications to the original
  const geometry = nodes.Baguette.geometry.clone()
  const geometry2 = nodes.Baguette.geometry.clone()

  // Compute the scale
  console.log(geometry)
  console.log(geometry.boundingBox.size())
  const Size = geometry.boundingBox.size()
  console.log(Size.x, Size.y, Size.z)

  const textureLoader = new TextureLoader()
  const woodTexture = textureLoader.load('/wood_texture.jpg')

  // Assign the texture to the material
  const woodmaterial = new THREE.MeshPhongMaterial({ map: woodTexture })

  // Créer un groupe
  const group = new THREE.Group()
  group.position.set(0, 0, 0) // Définir l'origine du groupe

  // Ajouter le modèle au groupe
  group.add(nodes.Baguette)

  useEffect(() => {
    const vertices = geometry.attributes.position.array

    // Adjust position for specific points
    const indicesToAdjust = [9, 7, 11]
    const angle = 45 // Angle en degrés
    const angleInRadians = THREE.MathUtils.degToRad(angle)
    const widthAdjustment = props.widthAdjustment

    for (const index of indicesToAdjust) {
      const baseIndex = index * 3
      const x = vertices[baseIndex]
      const y = vertices[baseIndex + 1]
      const z = vertices[baseIndex + 2]

      // Déplacement en fonction de l'angle et de l'épaisseur de la feuillure
      const newX = x - Math.cos(angleInRadians) * widthAdjustment
      const newZ = z - Math.sin(angleInRadians) * widthAdjustment

      vertices[baseIndex] = newX
      vertices[baseIndex + 2] = newZ
    }
    // Adjust position for specific points
    const indicesToAdjust2 = [0, 4, 2]

    for (const index of indicesToAdjust2) {
      const baseIndex = index * 3
      const x = vertices[baseIndex]
      const y = vertices[baseIndex + 1]
      const z = vertices[baseIndex + 2]

      // Déplacement en fonction de l'angle et de l'épaisseur de la feuillure

      const newZ = z - Math.sin(angleInRadians) * widthAdjustment
      const newX = x + Math.cos(angleInRadians) * widthAdjustment

      vertices[baseIndex] = newX
      vertices[baseIndex + 2] = newZ
    }

    // Notify three.js that the geometry has been updated
    geometry.attributes.position.needsUpdate = true
  }, [props.widthAdjustment, geometry.attributes.position])

  useEffect(() => {
    const vertices = geometry.attributes.position.array

    // Adjust position for specific points
    const indicesToAdjust = [3, 6]
    const angle = 45 // Angle en degrés
    const angleInRadians = THREE.MathUtils.degToRad(angle)
    const largeurFeuillure = props.largeurFeuillure

    for (const index of indicesToAdjust) {
      const baseIndex = index * 3
      const x = vertices[baseIndex]
      const y = vertices[baseIndex + 1]
      const z = vertices[baseIndex + 2]

      // Déplacement en fonction de l'angle et de l'épaisseur de la feuillure
      const newX = x + Math.cos(angleInRadians) * largeurFeuillure
      const newZ = z - Math.sin(angleInRadians) * largeurFeuillure

      vertices[baseIndex] = newX
      vertices[baseIndex + 2] = newZ
    }
    // Adjust position for specific points
    const indicesToAdjust2 = [10, 13]

    for (const index of indicesToAdjust2) {
      const baseIndex = index * 3
      const x = vertices[baseIndex]
      const y = vertices[baseIndex + 1]
      const z = vertices[baseIndex + 2]

      // Déplacement en fonction de l'angle et de l'épaisseur de la feuillure
      const newX = x - Math.cos(angleInRadians) * largeurFeuillure
      const newZ = z - Math.sin(angleInRadians) * largeurFeuillure

      vertices[baseIndex] = newX
      vertices[baseIndex + 2] = newZ
    }

    // Notify three.js that the geometry has been updated
    geometry.attributes.position.needsUpdate = true
  }, [props.largeurFeuillure, geometry.attributes.position])

  useEffect(() => {
    const vertices = geometry.attributes.position.array

    // Adjust height for specific points
    const indicesToAdjust = [4, 5, 6, 11, 12, 13]
    const hauteurFeuillure = props.hauteurFeuillure

    for (const index of indicesToAdjust) {
      const baseIndex = index * 3
      vertices[baseIndex + 1] = vertices[baseIndex + 1] - hauteurFeuillure // Update Y coordinate
    }

    // Notify three.js that the geometry has been updated
    geometry.attributes.position.needsUpdate = true
  }, [props.hauteurFeuillure, geometry.attributes.position])

  useEffect(() => {
    const vertices = geometry.attributes.position.array

    // Adjust height for specific points
    const indicesToAdjust = [0, 3, 10, 7]
    const heightAdjustment = props.heightAdjustment

    for (const index of indicesToAdjust) {
      const baseIndex = index * 3
      vertices[baseIndex + 1] = vertices[baseIndex + 1] - heightAdjustment // Update Y coordinate
    }

    // Notify three.js that the geometry has been updated
    geometry.attributes.position.needsUpdate = true
  }, [props.heightAdjustment, geometry.attributes.position])

  useEffect(() => {
    // Access the vertices and move them based on the input range
    const vertices = geometry.attributes.position.array
    console.log('Range: ', props.rangeValue)
    console.log('Vertices: ', vertices[0], '/', vertices[1], '/', vertices[2])

    for (let i = 0; i < vertices.length / 2; i += 3) {
      vertices[i] = vertices[i] + props.rangeValue - Size.x // Update X coordinate
      
    }

    // Notify three.js that the geometry has been updated
    geometry.attributes.position.needsUpdate = true
  }, [props.rangeValue, geometry.attributes.position])

  materials['Material.001'].color.set('rgba(100, 100, 0, 0.7)')

  return (
    <group {...props} dispose={null}>
      <group>
        <mesh castShadow receiveShadow geometry={geometry} material={materials['Material.001']} />
        <mesh
          scale={[1, 1, 1]}
          rotation={[0, (3 * Math.PI) / 2, 0]}
          position={[props.rangeValue - 10 - 2, 0, 10]}
          color={0x00ff00}
          castShadow
          receiveShadow
          geometry={geometry}
          material={materials['Material.001']}
        />
      </group>
      <group rotation={[0, Math.PI, 0]} position={[props.rangeValue - Size.x, 0, props.rangeValue - 2]}>
        <mesh castShadow receiveShadow geometry={geometry} material={materials['Material.001']} />
        <mesh
          scale={[1, 1, 1]}
          rotation={[0, (3 * Math.PI) / 2, 0]}
          position={[props.rangeValue - 10 - 2, 0, 10]}
          color={0x00ff00}
          castShadow
          receiveShadow
          geometry={geometry}
          material={materials['Material.001']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/baguetteTextureMelange.gltf')
