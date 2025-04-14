<template>
  <nav class="navigation" :class="{ 'nav-expanded': isMenuOpen }">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <div class="logo-avatar">
          <img src="@/assets/logo.svg" alt="Avatar.AI" class="logo-image">
          <div class="logo-glow"></div>
        </div>
        <span class="logo-text">Avatar.AI</span>
      </router-link>

      <div class="nav-links-container">
        <div class="nav-links">
          <router-link 
            v-for="link in navigationLinks" 
            :key="link.path"
            :to="link.path"
            class="nav-link"
            :class="{ active: isCurrentRoute(link.path) }"
          >
            <div class="link-avatar-container">
              <v-icon :icon="link.icon" class="link-icon" />
              <div class="link-glow"></div>
            </div>
            <span class="link-text">{{ link.title }}</span>
          </router-link>
        </div>
      </div>

      <div class="nav-actions">
        <div class="search-bar">
          <v-icon icon="mdi-magnify" class="search-icon" />
          <input 
            type="text" 
            placeholder="Поиск..." 
            v-model="searchQuery"
            @focus="isSearchFocused = true"
            @blur="isSearchFocused = false"
          >
          <div class="search-glow" :class="{ active: isSearchFocused }"></div>
        </div>

        <div class="user-avatar-container" @click="toggleUserMenu" ref="userMenuTrigger">
          <div class="user-avatar">
            <img :src="currentUser.avatar" :alt="currentUser.name">
            <div class="avatar-glow" :class="currentUser.status"></div>
          </div>
          <span class="user-name">{{ currentUser.name }}</span>
          <v-icon icon="mdi-chevron-down" :class="{ 'menu-open': isUserMenuOpen }" />
        </div>

        <v-menu
          v-model="isUserMenuOpen"
          :close-on-content-click="false"
          :activator="userMenuTrigger"
          class="user-menu-dropdown"
        >
          <div class="menu-content">
            <div class="menu-header">
              <div class="menu-avatar-container">
                <img :src="currentUser.avatar" :alt="currentUser.name" class="menu-avatar">
                <div class="menu-avatar-glow"></div>
              </div>
              <div class="menu-user-info">
                <span class="menu-user-name">{{ currentUser.name }}</span>
                <span class="menu-user-role">{{ currentUser.role }}</span>
              </div>
            </div>

            <div class="menu-actions">
              <button 
                v-for="action in userMenuActions" 
                :key="action.id"
                class="menu-action-btn"
                @click="action.handler"
              >
                <div class="action-icon-container">
                  <v-icon :icon="action.icon" />
                  <div class="action-glow"></div>
                </div>
                <span>{{ action.title }}</span>
              </button>
            </div>

            <div class="menu-footer">
              <button class="logout-btn" @click="logout">
                <v-icon icon="mdi-logout" />
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </v-menu>
      </div>
      
      <button class="menu-toggle" @click="toggleMenu">
        <div class="menu-line"></div>
        <div class="menu-line"></div>
        <div class="menu-line"></div>
      </button>
    </div>
  </nav>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue';

import {
  useRoute,
  useRouter,
} from 'vue-router';

const route = useRoute();
const router = useRouter();

const searchQuery = ref('');
const isSearchFocused = ref(false);
const isUserMenuOpen = ref(false);
const userMenuTrigger = ref(null);
const isMenuOpen = ref(false);

const navigationLinks = [
  { 
    title: 'Мир',
    path: '/',
    icon: 'mdi-earth'
  },
  { 
    title: 'Аватар',
    path: '/avatar',
    icon: 'mdi-account'
  },
  { 
    title: 'Сообщество',
    path: '/community',
    icon: 'mdi-account-group'
  },
  { 
    title: 'Настройки',
    path: '/settings',
    icon: 'mdi-cog'
  }
];

const currentUser = {
  name: 'Александр',
  role: 'Цифровой Создатель',
  avatar: 'https://via.placeholder.com/40',
  status: 'online'
};

const userMenuActions = [
  {
    id: 'profile',
    title: 'Твоя сущность',
    icon: 'mdi-account-circle',
    handler: () => router.push('/avatar')
  },
  {
    id: 'settings',
    title: 'Настройки',
    icon: 'mdi-cog',
    handler: () => router.push('/settings')
  },
  {
    id: 'help',
    title: 'Помощь',
    icon: 'mdi-help-circle',
    handler: () => router.push('/help')
  }
];

const isCurrentRoute = (path) => route.path === path;

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const logout = () => {
  // Логика выхода
  console.log('Выход из системы...');
};
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba($background, 0.8);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba($primary, 0.2);
  z-index: $z-index-fixed;
  transition: all $transition-normal;
}

