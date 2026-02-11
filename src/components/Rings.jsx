import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Bounds, Edges, Float } from '@react-three/drei';
// use ↓ "DebugLayerMaterial as LayerMaterial" ↓ here for integrated leva debug panels
import { LayerMaterial, Depth, Fresnel } from 'lamina';
import { useControls } from 'leva';

function Rings(props) {
  const ref = useRef();
  const { nodes } = useGLTF('/models/cursor.glb');

  // Animate gradient
  useFrame((state) => {
    const sin = Math.sin(state.clock.elapsedTime / 2);
    const cos = Math.cos(state.clock.elapsedTime / 2);
    ref.current.layers[0].origin.set(cos / 2, 0, 0);
    ref.current.layers[1].origin.set(cos, sin, cos);
    ref.current.layers[2].origin.set(sin, cos, sin);
    ref.current.layers[3].origin.set(cos, sin, cos);
  });

  return (
    <Float
      speed={1.5} // animation speed
      rotationIntensity={0.4} // subtle rotation
      floatIntensity={0.8} // up/down movement
      floatingRange={[-0.2, 0.2]} // Y range
    >
      <mesh {...props} geometry={nodes.Cube.geometry}>
        <LayerMaterial ref={ref} toneMapped={false}>
          <Depth colorA="#ff0080" colorB="black" alpha={1} mode="normal" near={0.5} far={0.5} />
          <Depth colorA="blue" colorB="#f7b955" alpha={1} mode="add" near={2} far={2} />
          <Depth colorA="green" colorB="#f7b955" alpha={1} mode="add" near={3} far={3} />
          <Depth colorA="white" colorB="red" alpha={1} mode="overlay" near={1.5} far={1.5} />
          <Fresnel mode="add" color="white" intensity={0.5} power={1.5} bias={0.05} />
        </LayerMaterial>
        <Edges color="white" />
      </mesh>
    </Float>
  );
}

export default Rings;
