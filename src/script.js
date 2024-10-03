import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox.js'
import GUI from 'lil-gui'



//Loaders
const gftLoader = new GLTFLoader()
const rgbeLoader = new RGBELoader()
const exrLoader = new EXRLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const textureLoader = new THREE.TextureLoader()


gftLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) => {
        gltf.scene.scale.set(10, 10, 10)
        scene.add(gltf.scene)
    }
)


/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Enviroment map
//LDR Map
// const envMap = cubeTextureLoader.load([
//     '/environmentMaps/0/px.png',
//     '/environmentMaps/0/nx.png',
//     '/environmentMaps/0/py.png',
//     '/environmentMaps/0/ny.png',
//     '/environmentMaps/0/pz.png',
//     '/environmentMaps/0/nz.png',
// ])
// scene.background = envMap
// scene.environment = envMap



//HDR map (RGBE) equirectangular
// rgbeLoader.load(
//     '/environmentMaps/blender-light-2k.hdr',
//     (env) => {
//         env.mapping = THREE.EquirectangularReflectionMapping

//         scene.environment = env
//     }
// )

//HDR map (EXR) equirectangular
// exrLoader.load(
//     '/environmentMaps/nvidiaCanvas-4k.exr',
//     (env) => {
//         env.mapping = THREE.EquirectangularReflectionMapping
//        scene.background = env
//         scene.environment = env
//     }
// )


//grounded
// rgbeLoader.load(
//     '/environmentMaps/2/2k.hdr',
//     (env) => {
//         env.mapping = THREE.EquirectangularReflectionMapping
//         scene.environment = env

//         const skyBox = new GroundedSkybox(env, 15, 70)
//         skyBox.position.y = 15
//         scene.add(skyBox)
//     }
// )


//real time background
//base bg
const envMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
envMap.mapping = THREE.EquirectangularReflectionMapping
envMap.colorSpace = THREE.SRGBColorSpace

scene.background = envMap

//cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
    '256',
    {
        type: THREE.HalfFloatType
    }
)

scene.environment = cubeRenderTarget.texture


//cube camera
const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget)
cubeCamera.layers.set(1)



scene.environmentIntensity = 1
scene.backgroundBlurriness = 0
scene.backgroundIntensity = 2

gui.add(scene, 'environmentIntensity').min(0).max(10).step(0.001)
gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001)
gui.add(scene, 'backgroundIntensity').min(0).max(10).step(0.001)
gui.add(scene.environmentRotation, 'y').min(0).max(Math.PI * 2).step(0.001).name('Eviroment Rotation')
gui.add(scene.backgroundRotation, 'y').min(0).max(Math.PI * 2).step(0.001).name('Eviroment Rotation')


//holy donut
const donut = new THREE.Mesh(
    new THREE.TorusGeometry(8, 0.5),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(10,4,2) })
)
donut.position.y = 3.5
donut.layers.enable(1)

scene.add(donut)
/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({ roughness: 0, metalness: 1, color: 0xaaaaaa })
)
torusKnot.position.x = -4
torusKnot.position.y = 4
scene.add(torusKnot)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
    // Time
    const elapsedTime = clock.getElapsedTime()

    //real time env map update
    if (donut) {
        donut.rotation.x = Math.sin(elapsedTime) * 2
        cubeCamera.update(renderer, scene)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()