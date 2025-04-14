<template>
  <div class="settings">
    <div class="settings-header">
      <div class="header-content">
        <h1>Настройки</h1>
        <p class="subtitle">Управление вашим профилем и настройками</p>
      </div>
    </div>

    <div class="settings-content">
      <div class="settings-sidebar">
        <div class="profile-card">
          <div class="avatar-container">
            <div class="avatar-wrapper">
              <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&s=150&f=y" alt="Profile" class="profile-avatar">
              <div class="avatar-overlay">
                <v-icon>mdi-camera</v-icon>
              </div>
            </div>
          </div>
          <div class="profile-info">
            <h2>{{ settings.username }}</h2>
            <p class="email">{{ settings.email }}</p>
            <div class="stats">
              <div class="stat-item">
                <span class="stat-value">3</span>
                <span class="stat-label">Аватара</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">128</span>
                <span class="stat-label">Друзей</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">1.2k</span>
                <span class="stat-label">Подписчиков</span>
              </div>
            </div>
          </div>
        </div>

        <div class="settings-menu">
          <div 
            v-for="(section, index) in menuSections" 
            :key="index"
            class="menu-item"
            :class="{ active: activeSection === section.id }"
            @click="activeSection = section.id"
          >
            <v-icon>{{ section.icon }}</v-icon>
            <span>{{ section.title }}</span>
          </div>
        </div>
      </div>

      <div class="settings-main">
        <!-- Основные настройки -->
        <div v-if="activeSection === 'general'" class="settings-section">
          <h2>Основные настройки</h2>
          <div class="settings-grid">
            <div class="setting-item">
              <label>Имя пользователя</label>
              <v-text-field
                v-model="settings.username"
                variant="outlined"
                density="compact"
                hide-details
              />
            </div>
            <div class="setting-item">
              <label>Email</label>
              <v-text-field
                v-model="settings.email"
                type="email"
                variant="outlined"
                density="compact"
                hide-details
              />
            </div>
            <div class="setting-item">
              <label>Язык интерфейса</label>
              <v-select
                v-model="settings.language"
                :items="languages"
                variant="outlined"
                density="compact"
                hide-details
              />
            </div>
            <div class="setting-item">
              <label>Тема оформления</label>
              <v-select
                v-model="settings.theme"
                :items="themes"
                variant="outlined"
                density="compact"
                hide-details
              />
            </div>
          </div>
        </div>

        <!-- Настройки приватности -->
        <div v-if="activeSection === 'privacy'" class="settings-section">
          <h2>Настройки приватности</h2>
          <div class="privacy-settings">
            <div class="privacy-item">
              <div class="privacy-info">
                <h3>Видимость профиля</h3>
                <p>Кто может просматривать ваш профиль</p>
              </div>
              <v-switch
                v-model="privacy.showProfile"
                color="primary"
                hide-details
              />
            </div>
            <div class="privacy-item">
              <div class="privacy-info">
                <h3>Активность</h3>
                <p>Показывать вашу активность другим пользователям</p>
              </div>
              <v-switch
                v-model="privacy.showActivity"
                color="primary"
                hide-details
              />
            </div>
            <div class="privacy-item">
              <div class="privacy-info">
                <h3>Сообщения</h3>
                <p>Разрешить получение сообщений от всех пользователей</p>
              </div>
              <v-switch
                v-model="privacy.allowMessages"
                color="primary"
                hide-details
              />
            </div>
          </div>
        </div>

        <!-- Настройки уведомлений -->
        <div v-if="activeSection === 'notifications'" class="settings-section">
          <h2>Настройки уведомлений</h2>
          <div class="notification-settings">
            <div class="notification-item">
              <div class="notification-info">
                <h3>Email уведомления</h3>
                <p>Получать уведомления на email</p>
              </div>
              <v-switch
                v-model="notifications.email"
                color="primary"
                hide-details
              />
            </div>
            <div class="notification-item">
              <div class="notification-info">
                <h3>Push уведомления</h3>
                <p>Получать push-уведомления в браузере</p>
              </div>
              <v-switch
                v-model="notifications.push"
                color="primary"
                hide-details
              />
            </div>
            <div class="notification-item">
              <div class="notification-info">
                <h3>Уведомления о событиях</h3>
                <p>Получать уведомления о новых событиях</p>
              </div>
              <v-switch
                v-model="notifications.events"
                color="primary"
                hide-details
              />
            </div>
            <div class="notification-item">
              <div class="notification-info">
                <h3>Уведомления о сообщениях</h3>
                <p>Получать уведомления о новых сообщениях</p>
              </div>
              <v-switch
                v-model="notifications.messages"
                color="primary"
                hide-details
              />
            </div>
          </div>
        </div>

        <!-- Опасная зона -->
        <div v-if="activeSection === 'danger'" class="settings-section">
          <h2>Опасная зона</h2>
          <div class="danger-zone">
            <div class="danger-item">
              <div class="danger-info">
                <h3>Удаление аккаунта</h3>
                <p>После удаления аккаунта все ваши данные будут безвозвратно удалены</p>
              </div>
              <v-btn
                color="error"
                variant="outlined"
                @click="deleteAccount"
              >
                Удалить аккаунт
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeSection = ref('general');

