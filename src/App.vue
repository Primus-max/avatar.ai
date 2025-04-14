<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Avatar.AI</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false)
const menuItems = [
  {
    icon: 'mdi-home',
    title: 'Главная',
    to: '/'
  },
  {
    icon: 'mdi-account',
    title: 'Мой аватар',
    to: '/avatar'
  },
  {
    icon: 'mdi-account-group',
    title: 'Сообщество',
    to: '/community'
  },
  {
    icon: 'mdi-cog',
    title: 'Настройки',
    to: '/settings'
  }
]
</script>

<style lang="scss">
@import './styles/variables.scss';

#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  background-color: $background-color;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.v-application {
  background-color: $background-color;
}
</style> 