.nav-container {
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
  padding: 0 $spacing-sm;
  display: flex;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  text-decoration: none;
  color: $text-primary;
  z-index: 2;
  min-width: 130px;
  margin-right: $spacing-md;
  
  @media (min-width: $breakpoint-xl) {
    margin-right: $spacing-lg;
  }

  .logo-avatar {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    
    .logo-image {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    
    .logo-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0 0 15px rgba($primary, 0.7);
      animation: pulse 3s infinite;
    }
  }

  .logo-text {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    background: linear-gradient(135deg, #ffffff, rgba($primary-light, 0.8));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 10px rgba($primary, 0.5);
  }
  
  &:hover {
    .logo-glow {
      box-shadow: 0 0 30px rgba($primary, 1);
    }
    
    .logo-text {
      text-shadow: 0 0 18px rgba($primary, 0.7);
      
      &:after {
        animation: glowLine 2s infinite alternate;
      }
    }
  }
}

.nav-links-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-links {
  display: flex;
  gap: $spacing-xs;
  
  @media (min-width: 1200px) {
    gap: $spacing-sm;
  }
  
  @media (min-width: 1400px) {
    gap: $spacing-md;
  }
  
  .nav-link {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-sm $spacing-md $spacing-xs;
    color: $text-secondary;
    text-decoration: none;
    border-radius: $border-radius-lg;
    transition: all $transition-normal;
    overflow: hidden;
    box-shadow: inset 0 0 0 rgba($primary, 0), 0 0 0 rgba($primary, 0);

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba($primary, 0.05), rgba($accent, 0.05));
      opacity: 0;
      transition: opacity $transition-normal;
    }

    .link-avatar-container {
      position: relative;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;

      .link-icon {
        font-size: 24px;
        z-index: 1;
        transition: all $transition-normal;
        filter: drop-shadow(0 0 0 rgba($primary, 0));
      }

      .link-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba($primary, 0.2) 0%, rgba($primary, 0) 70%);
        transition: all $transition-normal;
        opacity: 0.5;
      }
    }

    .link-text {
      font-weight: $font-weight-medium;
      font-size: $font-size-xs;
      margin-top: $spacing-xs;
      transition: all $transition-normal;
      position: relative;
      
      &:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0%;
        height: 1px;
        background: linear-gradient(90deg, transparent, $primary, transparent);
        transition: width $transition-normal;
      }
    }

    &:hover {
      color: $text-primary;
      background: rgba($surface-light, 0.15);
      box-shadow: inset 0 0 10px rgba($primary, 0.1), 0 0 10px rgba($primary, 0.1);
      
      &:before {
        opacity: 1;
      }
      
      .link-avatar-container {
        .link-icon {
          filter: drop-shadow(0 0 5px rgba($primary, 0.6));
          transform: translateY(-2px) scale(1.1);
        }
        
        .link-glow {
          width: 50px;
          height: 50px;
          opacity: 0.8;
        }
      }
      
      .link-text {
        &:after {
          width: 100%;
        }
      }
    }

    &.active {
      color: white;
      background: linear-gradient(135deg, rgba($primary, 0.25), rgba($accent, 0.25));
      box-shadow: inset 0 0 15px rgba($primary, 0.3), 0 0 20px rgba($primary, 0.4);
      
      &:before {
        opacity: 1;
        background: linear-gradient(135deg, rgba($primary, 0.1), rgba($accent, 0.1));
      }
      
      .link-avatar-container {
        .link-icon {
          filter: drop-shadow(0 0 8px rgba($primary, 0.8));
          transform: scale(1.15);
        }
        
        .link-glow {
          width: 65px;
          height: 65px;
          background: radial-gradient(circle, rgba($primary, 0.9) 0%, rgba($primary, 0) 70%);
          animation: pulse 3s infinite;
          opacity: 1;
        }
      }
      
      .link-text {
        text-shadow: 0 0 8px rgba($primary, 0.7);
        
        &:after {
          width: 100%;
          height: 2px;
          animation: glowLine 3s infinite alternate;
        }
      }
      
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, $primary, $accent, transparent);
        animation: glowLine 3s infinite alternate;
      }
    }
  }
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin-left: $spacing-md;
  
  @media (min-width: $breakpoint-xl) {
    margin-left: $spacing-lg;
    gap: $spacing-lg;
  }
}

