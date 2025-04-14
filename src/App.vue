<template>
  <div class="app">
    <Navigation />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
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
}

.main-content {
  flex: 1;
  padding-top: $nav-height;
  width: 100%;
  max-width: $container-max-width;
  margin: 0 auto;
  padding-left: $container-padding;
  padding-right: $container-padding;
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
</style> 