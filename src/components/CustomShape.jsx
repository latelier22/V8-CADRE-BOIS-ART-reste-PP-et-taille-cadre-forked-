import React from 'react'

import { BufferGeometry, BufferAttribute, Vector2 } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber'

function CustomShape() {
  // All textures are CC0 textures from: https://cc0textures.com/
  const name = (type) => `PavingStones092_1K_${type}.jpg`

  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    'wood_texture.jpg',
    name('Displacement'),
    name('Normal'),
    name('Roughness'),
    name('AmbientOcclusion'),
  ])

  const vertices = new Float32Array([
    -1,
    -1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    1.0,
    1.0,

    1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,

    1.0,
    1.0,
    0,
    -1.0,
    1.0,
    0,
    -1.0,
    -1.0,
    0,

    -1.0,
    -1.0,
    0.0,
    1.0,
    -1.0,
    0.0,
    1.0,
    1.0,
    0.0,
  ])

  // Créez une géométrie de tampon avec les coordonnées des sommets
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(vertices, 3))

  return (
    <mesh>
      <sphereBufferGeometry args={[300, 100, 100]} />
      {/* Utilisez bufferGeometry pour la forme personnalisée */}
      <bufferGeometry {...geometry} />
      {/* Utilisez MeshStandardMaterial avec la texture en tant que propriété */}
      <meshStandardMaterial
        side={2}
        displacementScale={0.2}
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
    </mesh>
  )
}

export default CustomShape