.search-bar {
  position: relative;
  width: 180px;
  
  @media (min-width: 1200px) {
    width: 200px;
  }
  
  @media (min-width: $breakpoint-xl) {
    width: 240px;
  }

  .search-icon {
    position: absolute;
    left: $spacing-md;
    top: 50%;
    transform: translateY(-50%);
    color: $text-secondary;
    pointer-events: none;
    z-index: 1;
    transition: all $transition-normal;
  }

  input {
    width: 100%;
    height: $input-height;
    padding: 0 $spacing-md 0 ($spacing-md * 2 + 24px);
    background: rgba($surface, 0.3);
    border: 1px solid rgba($primary, 0.3);
    border-radius: $border-radius-full;
    color: $text-primary;
    font-size: $font-size-sm;
    transition: all $transition-normal;
    position: relative;
    z-index: 1;

    &::placeholder {
      color: $text-secondary;
    }

    &:focus {
      background: rgba($surface-light, 0.3);
      border-color: rgba($primary, 0.7);
      outline: none;
      
      & + .search-glow {
        box-shadow: 0 0 20px rgba($primary, 0.4);
      }
      
      & ~ .search-icon {
        color: $primary;
        filter: drop-shadow(0 0 5px rgba($primary, 0.6));
      }
    }
  }

  .search-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: $border-radius-full;
    box-shadow: 0 0 0 rgba($primary, 0);
    transition: all $transition-normal;
    pointer-events: none;
    
    &.active {
      box-shadow: 0 0 20px rgba($primary, 0.4);
    }
  }
  
  &:hover .search-icon {
    color: $text-primary;
  }
}

.user-avatar-container {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  padding: $spacing-xs $spacing-sm;
  
  @media (min-width: 1200px) {
    gap: $spacing-sm;
    padding: $spacing-xs $spacing-md;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 150%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba($primary, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  &:hover {
    background: linear-gradient(135deg, rgba($surface-light, 0.3), rgba($primary, 0.15));
    box-shadow: 0 0 20px rgba($primary, 0.3);
    
    &:before {
      transform: translateX(100%);
    }
    
    .user-avatar {
      .avatar-glow {
        &.online {
          box-shadow: 0 0 15px rgba($success, 1);
        }
      }
    }
    
    .user-name {
      text-shadow: 0 0 5px rgba($primary, 0.5);
    }
    
    .mdi-chevron-down {
      color: $text-primary;
      filter: drop-shadow(0 0 3px rgba($primary, 0.5));
    }
  }

  .user-avatar {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all $transition-normal;
    }

    .avatar-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: all $transition-normal;
      
      &.online {
        box-shadow: 0 0 10px rgba($success, 0.8);
      }

      &.away {
        box-shadow: 0 0 10px rgba($warning, 0.8);
      }

      &.offline {
        box-shadow: 0 0 10px rgba($text-disabled, 0.5);
      }
    }
  }

  .user-name {
    font-weight: $font-weight-medium;
    color: $text-primary;
    transition: all $transition-normal;
  }

  .mdi-chevron-down {
    color: $text-secondary;
    transition: all $transition-normal;

    &.menu-open {
      transform: rotate(180deg);
      color: $primary;
      filter: drop-shadow(0 0 3px rgba($primary, 0.5));
    }
  }
}

