<script setup lang="ts">
import { Cone, Plane } from '@tresjs/cientos';
import { useSeek } from '@tresjs/core';
import { degToRad } from 'three/src/math/MathUtils';
import { computed, reactive, shallowRef, watch } from 'vue';
import { gsap } from 'gsap';

const {seekAll } = useSeek()

const meshes:any = shallowRef(null)
const shapesGroup:any = shallowRef(null)
const state = reactive({
  grid: {
    rows: 6,
    cols: 14,
    gutter: 2.2
  }
})

watch(shapesGroup, () => {
  meshes.value = seekAll(shapesGroup.value, 'type', 'Mesh')

  meshes.value.forEach(mesh => {
    mesh.initialRotation = {
      x: mesh.name === 'torus' ? degToRad(90) : mesh.rotation.x,
      y: mesh.rotation.y,
      z: mesh.name === 'cone' || mesh.name === 'cylinder' ? degToRad(-180) : mesh.rotation.z,
    };

    mesh.rotation.x = mesh.initialRotation.x
    mesh.rotation.y = mesh.initialRotation.y
    mesh.rotation.z = mesh.initialRotation.z
  })
})
const method = {
  distance: (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  },
  map: (value: number, start1: number, stop1: number, start2: number, stop2: number) => {
  return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2
},
  onPointerMove: ({ point }) => {
    if (!meshes.value) return

    const { x, y, z } = point

  meshes.value.forEach(mesh => {
      const mouseDistance = method.distance(x, z,
        mesh.position.x,
        mesh.position.z);

      const y = method.map(mouseDistance, 7, 0, 0, 6);

      gsap.to(mesh.position, { y: y < 1 ? 1 : y, duration: .3 });

      const scaleFactor = mesh.position.y / 1.2;
      const scale = scaleFactor < 1 ? 1 : scaleFactor;

      gsap.to(mesh.scale,
        {
          ease: "expo.out",
          x: scale,
          y: scale,
          z: scale,
          duration: .3
        });

      gsap.to(mesh.rotation, {
        duration: .7,
        ease: "expo.out",
        x: method.map(mesh.position.y, -1, 1, degToRad(270), mesh.initialRotation.x),
        z: method.map(mesh.position.y, -1, 1, degToRad(-90), mesh.initialRotation.z),
        y: method.map(mesh.position.y, -1, 1, degToRad(45), mesh.initialRotation.y),
      });
    })
  },
  getShapeType: (row: number, col: number) => {
  const randomIndex = Math.floor(Math.random() * 3); // Generate a random number between 0 and 2
  console.log(row, '和', col, "的值为", randomIndex);

  // Assigning shape types based on the random index
  if (randomIndex === 0) return 'torus';
  if (randomIndex === 1) return 'cone';
  return 'cylinder';
},
computePosition: (col: number, row: number): any => {
  return [(col - 1) * state.grid.gutter - gridOffset.value.x, 0, (row - 1) * state.grid.gutter - gridOffset.value.z];
},
}

const gridOffset = computed(() => {
  const x = ((state.grid.cols - 1) * state.grid.gutter) / 2;
  const z = ((state.grid.rows - 1) * state.grid.gutter) / 2;

  return { x, z }
})


</script>
<template>
  <Plane receive-shadow @pointer-move="method.onPointerMove" :args="[100, 100]" :rotation-x="- Math.PI / 2"
    :position="[0, 0, 0]">
    <TresShadowMaterial transparent :opacity=".3" />
  </Plane>

  <TresGroup ref="shapesGroup" name="shapes">
    <TresGroup v-for="row in state.grid.rows" :key="`row-${row}`">
      <TresGroup v-for="col in state.grid.cols" :key="`col-${col}-${row}`">
        <!-- Torus Mesh -->
        <TresMesh v-if="method.getShapeType(row, col) === 'torus'" name="torus" cast-shadow receive-shadow
          :position="method.computePosition(col, row)">
          <TresTorusGeometry :args="[.25, .08, 30, 200]" />
          <TresMeshPhysicalMaterial color="#3e2917" :metalness=".58" emissive="#000000" :roughness=".05" />
        </TresMesh>

        <!-- Cone -->
        <Cone v-else-if="method.getShapeType(row, col) === 'cone'" name="cone" :args="[.3, .5, 32]" cast-shadow receive-shadow
          :position="method.computePosition(col, row)">
          <TresMeshPhysicalMaterial color="#3e2917" :metalness=".58" emissive="#000000" :roughness=".05" />
        </Cone>

        <!-- Cylinder Mesh -->
        <TresMesh v-else name="cylinder" cast-shadow receive-shadow :position="method.computePosition(col, row)">
          <TresCylinderGeometry :args="[.3, .3, .2, 64]" />
          <TresMeshPhysicalMaterial color="#3e2917" :metalness=".58" emissive="#000000" :roughness=".05" />
        </TresMesh>
      </TresGroup>
    </TresGroup>

  </TresGroup>
</template>