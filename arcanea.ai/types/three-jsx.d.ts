import { Object3DNode, MaterialNode, BufferGeometryNode } from '@react-three/fiber';
import * as THREE from 'three';

// Extend JSX intrinsic elements for Three.js/React Three Fiber
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Object3D elements
      group: Object3DNode<THREE.Group, typeof THREE.Group>;
      mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      line: Object3DNode<THREE.Line, typeof THREE.Line>;
      lineSegments: Object3DNode<THREE.LineSegments, typeof THREE.LineSegments>;
      points: Object3DNode<THREE.Points, typeof THREE.Points>;
      sprite: Object3DNode<THREE.Sprite, typeof THREE.Sprite>;
      instancedMesh: Object3DNode<THREE.InstancedMesh, typeof THREE.InstancedMesh>;

      // Scene elements
      scene: Object3DNode<THREE.Scene, typeof THREE.Scene>;
      fog: Object3DNode<THREE.Fog, typeof THREE.Fog>;
      fogExp2: Object3DNode<THREE.FogExp2, typeof THREE.FogExp2>;

      // Camera elements
      perspectiveCamera: Object3DNode<THREE.PerspectiveCamera, typeof THREE.PerspectiveCamera>;
      orthographicCamera: Object3DNode<THREE.OrthographicCamera, typeof THREE.OrthographicCamera>;

      // Light elements
      ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
      pointLight: Object3DNode<THREE.PointLight, typeof THREE.PointLight>;
      spotLight: Object3DNode<THREE.SpotLight, typeof THREE.SpotLight>;
      hemisphereLight: Object3DNode<THREE.HemisphereLight, typeof THREE.HemisphereLight>;
      rectAreaLight: Object3DNode<THREE.RectAreaLight, typeof THREE.RectAreaLight>;

      // Geometry elements
      bufferGeometry: BufferGeometryNode<THREE.BufferGeometry, typeof THREE.BufferGeometry>;
      boxGeometry: BufferGeometryNode<THREE.BoxGeometry, typeof THREE.BoxGeometry>;
      sphereGeometry: BufferGeometryNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
      planeGeometry: BufferGeometryNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>;
      cylinderGeometry: BufferGeometryNode<THREE.CylinderGeometry, typeof THREE.CylinderGeometry>;
      coneGeometry: BufferGeometryNode<THREE.ConeGeometry, typeof THREE.ConeGeometry>;
      torusGeometry: BufferGeometryNode<THREE.TorusGeometry, typeof THREE.TorusGeometry>;
      torusKnotGeometry: BufferGeometryNode<THREE.TorusKnotGeometry, typeof THREE.TorusKnotGeometry>;
      ringGeometry: BufferGeometryNode<THREE.RingGeometry, typeof THREE.RingGeometry>;
      octahedronGeometry: BufferGeometryNode<THREE.OctahedronGeometry, typeof THREE.OctahedronGeometry>;
      tetrahedronGeometry: BufferGeometryNode<THREE.TetrahedronGeometry, typeof THREE.TetrahedronGeometry>;
      icosahedronGeometry: BufferGeometryNode<THREE.IcosahedronGeometry, typeof THREE.IcosahedronGeometry>;
      dodecahedronGeometry: BufferGeometryNode<THREE.DodecahedronGeometry, typeof THREE.DodecahedronGeometry>;
      circleGeometry: BufferGeometryNode<THREE.CircleGeometry, typeof THREE.CircleGeometry>;
      tubeGeometry: BufferGeometryNode<THREE.TubeGeometry, typeof THREE.TubeGeometry>;
      extrudeGeometry: BufferGeometryNode<THREE.ExtrudeGeometry, typeof THREE.ExtrudeGeometry>;
      latheGeometry: BufferGeometryNode<THREE.LatheGeometry, typeof THREE.LatheGeometry>;
      shapeGeometry: BufferGeometryNode<THREE.ShapeGeometry, typeof THREE.ShapeGeometry>;

      // Buffer attribute
      bufferAttribute: Object3DNode<THREE.BufferAttribute, typeof THREE.BufferAttribute>;

      // Material elements
      meshBasicMaterial: MaterialNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>;
      meshStandardMaterial: MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
      meshPhongMaterial: MaterialNode<THREE.MeshPhongMaterial, typeof THREE.MeshPhongMaterial>;
      meshLambertMaterial: MaterialNode<THREE.MeshLambertMaterial, typeof THREE.MeshLambertMaterial>;
      meshPhysicalMaterial: MaterialNode<THREE.MeshPhysicalMaterial, typeof THREE.MeshPhysicalMaterial>;
      meshToonMaterial: MaterialNode<THREE.MeshToonMaterial, typeof THREE.MeshToonMaterial>;
      meshNormalMaterial: MaterialNode<THREE.MeshNormalMaterial, typeof THREE.MeshNormalMaterial>;
      meshDepthMaterial: MaterialNode<THREE.MeshDepthMaterial, typeof THREE.MeshDepthMaterial>;
      meshMatcapMaterial: MaterialNode<THREE.MeshMatcapMaterial, typeof THREE.MeshMatcapMaterial>;
      pointsMaterial: MaterialNode<THREE.PointsMaterial, typeof THREE.PointsMaterial>;
      lineBasicMaterial: MaterialNode<THREE.LineBasicMaterial, typeof THREE.LineBasicMaterial>;
      lineDashedMaterial: MaterialNode<THREE.LineDashedMaterial, typeof THREE.LineDashedMaterial>;
      spriteMaterial: MaterialNode<THREE.SpriteMaterial, typeof THREE.SpriteMaterial>;
      shaderMaterial: MaterialNode<THREE.ShaderMaterial, typeof THREE.ShaderMaterial>;
      rawShaderMaterial: MaterialNode<THREE.RawShaderMaterial, typeof THREE.RawShaderMaterial>;

      // Helpers
      axesHelper: Object3DNode<THREE.AxesHelper, typeof THREE.AxesHelper>;
      gridHelper: Object3DNode<THREE.GridHelper, typeof THREE.GridHelper>;
      boxHelper: Object3DNode<THREE.BoxHelper, typeof THREE.BoxHelper>;
      planeHelper: Object3DNode<THREE.PlaneHelper, typeof THREE.PlaneHelper>;
      arrowHelper: Object3DNode<THREE.ArrowHelper, typeof THREE.ArrowHelper>;

      // Other
      primitive: { object: THREE.Object3D; [key: string]: unknown };
      color: Object3DNode<THREE.Color, typeof THREE.Color>;
    }
  }
}

export {};
