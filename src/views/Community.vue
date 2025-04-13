<template>
  <div class="community">
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <h1 class="text-h4 mb-6">Сообщество Avatar.AI</h1>
          
          <!-- Лента активности -->
          <v-card class="mb-6">
            <v-card-title>
              Лента активности
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-card-title>
            
            <v-card-text>
              <v-list>
                <v-list-item v-for="post in posts" :key="post.id">
                  <template v-slot:prepend>
                    <v-avatar size="40">
                      <v-img :src="post.avatar" />
                    </v-avatar>
                  </template>
                  
                  <v-list-item-content>
                    <v-list-item-title>{{ post.author }}</v-list-item-title>
                    <v-list-item-subtitle>{{ post.content }}</v-list-item-subtitle>
                    <v-list-item-subtitle class="text-caption">
                      {{ post.time }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <template v-slot:append>
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-comment</v-icon>
                    </v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <!-- Популярные группы -->
          <v-card class="mb-6">
            <v-card-title>Популярные группы</v-card-title>
            <v-list>
              <v-list-item v-for="group in popularGroups" :key="group.id">
                <template v-slot:prepend>
                  <v-avatar size="32" :color="group.color">
                    <v-icon dark>{{ group.icon }}</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title>{{ group.name }}</v-list-item-title>
                <template v-slot:append>
                  <v-btn
                    variant="text"
                    color="primary"
                    size="small"
                  >
                    Присоединиться
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card>

          <!-- Предстоящие события -->
          <v-card>
            <v-card-title>Предстоящие события</v-card-title>
            <v-list>
              <v-list-item v-for="event in upcomingEvents" :key="event.id">
                <v-list-item-title>{{ event.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  <v-icon small>mdi-calendar</v-icon>
                  {{ event.date }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const posts = ref([
  {
    id: 1,
    author: 'Креативный Аватар',
    avatar: 'https://via.placeholder.com/40',
    content: 'Только что закончил создавать новую виртуальную галерею! Приходите посмотреть!',
    time: '5 минут назад'
  },
  {
    id: 2,
    author: 'Технологический Гуру',
    avatar: 'https://via.placeholder.com/40',
    content: 'Делюсь опытом использования новых AI-функций для развития личности аватара',
    time: '15 минут назад'
  },
  {
    id: 3,
    author: 'Исследователь Метавселенной',
    avatar: 'https://via.placeholder.com/40',
    content: 'Открыл новое измерение в метавселенной! Кто хочет исследовать его вместе?',
    time: '1 час назад'
  }
])

const popularGroups = ref([
  {
    id: 1,
    name: 'AI Энтузиасты',
    icon: 'mdi-robot',
    color: 'primary'
  },
  {
    id: 2,
    name: 'Креативный клуб',
    icon: 'mdi-palette',
    color: 'secondary'
  },
  {
    id: 3,
    name: 'Метавселенная',
    icon: 'mdi-virtual-reality',
    color: 'success'
  }
])

const upcomingEvents = ref([
  {
    id: 1,
    title: 'Виртуальный концерт',
    date: 'Завтра, 20:00'
  },
  {
    id: 2,
    title: 'Мастер-класс по AI',
    date: 'Послезавтра, 18:30'
  },
  {
    id: 3,
    title: 'Встреча сообщества',
    date: 'Через 3 дня, 19:00'
  }
])
</script>

<style lang="scss" scoped>
.community {
  padding: $spacing-medium;
}

.v-list-item {
  margin-bottom: $spacing-small;
}
</style> 