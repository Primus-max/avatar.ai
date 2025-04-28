<template>
  <div class="avatar-model-container" ref="containerRef">
    <!-- Индикатор загрузки -->
    <div v-if="loading" class="loading-overlay">
      <v-progress-circular indeterminate color="primary" />
      <span>Загрузка аватара...</span>
    </div>
    
    <!-- Контролы управления 3D-моделью -->
    <div class="model-controls">
      <v-btn class="control-btn circle-btn" icon="mdi-rotate-left" variant="text" @click="rotateModel('left')" />
      <v-btn class="control-btn circle-btn" icon="mdi-rotate-right" variant="text" @click="rotateModel('right')" />
      <v-btn class="control-btn circle-btn" icon="mdi-refresh" variant="text" @click="resetView()" />
      <v-btn class="control-btn circle-btn" icon="mdi-zoom-in" variant="text" @click="zoom('in')" />
      <v-btn class="control-btn circle-btn" icon="mdi-zoom-out" variant="text" @click="zoom('out')" />
    </div>
  </div>
</template>

<script setup>
import {
  defineProps,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const props = defineProps({
  modelType: {
    type: String,
    default: 'default' // Может быть 'default', 'realistic', 'anime', 'cartoon', 'futuristic'
  },
  autoRotate: {
    type: Boolean,
    default: false
  }
});

// Рефы и состояние
const containerRef = ref(null);
const loading = ref(true);

// Состояние Three.js
let scene, camera, renderer, controls, model;
let animationMixer, animationActions = {};
let clock = new THREE.Clock();
let cleanupFunction = null;

// Наблюдаем за изменением типа модели
watch(() => props.modelType, (newType) => {
  if (scene && model) {
    // Удаляем существующую модель
    scene.remove(model);
    
    // Создаем новую модель в соответствии с типом
    createModelByType(newType);
  }
});

// Создание модели в зависимости от выбранного типа
const createModelByType = (type) => {
  // В реальном приложении здесь должна быть загрузка соответствующей 3D-модели
  // Но для прототипа создаем простые геометрические формы разных цветов
  
  let geometry, material;
  
  switch (type) {
    case 'realistic':
      geometry = new THREE.SphereGeometry(2, 64, 64);
      material = new THREE.MeshStandardMaterial({ 
        color: 0xf5f5f5,
        metalness: 0.1,
        roughness: 0.2
      });
      break;
      
    case 'anime':
      geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
      material = new THREE.MeshToonMaterial({ 
        color: 0xff9cda
      });
      break;
      
    case 'cartoon':
      geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
      material = new THREE.MeshToonMaterial({ 
        color: 0x42d7f5
      });
      break;
      
    case 'futuristic':
      geometry = new THREE.IcosahedronGeometry(2, 1);
      material = new THREE.MeshStandardMaterial({ 
        color: 0x2196f3,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x0c4da2,
        emissiveIntensity: 0.2
      });
      break;
      
    default:
      geometry = new THREE.SphereGeometry(2, 32, 32);
      material = new THREE.MeshStandardMaterial({ 
        color: 0x2196f3,
        metalness: 0.3,
        roughness: 0.4,
      });
  }
  
  model = new THREE.Mesh(geometry, material);
  scene.add(model);
  
  // Завершаем загрузку
  loading.value = false;
};

// Инициализация 3D-сцены
const initThreeJS = () => {
  if (!containerRef.value) return;
  
  const container = containerRef.value;
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Создаем сцену
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x121212);

  // Создаем камеру
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  // Создаем рендерер
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Добавляем освещение
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 1, 2);
  scene.add(directionalLight);
  
  // Добавляем задний свет для подсветки контуров
  const backLight = new THREE.DirectionalLight(0x6f42c1, 0.5);
  backLight.position.set(0, 0, -3);
  scene.add(backLight);

  // Добавляем управление орбитой для вращения камеры
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.autoRotate = props.autoRotate;
  controls.autoRotateSpeed = 1.0;

  // Создаем модель в соответствии с типом
  createModelByType(props.modelType);

  // Добавляем сетку для ориентации
  const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
  scene.add(gridHelper);

  // Запускаем анимационный цикл
  const animate = () => {
    const animationId = requestAnimationFrame(animate);

    if (model) {
      // Дополнительная анимация модели
      model.rotation.y += 0.002;
    }

    if (controls) {
      controls.update();
    }

    if (animationMixer) {
      const delta = clock.getDelta();
      animationMixer.update(delta);
    }

    renderer.render(scene, camera);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  };

  const stopAnimation = animate();

  // Обработчик изменения размера окна
  const handleResize = () => {
    if (!containerRef.value) return;
    
    const newWidth = containerRef.value.clientWidth;
    const newHeight = containerRef.value.clientHeight;
    
    if (camera && renderer) {
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    }
  };

  window.addEventListener('resize', handleResize);

  // Функция очистки ресурсов
  cleanupFunction = () => {
    stopAnimation();
    window.removeEventListener('resize', handleResize);
    
    if (renderer && container) {
      container.removeChild(renderer.domElement);
      renderer.dispose();
    }
    
    if (scene) {
      // Очищаем сцену
      while(scene.children.length > 0) { 
        const obj = scene.children[0];
        scene.remove(obj);
      }
    }
    
    // Очищаем другие ресурсы Three.js
    scene = null;
    camera = null;
    renderer = null;
    controls = null;
    model = null;
  };
};

