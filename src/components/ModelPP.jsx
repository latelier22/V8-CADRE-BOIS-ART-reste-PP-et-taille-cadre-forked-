/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Color } from 'three'

// ...

export default function ModelPP(props) {
  const { nodes, materials } = useGLTF('/ModelPP.gltf')

  console.log(props.PPColor)
  // Créez un objet Color avec la couleur souhaitée (rouge dans cet exemple)
  const newColor = new Color(props.PPColor)

  // Affectez la nouvelle couleur au matériau
  materials['Handmade Paper 01'].color = newColor

  return (
    <group {...props} dispose={null}>
      <group scale={[1, 0.5, 1]} position={[0, -2, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube_1.geometry} material={materials['Handmade Paper 01']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube_2.geometry} material={materials.Ame} />
      </group>
    </group>
  )
}

// ...