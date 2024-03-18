"use client"

import * as Three from "three"
import { Canvas } from "@react-three/fiber"
import { ContactShadows, Float, Environment } from "@react-three/drei"
import { Suspense, useEffect, useInsertionEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function Shapes(){
    return(
        <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
            <Canvas className="z-0" shadows gl={{antialias:false}} dpr={[1, 1.5]} camera={{position:[0, 0, 25], fov:45, near:1, far:60}}>
            <Suspense fallback={null}>
                <Geometries/>
                <ContactShadows
                position={[0, -3.5, 0]}
                opacity={0.65}
                scale={40}
                blur={1}
                far={9} />
                <Environment preset="sunset" />
            </Suspense>

            </Canvas>
        </div>
    )
}


function Geometries() {
    const geometries = [
 //       {
 //           position:[.75,0,-5],
 //           r: 0.3,
 //           geometry: new Three.IcosahedronGeometry(3),//Gem                    
 //       },
        {
            position:[.02,-0.75,4],//HVD-XYZ
            r: 0.9, //rotation speed
            geometry: new Three.BoxGeometry(1,1,1),//Box                    
        },
        {
            position:[-1.4,1.4,1],
            r: 0.75,
            geometry: new Three.TorusGeometry(0.6, 0.25, 16, 32),//Ring                    
        },
        {
            position:[0,0.2,-1],
            r: 0.3,
           geometry: new Three.TorusKnotGeometry( 2.3, 0.524, 128, 8 ),//Knot                    
        },
        {
            position:[0.8,1.6,1],
            r: 0.8,
            geometry: new Three.OctahedronGeometry(1.1),//diamond                    
        },
    ];

    const materials = [
        new Three.MeshNormalMaterial(),
        new Three.MeshStandardMaterial({color: 0x2ecc71, roughness: 0}),
        new Three.MeshStandardMaterial({color: 0x007FFF, roughness: 0}),
        new Three.MeshStandardMaterial({color: 0xFF9900, roughness: 0}),
        new Three.MeshStandardMaterial({color: 0x232F3E, roughness: 0}),
        new Three.MeshStandardMaterial({color: 0xF2F2F2, roughness: 0}),
        new Three.MeshStandardMaterial({color: 0x3399FF, roughness: 0}),
        new Three.MeshStandardMaterial({color: 0x3F2559, roughness: 0}),
        new Three.MeshStandardMaterial({color: 0xBF04B3, roughness: 0}),
        
    ];

    const soundEffects =[
        new Audio("/sounds/knock1.ogg"),
        new Audio("/sounds/knock2.ogg"),
        new Audio("/sounds/knock3.ogg"),
        new Audio("/sounds/knock4.ogg"),
    ];

    return geometries.map(({position, r, geometry})=>(
        <Geometry
        key={JSON.stringify(position)}
        position={position.map((p)=>p*2)}
        geometry={geometry}
        materials={materials}
        soundEffects={soundEffects}
        r={r}
        />
    ))


}

function Geometry({r, position, geometry, materials, soundEffects}){
    const meshRef = useRef();
    const [visible, setVisible] = useState (false);

    const startingMaterial = getRandomMaterial();    

        function getRandomMaterial(){
            return gsap.utils.random(materials)
            }

        function handleClick(e){
            const mesh = e.object;

            gsap.utils.random(soundEffects).play()

            gsap.to(mesh.rotation,{
                x:`+=${gsap.utils.random(0,2)}`,
                y:`+=${gsap.utils.random(0,2)}`,
                z:`+=${gsap.utils.random(0,2)}`,
                duration:1.3,
                ease: "elastic.out(1,0.3)",
                yoyo:true,
            });
            mesh.material = getRandomMaterial();

        }
    const handlePointerOver =() => {
        document.body.style.cursor = "pointer"
    }
    const handlePointerOut =() => {
        document.body.style.cursor = "default"
    }

    useEffect(()=>{
        let ctx = gsap.context(()=>{
            setVisible(true)
            gsap.from(meshRef.current.scale,
                {
                    x:0,
                    y:0,
                    z:0,
                    duration: 1,
                    ease: "elastic.out(1,0.3)",
                    delay: 1.6,
                });
            });
            return ()=>ctx.revert();
    }, []);


return (
    <group position={position} ref={meshRef}>
        <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
            <mesh
            geometry={geometry}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            visible={visible}
            material={startingMaterial}
            />
        </Float>

    </group>
)

    }

