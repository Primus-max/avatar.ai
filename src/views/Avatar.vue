<template>
  <div class="avatar-page">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="avatar-card">
          <v-card-title>Мой аватар</v-card-title>
          <v-card-text>
            <v-avatar size="200" class="mb-4">
              <v-img :src="avatarImage" />
            </v-avatar>
            <v-text-field
              v-model="avatarName"
              label="Имя аватара"
              outlined
            />
            <v-select
              v-model="avatarPersonality"
              :items="personalityTypes"
              label="Тип личности"
              outlined
            />
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="8">
        <v-card class="stats-card">
          <v-card-title>Характеристики</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" v-for="(stat, index) in avatarStats" :key="index">
                <v-progress-linear
                  :model-value="stat.value"
                  :color="stat.color"
                  height="25"
                >
                  <template v-slot:default="{ value }">
                    <strong>{{ stat.name }}: {{ Math.ceil(value) }}%</strong>
                  </template>
                </v-progress-linear>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>AI Настройки</v-card-title>
          <v-card-text>
            <v-slider
              v-model="aiCreativity"
              label="Креативность"
              min="0"
              max="100"
              thumb-label
            />
            <v-slider
              v-model="aiEmotionality"
              label="Эмоциональность"
              min="0"
              max="100"
              thumb-label
            />
            <v-slider
              v-model="aiSociality"
              label="Общительность"
              min="0"
              max="100"
              thumb-label
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const avatarImage = ref('https://via.placeholder.com/200')
const avatarName = ref('Мой Аватар')
const avatarPersonality = ref('Сбалансированная')
const personalityTypes = [
  'Сбалансированная',
  'Креативная',
  'Аналитическая',
  'Эмоциональная',
  'Социальная'
]

const avatarStats = ref([
  { name: 'Интеллект', value: 75, color: 'primary' },
  { name: 'Креативность', value: 60, color: 'secondary' },
  { name: 'Эмоциональность', value: 45, color: 'error' },
  { name: 'Социальность', value: 80, color: 'success' }
])

const aiCreativity = ref(50)
const aiEmotionality = ref(50)
const aiSociality = ref(50)
</script>

<style lang="scss" scoped>
.avatar-page {
  padding: $spacing-medium;
}

.avatar-card,
.stats-card {
  background-color: $surface-color;
  border-radius: $border-radius-medium;
}
</style> 