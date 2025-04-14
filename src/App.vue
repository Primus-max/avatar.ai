<template>
  <div class="app">
    <div class="background-particles background-particles-bottom">
      <div class="particle" v-for="n in 30" :key="'bottom-'+n"></div>
    </div>
    <Navigation />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
    <div class="background-particles background-particles-top">
      <div class="particle" v-for="n in 20" :key="'top-'+n"></div>
    </div>
  </div>
</template>

<script setup>
import '@/styles/main.scss';

import Footer from '@/components/Footer.vue';
import Navigation from '@/components/Navigation.vue';
</script>

<style lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.main-content {
  flex: 1;
  padding-top: $nav-height;
  width: 100%;
  max-width: $container-max-width;
  margin: 0 auto;
  padding-left: $container-padding;
  padding-right: $container-padding;
  position: relative;
  z-index: 1;
}

// Стили для контентной части внутри Router View
:deep(.view-content) {
  background: rgba($background, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: $border-radius-lg;
  box-shadow: 0 0 30px rgba($surface-dark, 0.3);
  padding: $spacing-lg;
  position: relative;
  z-index: 1;
}

// Стили для переходов между страницами
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 