.menu-content {
  background: rgba($surface, 0.95);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: $border-radius-lg;
  border: 1px solid rgba($primary, 0.3);
  overflow: hidden;
  min-width: 260px;
  box-shadow: 0 0 35px rgba($primary, 0.4);

  .menu-header {
    padding: $spacing-lg;
    background: linear-gradient(135deg, rgba($background, 0.7), rgba($primary, 0.15));
    display: flex;
    align-items: center;
    gap: $spacing-md;
    position: relative;
    overflow: hidden;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba($primary, 0) 0%, rgba($primary, 0.2) 50%, rgba($primary, 0) 100%);
      animation: sweep 3s infinite linear;
    }

    .menu-avatar-container {
      position: relative;
      width: 60px;
      height: 60px;
      
      .menu-avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba($primary, 0.5);
      }
      
      .menu-avatar-glow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: 0 0 20px rgba($primary, 0.8);
        animation: pulseLogo 3s infinite;
      }
    }

    .menu-user-info {
      display: flex;
      flex-direction: column;

      .menu-user-name {
        font-weight: $font-weight-semibold;
        color: $text-primary;
        font-size: $font-size-lg;
        text-shadow: 0 0 5px rgba($primary, 0.3);
      }

      .menu-user-role {
        font-size: $font-size-sm;
        color: $text-secondary;
        
        &:before {
          content: '⦿';
          color: $primary;
          margin-right: $spacing-xs;
          text-shadow: 0 0 5px rgba($primary, 0.5);
        }
      }
    }
  }

  .menu-actions {
    padding: $spacing-md;

    .menu-action-btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: $spacing-md;
      padding: $spacing-sm $spacing-md;
      background: none;
      border: none;
      border-radius: $border-radius-md;
      color: $text-primary;
      cursor: pointer;
      transition: all $transition-fast;
      position: relative;
      overflow: hidden;

      .action-icon-container {
        position: relative;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .v-icon {
          color: $text-secondary;
          z-index: 1;
          transition: all $transition-normal;
        }
        
        .action-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba($primary, 0.5) 0%, rgba($primary, 0) 70%);
          transition: all $transition-normal;
        }
      }

      &:hover {
        background: linear-gradient(135deg, rgba($primary, 0.05), rgba($primary, 0.15));
        
        .action-icon-container {
          .v-icon {
            color: $primary;
            filter: drop-shadow(0 0 5px rgba($primary, 0.6));
            transform: scale(1.1);
          }
          
          .action-glow {
            width: 45px;
            height: 45px;
          }
        }
        
        &:after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(to bottom, rgba($primary, 0), rgba($primary, 0.7), rgba($primary, 0));
        }
        
        span {
          text-shadow: 0 0 5px rgba($primary, 0.3);
        }
      }
    }
  }

  .menu-footer {
    padding: $spacing-md;
    border-top: 1px solid rgba($primary, 0.1);

    .logout-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-sm;
      padding: $spacing-md;
      background: rgba($error, 0.1);
      border: 1px solid rgba($error, 0.3);
      border-radius: $border-radius-md;
      color: $error;
      font-weight: $font-weight-medium;
      cursor: pointer;
      transition: all $transition-fast;
      position: relative;
      overflow: hidden;

      &:hover {
        background: rgba($error, 0.2);
        box-shadow: 0 0 15px rgba($error, 0.3);
        text-shadow: 0 0 5px rgba($error, 0.5);
        
        .v-icon {
          filter: drop-shadow(0 0 5px rgba($error, 0.5));
          transform: translateX(-2px);
        }
        
        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba($error, 0) 0%, rgba($error, 0.2) 50%, rgba($error, 0) 100%);
          animation: sweep 2s infinite linear;
        }
      }
      
      .v-icon {
        transition: all $transition-normal;
      }
    }
  }
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 2;
  
  .menu-line {
    width: 100%;
    height: 2px;
    background-color: $text-primary;
    transition: all $transition-normal;
  }
}

@keyframes pulseLogo {
  0% {
    opacity: 0.6;
    box-shadow: 0 0 15px rgba($primary, 0.6);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 25px rgba($primary, 1);
  }
  100% {
    opacity: 0.6;
    box-shadow: 0 0 15px rgba($primary, 0.6);
  }
}

@keyframes pulse {
  0% {
    opacity: 0.6;
    box-shadow: 0 0 10px rgba($primary, 0.6);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 20px rgba($primary, 1);
  }
  100% {
    opacity: 0.6;
    box-shadow: 0 0 10px rgba($primary, 0.6);
  }
}

@keyframes glowLine {
  0% {
    opacity: 0.5;
    box-shadow: 0 0 5px rgba($primary, 0.5);
  }
  100% {
    opacity: 1;
    box-shadow: 0 0 10px rgba($primary, 0.8);
  }
}

@keyframes sweep {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: $breakpoint-lg) {
  .nav-container {
    justify-content: space-between;
  }
  
  .nav-logo {
    min-width: auto;
    margin-right: 0;
  }
  
  .menu-toggle {
    display: flex;
  }
  
  .nav-links-container {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: 0;
    background: rgba($background, 0.95);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    overflow: hidden;
    transition: height $transition-normal;
    z-index: 1;
  }
  
  .nav-expanded {
    .nav-links-container {
      height: calc(100vh - 70px);
      border-bottom: 1px solid rgba($primary, 0.2);
    }
    
    .menu-toggle {
      .menu-line {
        &:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }
      }
    }
  }
  
  .nav-links {
    flex-direction: column;
    align-items: center;
    padding: $spacing-xl;
    width: 100%;
    
    .nav-link {
      width: 100%;
      flex-direction: row;
      justify-content: flex-start;
      padding: $spacing-md;
      
      .link-text {
        margin-top: 0;
        margin-left: $spacing-md;
        font-size: $font-size-md;
      }
    }
  }
  
  .search-bar {
    display: none;
  }
}

@media (max-width: $breakpoint-md) {
  .nav-container {
    padding: 0 $spacing-sm;
  }
  
  .nav-logo {
    min-width: auto;
  }
  
  .user-avatar-container {
    .user-name {
      display: none;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .nav-logo {
    min-width: auto;
    
    .logo-avatar {
      width: 28px;
      height: 28px;
    }
  }
  
  .nav-container {
    padding: 0 $spacing-sm;
  }
  
  .logo-text {
    display: none;
  }
}
</style> 