// Функции управления моделью
const rotateModel = (direction) => {
  if (!model) return;
  
  if (direction === 'left') {
    model.rotation.y += Math.PI / 4;
  } else {
    model.rotation.y -= Math.PI / 4;
  }
};

const zoom = (direction) => {
  if (!camera || !controls) return;
  
  if (direction === 'in') {
    camera.position.z = Math.max(camera.position.z - 0.5, 2.5);
  } else {
    camera.position.z = Math.min(camera.position.z + 0.5, 10);
  }
  
  camera.updateProjectionMatrix();
  controls.update();
};

const resetView = () => {
  if (!camera || !controls) return;
  
  camera.position.set(0, 0, 5);
  controls.reset();
};

// Жизненный цикл компонента
onMounted(() => {
  // Небольшая задержка для гарантии, что DOM полностью загружен
  setTimeout(() => {
    initThreeJS();
  }, 100);
});

onBeforeUnmount(() => {
  if (cleanupFunction) {
    cleanupFunction();
  }
});
</script>

<style lang="scss" scoped>
.avatar-model-container {
  width: 100%;
  height: 400px;
  position: relative;
  border-radius: $border-radius-lg;
  overflow: hidden;
  
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba($background, 0.7);
    z-index: 5;
    
    span {
      margin-top: $spacing-md;
      color: $text-primary;
    }
  }
  
  .model-controls {
    position: absolute;
    bottom: $spacing-md;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: $spacing-sm;
    z-index: 10;
    background: rgba($surface-dark, 0.6);
    padding: $spacing-sm;
    border-radius: $border-radius-full;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 15px rgba($background, 0.3);
  }
}

// Стили для кнопки управления
.control-btn {
  height: 40px;
  min-width: 40px;
  border-radius: $border-radius-lg;
  position: relative;
  background: rgba($surface, 0.3);
  border: 1px solid rgba($primary, 0.3);
  color: $text-primary;
  transition: all $transition-normal;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba($primary, 0.1);
    box-shadow: 0 0 15px rgba($primary, 0.2);
    transform: translateY(-2px);
  }
  
  .v-icon {
    color: $primary;
    filter: drop-shadow(0 0 3px rgba($primary, 0.2));
  }
  
  &.circle-btn {
    width: 40px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    padding: 0;
    
    .v-btn__prepend {
      margin-right: 0;
      margin-inline-start: 0;
    }
    
    .v-icon {
      margin: 0;
    }
  }
}
</style> 