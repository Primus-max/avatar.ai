<template>
  <v-card class="friends-list">
    <v-card-title>
      <div class="d-flex align-center">
        <span>Друзья</span>
        <v-spacer />
        <v-btn
          variant="text"
          prepend-icon="mdi-magnify"
        >
          Поиск
        </v-btn>
      </div>
    </v-card-title>

    <v-card-text>
      <!-- Фильтры -->
      <div class="filters mb-4">
        <v-chip
          v-for="filter in filters"
          :key="filter.value"
          :color="activeFilter === filter.value ? 'primary' : undefined"
          variant="outlined"
          class="mr-2"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </v-chip>
      </div>

      <!-- Список друзей -->
      <div class="friends-grid">
        <div
          v-for="friend in filteredFriends"
          :key="friend.id"
          class="friend-card"
        >
          <v-avatar size="64" class="mb-2">
            <v-img :src="friend.avatar" />
          </v-avatar>
          <div class="text-subtitle-2 text-center">{{ friend.name }}</div>
          <div class="text-caption text-medium-emphasis text-center">
            {{ friend.status }}
          </div>
          <div class="friend-actions mt-2">
            <v-btn
              variant="text"
              icon="mdi-message"
              size="small"
              @click="messageFriend(friend)"
            ></v-btn>
            <v-btn
              variant="text"
              icon="mdi-account-remove"
              size="small"
              @click="removeFriend(friend)"
            ></v-btn>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue';

const activeFilter = ref('all')

const filters = [
  { label: 'Все', value: 'all' },
  { label: 'Онлайн', value: 'online' },
  { label: 'Недавние', value: 'recent' }
]

const friends = ref([
  {
    id: 1,
    name: 'Алексей Петров',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'Онлайн',
    lastSeen: 'Только что'
  },
  {
    id: 2,
    name: 'Мария Иванова',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'Был(а) 5 минут назад',
    lastSeen: '5 минут назад'
  },
  {
    id: 3,
    name: 'Дмитрий Сидоров',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    status: 'Онлайн',
    lastSeen: 'Только что'
  },
  {
    id: 4,
    name: 'Елена Смирнова',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    status: 'Был(а) 1 час назад',
    lastSeen: '1 час назад'
  },
  {
    id: 5,
    name: 'Иван Козлов',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    status: 'Онлайн',
    lastSeen: 'Только что'
  }
])

const filteredFriends = computed(() => {
  if (activeFilter.value === 'all') return friends.value
  if (activeFilter.value === 'online') {
    return friends.value.filter(friend => friend.status === 'Онлайн')
  }
  if (activeFilter.value === 'recent') {
    return friends.value.filter(friend => friend.lastSeen.includes('минут') || friend.lastSeen === 'Только что')
  }
  return friends.value
})

const messageFriend = (friend) => {
  // Логика отправки сообщения
}

const removeFriend = (friend) => {
  // Логика удаления из друзей
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.friends-list {
  background-color: $surface;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-sm;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: $spacing-md;
}

.friend-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-md;
  background-color: $background;
  border-radius: $border-radius-md;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
}

.friend-actions {
  display: flex;
  gap: $spacing-sm;
  opacity: 0;
  transition: opacity 0.2s;

  .friend-card:hover & {
    opacity: 1;
  }
}
</style> 