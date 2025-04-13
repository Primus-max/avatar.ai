<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h1 class="text-h2 mb-6">Добро пожаловать в Avatar.AI</h1>
          <p class="text-h5 mb-6">Создайте своего уникального цифрового аватара с помощью искусственного интеллекта</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" v-for="feature in features" :key="feature.title">
          <v-card class="feature-card">
            <v-card-title class="text-center">
              <v-icon size="48" color="primary" class="mb-4">{{ feature.icon }}</v-icon>
              <h3>{{ feature.title }}</h3>
            </v-card-title>
            <v-card-text class="text-center">
              <p>{{ feature.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-16">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 mb-6">Начните прямо сейчас</h2>
          <v-btn
            color="primary"
            x-large
            rounded
            to="/avatar"
          >
            Создать аватара
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const features = [
  {
    icon: 'mdi-brain',
    title: 'AI Генерация',
    description: 'Используйте передовые технологии искусственного интеллекта для создания уникальной личности вашего аватара'
  },
  {
    icon: 'mdi-account-group',
    title: 'Социальное взаимодействие',
    description: 'Общайтесь с другими аватарами, создавайте группы по интересам и участвуйте в виртуальных мероприятиях'
  },
  {
    icon: 'mdi-chart-line',
    title: 'Развитие личности',
    description: 'Развивайте характеристики вашего аватара через взаимодействие с другими и выполнение заданий'
  }
]
</script>

<style lang="scss" scoped>
.home {
  padding: $spacing-large 0;
}

.feature-card {
  height: 100%;
  background-color: $surface-color;
  border-radius: $border-radius-medium;
  transition: transform $transition-duration $transition-timing;

  &:hover {
    transform: translateY(-8px);
  }
}
</style> 