const menuSections = [
  { id: 'general', title: 'Основные', icon: 'mdi-cog' },
  { id: 'privacy', title: 'Приватность', icon: 'mdi-shield-lock' },
  { id: 'notifications', title: 'Уведомления', icon: 'mdi-bell' },
  { id: 'danger', title: 'Опасная зона', icon: 'mdi-alert' }
];

const settings = ref({
  email: 'user@example.com',
  username: 'User123',
  language: 'Русский',
  theme: 'Тёмная'
});

const languages = ['Русский', 'English', 'Español', 'Deutsch'];
const themes = ['Тёмная', 'Светлая', 'Системная'];

const privacy = ref({
  showProfile: true,
  showActivity: true,
  allowMessages: true
});

const notifications = ref({
  email: true,
  push: true,
  events: true,
  messages: true
});

const deleteAccount = () => {
  // Логика удаления аккаунта
  console.log('Удаление аккаунта...');
};
</script>

<style lang="scss" scoped>
.settings {
  min-height: 100vh;
  background: $background;
  color: $text-primary;
}

.settings-header {
  background: linear-gradient(135deg, $primary, $accent);
  padding: $spacing-xl;
  color: white;
  margin-bottom: $spacing-lg;

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: $spacing-sm;
  }

  .subtitle {
    opacity: 0.8;
    font-size: 1.1rem;
  }
}

.settings-content {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: $spacing-lg;
  padding: 0 $spacing-lg;
}

.settings-sidebar {
  width: 300px;
  flex-shrink: 0;
}

.profile-card {
  background-color: $surface;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  box-shadow: $shadow-md;

  .avatar-container {
    display: flex;
    justify-content: center;
    margin-bottom: $spacing-md;
  }

  .avatar-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;

    &:hover .avatar-overlay {
      opacity: 1;
    }
  }

  .profile-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity $transition-normal;
  }

  .profile-info {
    text-align: center;

    h2 {
      font-size: 1.5rem;
      margin-bottom: $spacing-xs;
    }

    .email {
      color: $text-secondary;
      margin-bottom: $spacing-md;
    }
  }

  .stats {
    display: flex;
    justify-content: space-around;
    margin-top: $spacing-md;

    .stat-item {
      text-align: center;

      .stat-value {
        display: block;
        font-size: 1.2rem;
        font-weight: 500;
        color: $primary;
      }

      .stat-label {
        font-size: 0.9rem;
        color: $text-secondary;
      }
    }
  }
}

.settings-menu {
  background-color: $surface;
  border-radius: $border-radius-lg;
  padding: $spacing-sm;
  box-shadow: $shadow-md;

  .menu-item {
    display: flex;
    align-items: center;
    padding: $spacing-md;
    cursor: pointer;
    border-radius: $border-radius-md;
    transition: background-color $transition-normal;
    margin-bottom: $spacing-xs;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background-color: $hover-color;
    }

    &.active {
      background-color: rgba($primary, 0.1);
      color: $primary;
    }

    .v-icon {
      margin-right: $spacing-sm;
    }
  }
}

.settings-main {
  flex-grow: 1;
  background-color: $surface;
  border-radius: $border-radius-lg;
  padding: $spacing-xl;
  box-shadow: $shadow-md;
}

.settings-section {
  h2 {
    font-size: 1.8rem;
    margin-bottom: $spacing-lg;
  }
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-lg;
}

.setting-item {
  label {
    display: block;
    margin-bottom: $spacing-xs;
    color: $text-secondary;
  }
}

.privacy-settings,
.notification-settings {
  .privacy-item,
  .notification-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-md;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }

    .privacy-info,
    .notification-info {
      h3 {
        font-size: 1.1rem;
        margin-bottom: $spacing-xs;
      }

      p {
        color: $text-secondary;
        font-size: 0.9rem;
      }
    }
  }
}

.danger-zone {
  .danger-item {
    background-color: rgba($error, 0.1);
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    margin-top: $spacing-lg;

    .danger-info {
      margin-bottom: $spacing-md;

      h3 {
        color: $error;
        margin-bottom: $spacing-xs;
      }

      p {
        color: $text-secondary;
      }
    }
  }
}

@media (max-width: $breakpoint-md) {
  .settings-content {
    flex-direction: column;
    padding: $spacing-md;
  }

  .settings-sidebar {
    width: 100%;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style> 