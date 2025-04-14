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
    <div class="background-particles background-particles-top">
      <div class="particle" v-for="n in 20" :key="'top-'+n"></div>
    </div>
  </div>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue';
</script>

<style lang="scss">
// Глобальные стили
html, body {
  margin: 0;
  padding: 0;
  font-family: $font-family;
  font-size: $font-size-md;
  line-height: $line-height-normal;
  background: $background;
  color: $text-primary;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

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

.background-particles {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  
  &.background-particles-bottom {
    top: 0;
    left: 0;
    z-index: -1;
  }
  
  &.background-particles-top {
    top: 0;
    left: 0;
    z-index: 10;
  }
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    
    @for $i from 1 through 30 {
      &:nth-child(#{$i}) {
        top: random(100) * 1%;
        left: random(100) * 1%;
        animation-delay: random(15) * 0.5s;
        opacity: random(4) * 0.1;
        transform: scale(random(3) * 0.6);
        animation: float (10 + random(15)) * 1s infinite linear, colorChange (3 + random(7)) * 1s infinite alternate;
      }
    }
  }
}

.background-particles-top {
  .particle {
    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        top: random(100) * 1%;
        left: random(100) * 1%;
        animation-delay: random(15) * 0.5s;
        opacity: random(2) * 0.1;
        transform: scale(random(2) * 0.4);
        animation: float (10 + random(15)) * 1s infinite linear, colorChange (3 + random(7)) * 1s infinite alternate;
      }
    }
  }
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

// Анимации переходов
.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-normal;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Скроллбар
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: $surface-dark;
  border-radius: $border-radius-full;
}

::-webkit-scrollbar-thumb {
  background: $surface-light;
  border-radius: $border-radius-full;
  
  &:hover {
    background: rgba($primary, 0.3);
  }
}

// Выделение текста
::selection {
  background: rgba($primary, 0.3);
  color: $text-primary;
}

// Сброс стилей для кнопок
button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
}

// Сброс стилей для ссылок
a {
  color: $primary;
  text-decoration: none;
  transition: color $transition-fast;
  
  &:hover {
    color: $primary-light;
  }
}

// Типографика
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
  color: $text-primary;
}

h1 { font-size: $font-size-4xl; }
h2 { font-size: $font-size-3xl; }
h3 { font-size: $font-size-2xl; }
h4 { font-size: $font-size-xl; }
h5 { font-size: $font-size-lg; }
h6 { font-size: $font-size-md; }

p {
  margin: 0 0 $spacing-md;
  
  &:last-child {
    margin-bottom: 0;
  }
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-30px) translateX(15px);
  }
  50% {
    transform: translateY(-15px) translateX(30px);
  }
  75% {
    transform: translateY(20px) translateX(10px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}

@keyframes colorChange {
  0% {
    background: rgba($primary, 0.6);
    box-shadow: 0 0 10px rgba($primary, 0.8);
  }
  33% {
    background: rgba($accent, 0.6);
    box-shadow: 0 0 10px rgba($accent, 0.8);
  }
  66% {
    background: rgba($success, 0.6);
    box-shadow: 0 0 10px rgba($success, 0.8);
  }
  100% {
    background: rgba($primary-light, 0.6);
    box-shadow: 0 0 10px rgba($primary-light, 0.8);
  }
}
</style> 