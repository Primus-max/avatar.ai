<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
      :title="userName"
      nav
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.title"
        :to="item.to"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          block
          color="primary"
          prepend-icon="mdi-plus"
        >
          Создать пост
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(true)
const rail = ref(false)
const userName = ref('Иван Иванов')

const menuItems = [
  { title: 'Лента', icon: 'mdi-home', to: '/' },
  { title: 'Сообщения', icon: 'mdi-message', to: '/messages' },
  { title: 'Уведомления', icon: 'mdi-bell', to: '/notifications' },
  { title: 'Сообщества', icon: 'mdi-account-group', to: '/communities' },
  { title: 'События', icon: 'mdi-calendar', to: '/events' },
  { title: 'Закладки', icon: 'mdi-bookmark', to: '/bookmarks' },
  { title: 'Настройки', icon: 'mdi-cog', to: '/settings' }
]
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.v-navigation-drawer {
  background-color: $surface;
  border-right: 1px solid $border;
}
</style> 