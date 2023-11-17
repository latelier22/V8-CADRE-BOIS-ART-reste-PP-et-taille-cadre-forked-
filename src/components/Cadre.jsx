import React from 'react'
import Baguette from './Baguette'
import ModelPP from './ModelPP'
import ModelDos from './ModelDos'
import ModelArt from './ModelArt'

const Cadre = ({
  position,
  visibleArt,
  visibleDos,
  visiblePP,
  frameColor,
  DosColor,
  PPColor,
  CadreExtWidth,
  CadreExtHeight,
  BaguetteWidth,
  BaguetteHeight,
  RabateHeight,
  RabateWidth,
  BaguetteSeule,
}) => {
  return (
    <group>
      {visiblePP ? <ModelPP PPColor={PPColor} /> : null}
      {visibleDos ? <ModelDos DosColor={DosColor} /> : null}
      {visibleArt ? <ModelArt /> : null}

      {BaguetteSeule ? (
        <Baguette
          position={[0, position[1], -CadreExtHeight / 2 + 1]}
          frameColor={frameColor}
          RabateHeight={RabateHeight}
          RabateWidth={RabateWidth}
          BaguetteWidth={BaguetteWidth}
          BaguetteHeight={BaguetteHeight}
          LongueurBaguette={CadreExtWidth}
        />
      ) : (
        <>
          {/* Vos groupes existants pour les quatre baguettes */}
          <group>
            <Baguette
              position={[0, position[1], -CadreExtHeight / 2 + 1.5]}
              frameColor={frameColor}
              RabateHeight={RabateHeight}
              RabateWidth={RabateWidth}
              BaguetteWidth={BaguetteWidth}
              BaguetteHeight={BaguetteHeight}
              LongueurBaguette={CadreExtWidth}
            />
            <Baguette
              position={[CadreExtWidth / 2 - 1.5, position[1], 0]}
              rotation={[0, (3 * Math.PI) / 2, 0]}
              frameColor={frameColor}
              RabateHeight={RabateHeight}
              RabateWidth={RabateWidth}
              BaguetteWidth={BaguetteWidth}
              BaguetteHeight={BaguetteHeight}
              LongueurBaguette={CadreExtHeight}
            />
          </group>
          <group rotation={[0, Math.PI, 0]}>
            <Baguette
              position={[0, position[1], -CadreExtHeight / 2 + 1.5]}
              frameColor={frameColor}
              RabateHeight={RabateHeight}
              RabateWidth={RabateWidth}
              BaguetteWidth={BaguetteWidth}
              BaguetteHeight={BaguetteHeight}
              LongueurBaguette={CadreExtWidth}
            />
            <Baguette
              position={[CadreExtWidth / 2 - 1.5, position[1], 0]}
              rotation={[0, (3 * Math.PI) / 2, 0]}
              frameColor={frameColor}
              RabateHeight={RabateHeight}
              RabateWidth={RabateWidth}
              BaguetteWidth={BaguetteWidth}
              BaguetteHeight={BaguetteHeight}
              LongueurBaguette={CadreExtHeight}
            />
          </group>
        </>
      )}
    </group>
  )
}

export default Cadre
