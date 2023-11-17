// MoveBaguettePoints.js
import React, { useRef, useEffect } from 'react'
import { useGLTF, useLoader, useTexture } from '@react-three/drei'
import { PointsMaterial } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import { Color } from 'three'

export default function Baguette(props) {
  const { nodes, materials } = useGLTF('/BaguetteTextureBois.gltf')

  // Clone the original geometry to prevent modifications to the original
  const geometry = nodes.Baguette.geometry.clone()

  // Créez un objet Color avec la couleur souhaitée (rouge dans cet exemple)
  const newColor = new Color(props.frameColor)

  const Size = new THREE.Vector3()
  geometry.boundingBox.getSize(Size)

  console.log(geometry)

  // Assign the texture to the material
  const woodmaterial = new THREE.MeshStandardMaterial({ color: props.frameColor })

  // LONGUEUR BAGUETTE
  useEffect(() => {
    // Access the vertices and move them based on the input range
    const vertices = geometry.attributes.position.array

    for (let i = 0; i < vertices.length / 2; i += 3) {
      vertices[i] = vertices[i] + (props.LongueurBaguette - Size.x) / 2 // Update X coordinate
    }
    for (let i = vertices.length / 2; i < vertices.length; i += 3) {
      vertices[i] = vertices[i] - (props.LongueurBaguette - Size.x) / 2 // Update X coordinate
    }

    // Notify three.js that the geometry has been updated
    geometry.attributes.position.needsUpdate = true
  }, [props.LongueurBaguette, geometry.attributes.position])

  // LARGEUR BAGUETTE
  useEffect(() => {
    const vertices = geometry.attributes.position

    console.log('Largeur Baguette', props.BaguetteWidth)

    // Adjust position for specific points
    const indicesToAdjust = [0, 1, 2, 3, 4, 5, 6, 7]
    const angle = 45 // Angle en degrés
    const angleInRadians = THREE.MathUtils.degToRad(angle)
    const widthAdjustment = props.BaguetteWidth - 2

    for (const index of indicesToAdjust) {
      const baseIndex = index * 3
      const x = vertices[baseIndex]
      const y = vertices[baseIndex + 1]
      const z = vertices[baseIndex + 2]

      // Déplacement en fonction de l'angle et de l'épaisseur de la feuillure
      const newX = x - Math.cos(angleInRadians) * widthAdjustment
      const newZ = z - Math.sin(angleInRadians) * widthAdjustment
      console.log('x', x, newX)
      vertices[baseIndex] = newX
      vertices[baseIndex + 2] = newZ
    }
    // Adjust position for specific points
    const indicesToAdjust2 = [32, 33, 34, 35, 36, 37, 38, 39]

    for (const index of indicesToAdjust2) {
      const baseIndex = index * 3
      const x = vertices[baseIndex]
      const y = vertices[baseIndex + 1]
      const z = vertices[baseIndex + 2]

      // Déplacement en fonction de l'angle et de l'épaisseur de la feuillure

      const newZ = z - Math.sin(angleInRadians) * widthAdjustment
      const newX = x + Math.cos(angleInRadians) * widthAdjustment

      console.log(39 * 3, vertices[baseIndex], vertices[baseIndex + 2])

      vertices[baseIndex] = newX
      vertices[baseIndex + 2] = newZ
    }

    // Notify three.js that the geometry has been updated
    geometry.attributes.position.needsUpdate = true
  }, [props.BaguetteHWidth, geometry.attributes.position])

  // HAUTEUR BAGUETTE
  useEffect(() => {
    const vertices = geometry.attributes.position.array

    // Adjust height for specific points
    const indicesToAdjust = [1, 2, 9, 8]
    const heightAdjustment = props.BaguetteHeight - 2

    for (const index of indicesToAdjust) {
      const baseIndex = index * 3

      vertices[baseIndex + 1] = vertices[baseIndex + 1] + heightAdjustment
    }

    // Notify three.js that the geometry has been updated
    geometry.attributes.position.needsUpdate = true
  }, [props.BaguetteHeight, geometry.attributes.position])

  // LARGEUR FEUILLURE

  useEffect(() => {
    const vertices = geometry.attributes.position.array

    // Adjust position for specific points
    const indicesToAdjust = [3, 6]
    const angle = 45 // Angle en degrés
    const angleInRadians = THREE.MathUtils.degToRad(angle)
    const largeurFeuillure = props.RabateWidth - 1

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
  }, [props.RabateWidth, geometry.attributes.position])

  // HAUTEUR FEUILLURE

  useEffect(() => {
    const vertices = geometry.attributes.position.array

    // Adjust height for specific points
    const indicesToAdjust = [12, 13, 11, 4, 5, 6]
    const hauteurFeuillure = props.RabateHeight - 1.5

    if (props.RabateHeight <= props.BaguetteHeight)
      for (const index of indicesToAdjust) {
        const baseIndex = index * 3
        vertices[baseIndex + 1] = vertices[baseIndex + 1] + hauteurFeuillure // Update Y coordinate
      }

    // Notify three.js that the geometry has been updated
    geometry.attributes.position.needsUpdate = true
  }, [props.RabateHeight, geometry.attributes.position])

  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Baguette.geometry} material={materials['Material.007']} />
    </group>
  )
}

useGLTF.preload('/BaguetteTextureBois.gltf')
