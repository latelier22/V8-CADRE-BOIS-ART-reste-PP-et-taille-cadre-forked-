import React, { useRef, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { fabric } from 'fabric'
import * as THREE from 'three'

import MugModel from './components/MugModel'
import CadreBois from './components/CadreBois'
import CustomShape from './components/CustomShape'
import ModelWrapper from './components/ModelWrapper'
import BaguetteSimple from './components/BaguetteSimple'
import MoveBaguettePoints from './components/MoveBaguettePoints'
import BaguetteLengthInput from './inteface/BaguetteLengthInput'
import Baguette from './components/Baguette'
import Cadre from './components/Cadre'

export default function App() {
  const { editor, onReady } = useFabricJSEditor()
  const [FillColor, setFillColor] = useState('#FF0000')
  const [StrokeColor, setStrokeColor] = useState('#000000')
  const [BackColor, setBackColor] = useState('#FFFFFF')
  const [Stroke, setStroke] = useState(2)
  const [visibleMug, setvisibleMug] = useState(false)
  const [visibleCadre, setvisibleCadre] = useState(false)
  const [visibleCadreBois, setvisibleCadreBois] = useState(false)
  const [Animation, setAnimation] = useState(true)
  const [Reverse, setReverse] = useState(false)
  const [jsonContent, setJsonContent] = useState('')
  const [AnimationSpeed, setAnimationSpeed] = useState(10)
  const [rangeValue, setRangeValue] = useState(0)
  const [largeurCadre, setLargeurCadre] = useState(22.3)
  const [hauteurCadre, setHauteurCadre] = useState(22.3)
  const [largeurFeuillure, setLargeurFeuillure] = useState(1)
  const [hauteurFeuillure, setHauteurFeuillure] = useState(1.5)
  const [largeurBaguette, setLargeurBaguette] = useState(2)
  const [hauteurBaguette, setHauteurBaguette] = useState(2)
  const [baguetteSeule, SetBaguetteSeule] = useState(false)
  const [frameColor, setFrameColor] = useState('#EECC00')
  const [DosColor, setDosColor] = useState('#D2B37F')
  const [PPColor, setPPColor] = useState('#222222')
  const [visiblePP, setvisiblePP] = useState(true)
  const [visibleDos, setvisibleDos] = useState(true)
  const [visibleArt, setvisibleArt] = useState(true)

  const [largeurArt, setLargeurArt] = useState(10)
  const [hauteurArt, setHauteurArt] = useState(10)

  const handleArtHeightChange = (ArtHeight) => {
    setHauteurArt(ArtHeight)
  }

  const handleArtWidthChange = (ArtWidth) => {
    setLargeurArt(ArtWidth)
  }

  const handleFrameWidthChange = (frameWidth) => {
    setLargeurCadre(frameWidth)
  }
  const handleFrameHeightChange = (frameHeight) => {
    setHauteurCadre(frameHeight)
  }

  const handleBaguetteWidthChange = (baguetteWidth) => {
    setLargeurBaguette(baguetteWidth)
  }

  const handleBaguetteHeigthChange = (baguetteHeight) => {
    setHauteurBaguette(baguetteHeight)
  }

  const handleRabateHeightChange = (rabateHeight) => {
    setHauteurFeuillure(rabateHeight)
  }

  const handleRabateWidthChange = (RabateWidth) => {
    setLargeurFeuillure(RabateWidth)
  }

  const history = []

  var img // Variable pour stocker l'image

  const jsonDiv = useRef()

  useEffect(() => {
    if (editor) {
      //editor.setFillColor('#FF0000')

      editor.canvas.backgroundColor = BackColor
      editor.canvas.setDimensions({ width: 500, height: (500 * hauteurArt) / largeurArt })
      editor.setFillColor(FillColor)
      editor.setStrokeColor(StrokeColor)

      const formattedJson = JSON.stringify(editor.canvas, null, 2)
      jsonDiv.current = formattedJson
      setJsonContent(formattedJson)
    }
  })

  useEffect(() => {
    if (!editor || !fabric) {
      return
    }
    //editor.canvas.freeDrawingBrush.color = color

    editor.canvas.getActiveObject.strokeWidth = parseInt(Stroke)
    editor.setStrokeColor(StrokeColor)
    editor.setFillColor(FillColor)
    editor.canvas.backgroundColor = BackColor
  }, [StrokeColor, FillColor, Stroke, AnimationSpeed, BackColor])

  useEffect(() => {
    if (!editor || !fabric) {
      return
    }
    editor.canvas.freeDrawingBrush.color = StrokeColor
    editor.setStrokeColor(StrokeColor)
  }, [StrokeColor])

  const onToggleBaguette = () => {
    SetBaguetteSeule(!baguetteSeule)
  }

  const onToggleDraw = () => {
    editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode
  }
  const onUndo = () => {
    if (editor.canvas._objects.length > 0) {
      history.push(editor.canvas._objects.pop())
    }
    editor.canvas.renderAll()
  }
  const onRedo = () => {
    if (history.length > 0) {
      editor.canvas.add(history.pop())
    }
  }

  const clear = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length)
    history.splice(0, history.length)
    editor.canvas.renderAll()
  }

  const onToggleMug = () => {
    setvisibleMug(!visibleMug)
  }
  const onToggleCadre = () => {
    setvisibleCadre(!visibleCadre)
  }

  const onTogglePP = () => {
    setvisiblePP(!visiblePP)
  }

  const onToggleDos = () => {
    setvisibleDos(!visibleDos)
  }

  const onToggleArt = () => {
    setvisibleArt(!visibleArt)
  }

  const onAddCircle = () => {
    editor.canvas.isDrawingMode = false

    editor.addCircle()
  }

  const onAddEllipse = () => {
    editor.canvas.isDrawingMode = false

    var ellipse = new fabric.Ellipse({
      left: 10,
      top: 10,
      rx: 30,
      ry: 20,
      strokeWidth: parseInt(Stroke),
      fill: FillColor,
      stroke: StrokeColor,
      strokeUniform: true,
    })

    // Adding it to the canvas
    editor.canvas.add(ellipse)
  }

  const onDelete = () => {
    editor.canvas.remove(editor.canvas.getActiveObject())
  }

  const onClear = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length)
    history.splice(0, history.length)
    onSelectAll()
    editor.canvas.renderAll()
  }

  const onSelectAll = () => {
    editor.canvas.discardActiveObject()
    var sel = new fabric.ActiveSelection(editor.canvas.getObjects(), {
      canvas: editor.canvas,
    })
    editor.canvas.setActiveObject(sel)
    editor.canvas.requestRenderAll()
  }

  const onAddRectangle = () => {
    editor.canvas.isDrawingMode = false
    var rect = new fabric.Rect({
      left: 10,
      top: 10,
      width: 100,
      height: 50,
      strokeWidth: parseInt(Stroke),
      fill: FillColor,
      stroke: StrokeColor,
      strokeUniform: true,
    })

    // Adding it to the canvas
    editor.canvas.add(rect)
  }

  const onAddText = () => {
    editor.canvas.isDrawingMode = false
    editor.addText('Votre texte...')
  }

  // Fonction pour rogner l'image
  function onCrop() {
    // Vérifiez si une image est présente
    const rayon = editor.canvas.getActiveObject().height / 2

    const clipPath = new fabric.Circle({
      radius: rayon,

      // The originY and originX helps to center the image and the clipPath
      originY: 'center',
      originX: 'center',
    })

    editor.canvas.getActiveObject().clipPath = clipPath
    editor.canvas.renderAll()
  }

  const exportToSvg = () => {
    // Obtenez le contenu du canvas au format SVG
    const svgString = editor.canvas.toSVG()

    // Créez un objet Blob contenant le SVG
    const blob = new Blob([svgString], { type: 'image/svg+xml' })

    // Créez un lien d'ancrage pour télécharger le fichier SVG
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'canvas-export.svg'

    // Simulez un clic pour déclencher le téléchargement
    link.click()

    // Libérez les ressources
    URL.revokeObjectURL(link.href)
  }

  const exportToPng = async () => {
    // Demander à l'utilisateur d'entrer le nom du fichier

    const dataURL = editor.canvas.toDataURL({
      width: editor.canvas.width,
      height: editor.canvas.height,
      left: 0,
      top: 0,
      format: 'png',
    })
    const link = document.createElement('a')
    link.download = 'image.png'
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleImportSVG = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        const svgString = event.target.result

        fabric.loadSVGFromString(svgString, (objects, options) => {
          const svgGroup = new fabric.Group(objects, options)

          // Add the imported SVG to the canvas
          editor.canvas.add(svgGroup)
        })
      }

      reader.readAsText(file)
    }
  }

  const unGroupObjects = () => {
    if (!editor.canvas.getActiveObject()) {
      return
    }
    if (editor.canvas.getActiveObject().type !== 'group') {
      return
    }
    editor.canvas.getActiveObject().toActiveSelection()
    editor.canvas.requestRenderAll()
  }

  const groupObjects = () => {
    if (!editor.canvas.getActiveObject()) {
      return
    }
    if (editor.canvas.getActiveObject().type !== 'activeSelection') {
      return
    }
    editor.canvas.getActiveObject().toGroup()
    editor.canvas.requestRenderAll()
  }

  const handleImageUpload = (e) => {
    editor.canvas.isDrawingMode = false
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target.result
        fabric.Image.fromURL(imageUrl, (image) => {
          console.log(image.width, image.height)
          if (image.width > image.height) {
            image.scaleToHeight(editor.canvas.height)
          } else {
            image.scaleToWidth(editor.canvas.width)
          }
          //image.lockScalingY = true
          img = image

          editor.canvas.add(image)

          // Utilisez l'éditeur Fabric.js pour ajouter l'image au canvas
        })
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <div className="container">
        <div className="espace">
          <Canvas frameloop="always" shadows dpr={[1, 2]} camera={{ position: [0, 30, -5], fov: 85 }}>
            <color attach="background" args={['#EFCDAB']} />

            <ambientLight intensity={0.2} />
            <directionalLight intensity={0.4} />
            {/*<spotLight intensity={0.1} angle={0.1} penumbra={0.5} position={[10, 15, -10]} castShadow />*/}
            <Suspense fallback={null}>
              {visibleCadre ? <CadreModel animation={Animation} reverse={Reverse} animationSpeed={AnimationSpeed} /> : null}

              {visibleCadreBois ? <CadreBois animation={Animation} reverse={Reverse} animationSpeed={AnimationSpeed} /> : null}
              {visibleMug ? <MugModel animation={Animation} reverse={Reverse} animationSpeed={AnimationSpeed} /> : null}

              <Cadre
                position={[0, -2.5, 0]}
                frameColor={frameColor}
                CadreExtWidth={largeurCadre}
                CadreExtHeight={hauteurCadre}
                BaguetteWidth={largeurBaguette}
                BaguetteHeight={hauteurBaguette}
                RabateHeight={hauteurFeuillure}
                RabateWidth={largeurFeuillure}
                BaguetteSeule={baguetteSeule}
                visiblePP={visiblePP}
                visibleDos={visibleDos}
                visibleArt={visibleArt}
                PPColor={PPColor}
                DosColor={DosColor}
              />
            </Suspense>
            <OrbitControls />
          </Canvas>
        </div>
        <div className="test">
          <div className="cadre">
            <div className="cadre">
              <BaguetteLengthInput
                label="Largeur Cadre (cm)"
                initialValue={largeurArt}
                maxValue="200"
                minValue="5"
                onLengthChange={(value) => handleArtWidthChange(value)}
              />
              <BaguetteLengthInput
                label="Hauteur Cadre(cm)"
                initialValue={hauteurArt}
                maxValue="200"
                minValue="5"
                onLengthChange={(value) => handleArtHeightChange(value)}
              />
            </div>
            <label disabled={false}>
              Cadre
              <input disabled={false} type="color" value={frameColor} onChange={(e) => setFrameColor(e.target.value)} />
            </label>
            <label disabled={false}>
              PassePartout
              <input disabled={false} type="color" value={PPColor} onChange={(e) => setPPColor(e.target.value)} />
            </label>
            <button onClick={onTogglePP}>Passe-partout</button>
            <div className="cadre">
              <BaguetteLengthInput
                label="Largeur Cadre (cm)"
                initialValue={largeurCadre}
                maxValue="200"
                minValue={2 * largeurBaguette}
                onLengthChange={(value) => handleFrameWidthChange(value)}
              />
              <BaguetteLengthInput
                label="Hauteur Cadre(cm)"
                initialValue={hauteurCadre}
                maxValue="200"
                minValue={2 * largeurBaguette}
                onLengthChange={(value) => handleFrameHeightChange(value)}
              />
              <BaguetteLengthInput
                label="Largeur Baguette(cm)"
                initialValue={largeurBaguette}
                maxValue="10"
                minValue="1"
                onLengthChange={(value) => handleBaguetteWidthChange(value)}
              />
              <BaguetteLengthInput
                label="Epaisseur Baguette"
                initialValue={hauteurBaguette}
                maxValue="10"
                minValue="1"
                onLengthChange={(value) => handleBaguetteHeigthChange(value)}
              />
              <BaguetteLengthInput
                label="Hauteur Feuillure"
                initialValue={hauteurFeuillure}
                maxValue={hauteurBaguette}
                minValue="0.1"
                onLengthChange={(value) => handleRabateHeightChange(value)}
              />
              <BaguetteLengthInput
                label="Largeur Feuillure"
                initialValue={largeurFeuillure}
                maxValue={largeurBaguette}
                minValue="0.1"
                onLengthChange={(value) => handleRabateWidthChange(value)}
              />
            </div>
            <div className="boutons-cadre">
              <button onClick={onToggleBaguette}> Baguette seule</button>
            </div>
          </div>
          <div>
            <button onClick={onAddCircle}>Circle</button>
            <button onClick={onAddEllipse}>Ellipse</button>
            <button onClick={onAddRectangle}>Rectangle</button>
            <button onClick={onAddText}>Texte</button>
            <button onClick={onToggleDraw}>Draw</button>
          </div>
          <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
          <input type="file" accept=".svg" onChange={handleImportSVG} />
          <button onClick={onCrop}>Crop</button>

          <div className="canvas-container">
            <FabricJSCanvas id="cnvs" className="sample-canvas" onReady={onReady} onSelect={(e) => setSelectedObject(e.target)} />
          </div>
          <label disabled={false}>
            Fill
            <input disabled={false} type="color" value={FillColor} onChange={(e) => setFillColor(e.target.value)} />
          </label>
          <label disabled={false}>
            Stroke
            <input disabled={false} type="color" value={StrokeColor} onChange={(e) => setStrokeColor(e.target.value)} />
          </label>
          <label disabled={false}>
            Back
            <input disabled={false} type="color" value={BackColor} onChange={(e) => setBackColor(e.target.value)} />
          </label>
          <div>
            <button onClick={onDelete}>DELETE</button>
            <button onClick={onClear}>CLEAR</button>
            <button onClick={onSelectAll}>SELECT ALL</button>
            <button onClick={onUndo}>UNDO</button>
            <button onClick={onRedo}>REDO</button>
          </div>
          <div>
            <button onClick={groupObjects}>Grouper</button>
            <button onClick={unGroupObjects}>Dégrouper</button>
          </div>
          <div>
            <input type="range" id="stroke" name="stroke" value={Stroke} min="0" max="30" onChange={(e) => setStroke(e.target.value)} />
            <label for="volume">Stroke Width: {Stroke} px</label>
          </div>

          <div className="fabric-canvas"></div>

          <p>move circle around</p>
          <button onClick={onToggleMug}>MUG</button>
          <button onClick={onToggleCadre}>CADRE</button>
          <div>
            <label disabled={false}>
              <input disabled={false} type="checkbox" checked={Animation} value={Animation} onChange={() => setAnimation(!Animation)} />
              Start/ Stop Animation
              <input disabled={false} type="checkbox" checked={Reverse} value={Reverse} onChange={() => setReverse(!Reverse)} />
              Reverse
              <input
                type="range"
                id="speed"
                name="speed"
                value={AnimationSpeed}
                min="1"
                max="100"
                step="1"
                onChange={(e) => setAnimationSpeed(e.target.valueAsNumber)}
              />
              Animation speed
              <div>
                <button onClick={exportToPng}>Save->PNG</button>
                <button onClick={exportToSvg}>Save->SVG</button>
              </div>
              <div ref={jsonDiv} style={{ whiteSpace: 'pre-wrap' }}>
                {' '}
                {jsonContent}{' '}
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
