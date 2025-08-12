// import React, { useMemo } from "react";
// import { Group } from "three";
// import { useGraph } from "@react-three/fiber";
// import { useGLTF, PerspectiveCamera } from "@react-three/drei";
// import { GLTF } from "three-stdlib";
// import { SkeletonUtils } from "three-stdlib";

// type GLTFResult = GLTF & {
//   nodes: {
//     [key: string]: any;
//   };
//   materials: {
//     [key: string]: any;
//   };
// };

// export interface WavingRobotProps extends JSX.IntrinsicElements["group"] {}

// export function WavingRobot(props: WavingRobotProps) {
//   const { scene } = useGLTF("/models/genkub_greeting_robot.glb") as GLTFResult;
//   const clone = useMemo(() => SkeletonUtils.clone(scene) as Group, [scene]);
//   const { nodes, materials } = useGraph(clone) as unknown as GLTFResult;

//   return (
//     <group {...props} dispose={null}>
//       <group scale={0.01}>
//         <group position={[59.064, 150, 96.782]}>
//           <directionalLight
//             intensity={0.436}
//             decay={2}
//             color="#f8d6d0"
//             rotation={[-1.266, -0.295, -1.48]}
//             target={nodes.Directional_Light_3.target}
//           >
//             <primitive
//               object={nodes.Directional_Light_3.target}
//               position={[0, 0, -1]}
//             />
//           </directionalLight>
//           <directionalLight
//             intensity={1.769}
//             decay={2}
//             color="#bdddf6"
//             rotation={[-2.756, 0.519, -0.686]}
//             target={nodes.Directional_Light_2.target}
//           >
//             <primitive
//               object={nodes.Directional_Light_2.target}
//               position={[0, 0, -1]}
//             />
//           </directionalLight>
//           <directionalLight
//             intensity={0.29}
//             decay={2}
//             rotation={[-0.398, 0.51, 0.711]}
//             target={nodes.Directional_Light.target}
//           >
//             <primitive
//               object={nodes.Directional_Light.target}
//               position={[0, 0, -1]}
//             />
//           </directionalLight>
//         </group>
//         <group position={[0, 0.214, 0]} scale={98.043}>
//           <group position={[0, -0.002, 0]} scale={0.01}>
//             <group
//               position={[-0.084, 25.17, 0]}
//               rotation={[0, 0, -0.122]}
//               scale={98.043}
//             >
//               <group position={[0.001, -0.257, 0]}>
//                 <mesh
//                   geometry={nodes.Cylinder.geometry}
//                   material={nodes.Cylinder.material}
//                 />
//                 <mesh
//                   geometry={nodes.Ears.geometry}
//                   material={nodes.Ears.material}
//                 />
//                 <mesh
//                   geometry={nodes.Cylinder002.geometry}
//                   material={nodes.Cylinder002.material}
//                 />
//               </group>
//               <group position={[0.202, -0.084, 0]} scale={[0.01, 0.008, 0.01]}>
//                 <mesh
//                   geometry={nodes.Mouth.geometry}
//                   material={nodes.Mouth.material}
//                   position={[-19.679, -16.701, 0]}
//                   scale={98.043}
//                 />
//               </group>
//               <group position={[0.202, -0.019, 0]} scale={0.01}>
//                 <mesh
//                   geometry={nodes.Eyes.geometry}
//                   material={nodes.Eyes.material}
//                   position={[-19.679, -23.054, 0]}
//                   scale={98.043}
//                 />
//               </group>
//               <mesh
//                 geometry={nodes.Head_1.geometry}
//                 material={nodes.Head_1.material}
//                 position={[0.001, -0.255, 0]}
//               />
//               <mesh
//                 geometry={nodes.Head_2.geometry}
//                 material={nodes.Head_2.material}
//                 position={[0.001, -0.255, 0]}
//               />
//             </group>
//           </group>
//           <group position={[0.012, -0.223, 0]}>
//             <mesh
//               geometry={nodes.Neck.geometry}
//               material={nodes.Neck.material}
//               position={[-0.012, 0.223, 0]}
//             />
//             <mesh
//               geometry={nodes.Body.geometry}
//               material={nodes.Body.material}
//               position={[-0.012, 0.223, 0]}
//             />
//             <mesh
//               geometry={nodes.Body_Circle_1.geometry}
//               material={nodes.Body_Circle_1.material}
//               position={[-0.012, 0.223, 0]}
//             />
//             <mesh
//               geometry={nodes.Body_Circle_2.geometry}
//               material={nodes.Body_Circle_2.material}
//               position={[-0.012, 0.223, 0]}
//             />
//           </group>
//           <group position={[0.032, -0.26, 0.254]}>
//             <group position={[-0.016, 0.202, -0.042]}>
//               <group position={[0.001, -0.153, 0.054]} scale={0.01}>
//                 <group
//                   position={[1.388, -13.646, 1.559]}
//                   scale={98.043}
//                 >
//                   <mesh
//                     geometry={nodes.Arm_R.geometry}
//                     material={nodes.Arm_R.material}
//                     position={[-0.01, 0.273, -0.071]}
//                   />
//                   <mesh
//                     geometry={nodes.HAND_R.geometry}
//                     material={nodes.HAND_R.material}
//                     position={[-0.01, 0.074, 0.014]}
//                     rotation={[Math.PI, -1.571, 0]}
//                   />
//                 </group>
//               </group>
//               <mesh
//                 geometry={nodes.Forearm_R.geometry}
//                 material={nodes.Forearm_R.material}
//                 position={[-0.016, 0.058, -0.212]}
//                 rotation={[0.035, 0, 0]}
//                 scale={[1, 0.8, 1]}
//               />
//             </group>
//             <mesh
//               geometry={nodes.Shoulder_R.geometry}
//               material={nodes.Shoulder_R.material}
//               position={[-0.032, 0.26, -0.254]}
//             />
//           </group>
//           <group position={[0.038, -0.254, -0.254]}>
//             <mesh
//               geometry={nodes.Hand_L.geometry}
//               material={nodes.Hand_L.material}
//               position={[-0.032, 0.223, 0.286]}
//               rotation={[0, 0, -0.004]}
//               scale={[0.773, 0.865, 0.892]}
//             />
//             <mesh
//               geometry={nodes.Arm_L.geometry}
//               material={nodes.Arm_L.material}
//               position={[-0.038, 0.254, 0.254]}
//             />
//             <mesh
//               geometry={nodes.Forearm_L.geometry}
//               material={nodes.Forearm_L.material}
//               position={[-0.038, 0.254, 0.254]}
//             />
//             <mesh
//               geometry={nodes.Shoulder_L.geometry}
//               material={nodes.Shoulder_L.material}
//               position={[-0.038, 0.254, 0.254]}
//             />
//           </group>
//         </group>
//         <PerspectiveCamera
//           makeDefault={false}
//           far={100000}
//           near={70}
//           fov={45}
//           position={[189.475, 6.014, 72.338]}
//           rotation={[-0.17, 1.122, 0.154]}
//         />
//         <PerspectiveCamera
//           makeDefault={false}
//           far={100000}
//           near={70}
//           fov={45}
//           position={[465.2, 5.791, -42.636]}
//           rotation={[0, Math.PI / 2, 0]}
//         />
//       </group>
//     </group>
//   );
// }

// useGLTF.preload("/models/genkub_greeting_robot.glb");

// export default WavingRobot;
