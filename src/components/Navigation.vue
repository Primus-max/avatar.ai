<template>
  <nav class="navigation">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <img src="@/assets/logo.svg" alt="Avatar.AI" class="logo-image">
        <span class="logo-text">Avatar.AI</span>
      </router-link>

      <div class="nav-links">
        <router-link 
          v-for="link in navigationLinks" 
          :key="link.path"
          :to="link.path"
          class="nav-link"
          :class="{ active: isCurrentRoute(link.path) }"
        >
          <v-icon :icon="link.icon" class="link-icon" />
          <span class="link-text">{{ link.title }}</span>
          <div class="link-indicator" />
        </router-link>
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
        </div>

        <div class="user-menu" @click="toggleUserMenu" ref="userMenuTrigger">
          <div class="user-avatar">
            <img :src="currentUser.avatar" :alt="currentUser.name">
            <div class="user-status" :class="currentUser.status" />
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
              <img :src="currentUser.avatar" :alt="currentUser.name" class="menu-avatar">
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
                <v-icon :icon="action.icon" />
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

const navigationLinks = [
  { 
    title: 'Главная',
    path: '/',
    icon: 'mdi-home'
  },
  { 
    title: 'Мой аватар',
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
  role: 'Разработчик',
  avatar: 'https://via.placeholder.com/40',
  status: 'online'
};

const userMenuActions = [
  {
    id: 'profile',
    title: 'Профиль',
    icon: 'mdi-account-circle',
    handler: () => router.push('/profile')
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
  height: $nav-height;
  background: $nav-background;
  backdrop-filter: $nav-backdrop-filter;
  -webkit-backdrop-filter: $nav-backdrop-filter;
  border-bottom: $glass-border;
  z-index: $z-index-fixed;
}

.nav-container {
  max-width: $container-max-width;
  height: 100%;
  margin: 0 auto;
  padding: 0 $container-padding;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-xl;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  text-decoration: none;
  color: $text-primary;

  .logo-image {
    height: 32px;
    width: auto;
  }

  .logo-text {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    background: $gradient-primary;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.nav-links {
  display: flex;
  gap: $spacing-md;
  
  .nav-link {
    position: relative;
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-sm $spacing-md;
    color: $text-secondary;
    text-decoration: none;
    border-radius: $border-radius-full;
    transition: all $transition-normal;

    .link-icon {
      font-size: 20px;
    }

    .link-text {
      font-weight: $font-weight-medium;
    }

    .link-indicator {
      position: absolute;
      bottom: -$spacing-xs;
      left: 50%;
      transform: translateX(-50%) scaleX(0);
      height: 2px;
      width: 20px;
      background: $gradient-primary;
      border-radius: $border-radius-full;
      transition: transform $transition-normal;
    }

    &:hover {
      color: $text-primary;
      background: $glass-background;
    }

    &.active {
      color: $primary;

      .link-indicator {
        transform: translateX(-50%) scaleX(1);
      }
    }
  }
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
}

.search-bar {
  position: relative;
  width: 240px;

  .search-icon {
    position: absolute;
    left: $spacing-md;
    top: 50%;
    transform: translateY(-50%);
    color: $text-secondary;
    pointer-events: none;
  }

  input {
    width: 100%;
    height: $input-height;
    padding: 0 $spacing-md 0 ($spacing-md * 2 + 24px);
    background: $glass-background;
    border: $glass-border;
    border-radius: $border-radius-full;
    color: $text-primary;
    font-size: $font-size-sm;
    transition: all $transition-normal;

    &::placeholder {
      color: $text-secondary;
    }

    &:focus {
      background: rgba($surface-light, 0.5);
      border-color: rgba($primary, 0.5);
      outline: none;
    }
  }
}

.user-menu {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  background: $glass-background;
  border: $glass-border;
  border-radius: $border-radius-full;
  cursor: pointer;
  transition: all $transition-normal;

  &:hover {
    background: rgba($surface-light, 0.2);
  }

  .user-avatar {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid $surface;

      &.online {
        background: $success;
      }

      &.away {
        background: $warning;
      }

      &.offline {
        background: $text-disabled;
      }
    }
  }

  .user-name {
    font-weight: $font-weight-medium;
    color: $text-primary;
  }

  .mdi-chevron-down {
    color: $text-secondary;
    transition: transform $transition-normal;

    &.menu-open {
      transform: rotate(180deg);
    }
  }
}

.menu-content {
  background: $surface;
  border-radius: $border-radius-lg;
  overflow: hidden;
  min-width: 240px;

  .menu-header {
    padding: $spacing-lg;
    background: $gradient-surface;
    display: flex;
    align-items: center;
    gap: $spacing-md;

    .menu-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }

    .menu-user-info {
      display: flex;
      flex-direction: column;

      .menu-user-name {
        font-weight: $font-weight-semibold;
        color: $text-primary;
      }

      .menu-user-role {
        font-size: $font-size-sm;
        color: $text-secondary;
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

      &:hover {
        background: $glass-background;
      }

      .v-icon {
        color: $text-secondary;
      }
    }
  }

  .menu-footer {
    padding: $spacing-md;
    border-top: $glass-border;

    .logout-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-sm;
      padding: $spacing-sm;
      background: rgba($error, 0.1);
      border: none;
      border-radius: $border-radius-md;
      color: $error;
      font-weight: $font-weight-medium;
      cursor: pointer;
      transition: all $transition-fast;

      &:hover {
        background: rgba($error, 0.2);
      }
    }
  }
}

@media (max-width: $breakpoint-lg) {
  .nav-links {
    .link-text {
      display: none;
    }
  }

  .search-bar {
    width: 200px;
  }

  .user-menu {
    .user-name {
      display: none;
    }
  }
}

@media (max-width: $breakpoint-md) {
  .search-bar {
    display: none;
  }
}

@media (max-width: $breakpoint-sm) {
  .nav-container {
    padding: 0 $spacing-sm;
  }

  .logo-text {
    display: none;
  }
}
</style> 