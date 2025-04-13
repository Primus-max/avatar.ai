<template>
  <div class="settings">
    <v-container>
      <h1 class="text-h4 mb-6">Настройки</h1>

      <v-row>
        <v-col cols="12" md="8">
          <!-- Основные настройки -->
          <v-card class="mb-6">
            <v-card-title>Основные настройки</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="settings.email"
                  label="Email"
                  type="email"
                  outlined
                />
                <v-text-field
                  v-model="settings.username"
                  label="Имя пользователя"
                  outlined
                />
                <v-select
                  v-model="settings.language"
                  :items="languages"
                  label="Язык интерфейса"
                  outlined
                />
                <v-select
                  v-model="settings.theme"
                  :items="themes"
                  label="Тема оформления"
                  outlined
                />
              </v-form>
            </v-card-text>
          </v-card>

          <!-- Настройки приватности -->
          <v-card class="mb-6">
            <v-card-title>Настройки приватности</v-card-title>
            <v-card-text>
              <v-switch
                v-model="privacy.showProfile"
                label="Показывать профиль всем пользователям"
              />
              <v-switch
                v-model="privacy.showActivity"
                label="Показывать мою активность"
              />
              <v-switch
                v-model="privacy.allowMessages"
                label="Принимать сообщения от всех пользователей"
              />
            </v-card-text>
          </v-card>

          <!-- Настройки уведомлений -->
          <v-card>
            <v-card-title>Настройки уведомлений</v-card-title>
            <v-card-text>
              <v-switch
                v-model="notifications.email"
                label="Email уведомления"
              />
              <v-switch
                v-model="notifications.push"
                label="Push уведомления"
              />
              <v-switch
                v-model="notifications.events"
                label="Уведомления о событиях"
              />
              <v-switch
                v-model="notifications.messages"
                label="Уведомления о сообщениях"
              />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <!-- Информация о профиле -->
          <v-card class="mb-6">
            <v-card-title>Информация о профиле</v-card-title>
            <v-card-text class="text-center">
              <v-avatar size="150" class="mb-4">
                <v-img src="https://via.placeholder.com/150" />
              </v-avatar>
              <v-btn
                block
                color="primary"
                class="mb-2"
              >
                Изменить аватар
              </v-btn>
              <v-btn
                block
                variant="outlined"
                color="error"
              >
                Удалить аккаунт
              </v-btn>
            </v-card-text>
          </v-card>

          <!-- Статистика -->
          <v-card>
            <v-card-title>Статистика</v-card-title>
            <v-list>
              <v-list-item>
                <v-list-item-title>Дата регистрации</v-list-item-title>
                <v-list-item-subtitle>01.01.2024</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Количество аватаров</v-list-item-title>
                <v-list-item-subtitle>3</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Активность</v-list-item-title>
                <v-list-item-subtitle>Высокая</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-6">
        <v-col cols="12" class="text-right">
          <v-btn
            color="primary"
            class="mr-4"
            @click="saveSettings"
          >
            Сохранить изменения
          </v-btn>
          <v-btn
            variant="outlined"
            @click="resetSettings"
          >
            Сбросить
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const settings = ref({
  email: 'user@example.com',
  username: 'User123',
  language: 'Русский',
  theme: 'Тёмная'
})

const languages = ['Русский', 'English', 'Español', 'Deutsch']
const themes = ['Тёмная', 'Светлая', 'Системная']

const privacy = ref({
  showProfile: true,
  showActivity: true,
  allowMessages: true
})

const notifications = ref({
  email: true,
  push: true,
  events: true,
  messages: true
})

const saveSettings = () => {
  // Здесь будет логика сохранения настроек
  console.log('Сохранение настроек...')
}

const resetSettings = () => {
  // Здесь будет логика сброса настроек
  console.log('Сброс настроек...')
}
</script>

<style lang="scss" scoped>
.settings {
  padding: $spacing-medium;
}

.v-card {
  background-color: $surface-color;
  border-radius: $border-radius-medium;
}

.v-btn {
  text-transform: none;
}
</style> 