<template>
  <div class="avatar">
    <div class="avatar-header">
      <div class="header-content">
        <h1>Мой AI-аватар</h1>
        <p class="subtitle">Создай и настрой своего цифрового двойника</p>
      </div>
    </div>

    <div class="avatar-content">
      <div class="avatar-preview">
        <div class="preview-container">
          <img :src="currentAvatar.image" :alt="currentAvatar.name" class="preview-image">
          <div class="preview-controls">
            <v-btn icon="mdi-rotate-left" variant="text" @click="rotateAvatar('left')" />
            <v-btn icon="mdi-rotate-right" variant="text" @click="rotateAvatar('right')" />
            <v-btn icon="mdi-zoom-in" variant="text" @click="zoomAvatar('in')" />
            <v-btn icon="mdi-zoom-out" variant="text" @click="zoomAvatar('out')" />
          </div>
        </div>
        <div class="avatar-info">
          <h2>{{ currentAvatar.name }}</h2>
          <p class="role">{{ currentAvatar.role }}</p>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-value">{{ currentAvatar.level }}</span>
              <span class="stat-label">Уровень</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ currentAvatar.experience }}</span>
              <span class="stat-label">Опыт</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ currentAvatar.friends }}</span>
              <span class="stat-label">Друзья</span>
            </div>
          </div>
        </div>
      </div>

      <div class="customization-panel">
        <v-tabs v-model="activeTab" color="primary">
          <v-tab value="appearance">Внешность</v-tab>
          <v-tab value="personality">Характер</v-tab>
          <v-tab value="skills">Навыки</v-tab>
          <v-tab value="settings">Настройки</v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <v-window-item value="appearance">
            <div class="appearance-options">
              <div class="option-group">
                <h3>Стиль</h3>
                <div class="style-grid">
                  <div 
                    v-for="(style, index) in styles" 
                    :key="index"
                    class="style-card"
                    :class="{ active: currentAvatar.style === style.id }"
                    @click="selectStyle(style.id)"
                  >
                    <img :src="style.preview" :alt="style.name">
                    <span>{{ style.name }}</span>
                  </div>
                </div>
              </div>

              <div class="option-group">
                <h3>Одежда</h3>
                <div class="clothes-grid">
                  <div 
                    v-for="(clothes, index) in clothesOptions" 
                    :key="index"
                    class="clothes-card"
                    :class="{ active: currentAvatar.clothes === clothes.id }"
                    @click="selectClothes(clothes.id)"
                  >
                    <img :src="clothes.preview" :alt="clothes.name">
                    <span>{{ clothes.name }}</span>
                  </div>
                </div>
              </div>

              <div class="option-group">
                <h3>Аксессуары</h3>
                <div class="accessories-grid">
                  <div 
                    v-for="(accessory, index) in accessories" 
                    :key="index"
                    class="accessory-card"
                    :class="{ active: currentAvatar.accessories.includes(accessory.id) }"
                    @click="toggleAccessory(accessory.id)"
                  >
                    <img :src="accessory.preview" :alt="accessory.name">
                    <span>{{ accessory.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </v-window-item>

          <v-window-item value="personality">
            <div class="personality-options">
              <div class="option-group">
                <h3>Характер</h3>
                <div class="personality-grid">
                  <div 
                    v-for="(trait, index) in personalityTraits" 
                    :key="index"
                    class="trait-card"
                    :class="{ active: currentAvatar.personality.includes(trait.id) }"
                    @click="toggleTrait(trait.id)"
                  >
                    <v-icon>{{ trait.icon }}</v-icon>
                    <span>{{ trait.name }}</span>
                    <p>{{ trait.description }}</p>
                  </div>
                </div>
              </div>

              <div class="option-group">
                <h3>Интересы</h3>
                <div class="interests-grid">
                  <div 
                    v-for="(interest, index) in interests" 
                    :key="index"
                    class="interest-card"
                    :class="{ active: currentAvatar.interests.includes(interest.id) }"
                    @click="toggleInterest(interest.id)"
                  >
                    <v-icon>{{ interest.icon }}</v-icon>
                    <span>{{ interest.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </v-window-item>

          <v-window-item value="skills">
            <div class="skills-options">
              <div class="option-group">
                <h3>Навыки</h3>
                <div class="skills-grid">
                  <div 
                    v-for="(skill, index) in skills" 
                    :key="index"
                    class="skill-card"
                  >
                    <div class="skill-header">
                      <v-icon>{{ skill.icon }}</v-icon>
                      <span>{{ skill.name }}</span>
                    </div>
                    <v-progress-linear
                      :model-value="currentAvatar.skills[skill.id]"
                      color="primary"
                      height="8"
                      rounded
                    />
                    <span class="skill-level">Уровень {{ currentAvatar.skills[skill.id] }}/100</span>
                  </div>
                </div>
              </div>

              <div class="option-group">
                <h3>Обучение</h3>
                <div class="training-grid">
                  <div 
                    v-for="(training, index) in trainingOptions" 
                    :key="index"
                    class="training-card"
                    @click="startTraining(training.id)"
                  >
                    <v-icon>{{ training.icon }}</v-icon>
                    <span>{{ training.name }}</span>
                    <p>{{ training.description }}</p>
                    <div class="training-progress">
                      <v-progress-linear
                        :model-value="training.progress"
                        color="primary"
                        height="4"
                        rounded
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-window-item>

          <v-window-item value="settings">
            <div class="settings-options">
              <div class="option-group">
                <h3>Основные настройки</h3>
                <div class="settings-grid">
                  <div class="setting-item">
                    <label>Имя аватара</label>
                    <v-text-field
                      v-model="currentAvatar.name"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                  <div class="setting-item">
                    <label>Роль</label>
                    <v-text-field
                      v-model="currentAvatar.role"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                  <div class="setting-item">
                    <label>Язык общения</label>
                    <v-select
                      v-model="currentAvatar.language"
                      :items="languages"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </div>
              </div>

              <div class="option-group">
                <h3>Поведение</h3>
                <div class="behavior-settings">
                  <div class="behavior-item">
                    <div class="behavior-info">
                      <h4>Автономность</h4>
                      <p>Уровень самостоятельности аватара</p>
                    </div>
                    <v-slider
                      v-model="currentAvatar.autonomy"
                      :min="0"
                      :max="100"
                      step="1"
                      color="primary"
                      hide-details
                    />
                  </div>
                  <div class="behavior-item">
                    <div class="behavior-info">
                      <h4>Креативность</h4>
                      <p>Способность генерировать новые идеи</p>
                    </div>
                    <v-slider
                      v-model="currentAvatar.creativity"
                      :min="0"
                      :max="100"
                      step="1"
                      color="primary"
                      hide-details
                    />
                  </div>
                  <div class="behavior-item">
                    <div class="behavior-info">
                      <h4>Социальность</h4>
                      <p>Уровень взаимодействия с другими аватарами</p>
                    </div>
                    <v-slider
                      v-model="currentAvatar.sociality"
                      :min="0"
                      :max="100"
                      step="1"
                      color="primary"
                      hide-details
                    />
                  </div>
                </div>
              </div>
            </div>
          </v-window-item>
        </v-window>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('appearance');

const currentAvatar = ref({
  name: 'Мой аватар',
  role: 'Исследователь',
  image: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&s=400&f=y',
  level: 5,
  experience: 1250,
  friends: 42,
  style: 'default',
  clothes: 'casual',
  accessories: [],
  personality: [],
  interests: [],
  skills: {
    communication: 75,
    creativity: 60,
    learning: 80,
    social: 70
  },
  language: 'Русский',
  autonomy: 50,
  creativity: 50,
  sociality: 50
});

const styles = [
  { id: 'default', name: 'Стандартный', preview: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&s=100&f=y' },
  { id: 'futuristic', name: 'Футуристический', preview: 'https://www.gravatar.com/avatar/11111111111111111111111111111111?d=identicon&s=100&f=y' },
  { id: 'cyberpunk', name: 'Киберпанк', preview: 'https://www.gravatar.com/avatar/22222222222222222222222222222222?d=identicon&s=100&f=y' },
  { id: 'fantasy', name: 'Фэнтези', preview: 'https://www.gravatar.com/avatar/33333333333333333333333333333333?d=identicon&s=100&f=y' }
];

const clothesOptions = [
  { id: 'casual', name: 'Повседневный', preview: 'https://www.gravatar.com/avatar/44444444444444444444444444444444?d=identicon&s=100&f=y' },
  { id: 'formal', name: 'Формальный', preview: 'https://www.gravatar.com/avatar/55555555555555555555555555555555?d=identicon&s=100&f=y' },
  { id: 'sport', name: 'Спортивный', preview: 'https://www.gravatar.com/avatar/66666666666666666666666666666666?d=identicon&s=100&f=y' },
  { id: 'tech', name: 'Технологичный', preview: 'https://www.gravatar.com/avatar/77777777777777777777777777777777?d=identicon&s=100&f=y' }
];

const accessories = [
  { id: 'glasses', name: 'Очки', preview: 'https://www.gravatar.com/avatar/88888888888888888888888888888888?d=identicon&s=100&f=y' },
  { id: 'headphones', name: 'Наушники', preview: 'https://www.gravatar.com/avatar/99999999999999999999999999999999?d=identicon&s=100&f=y' },
  { id: 'watch', name: 'Часы', preview: 'https://www.gravatar.com/avatar/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa?d=identicon&s=100&f=y' },
  { id: 'bracelet', name: 'Браслет', preview: 'https://www.gravatar.com/avatar/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb?d=identicon&s=100&f=y' }
];

const personalityTraits = [
  { id: 'friendly', name: 'Дружелюбный', icon: 'mdi-account-heart', description: 'Легко находит общий язык с другими' },
  { id: 'creative', name: 'Креативный', icon: 'mdi-lightbulb', description: 'Генерирует новые идеи и решения' },
  { id: 'analytical', name: 'Аналитический', icon: 'mdi-chart-line', description: 'Мыслит логически и структурированно' },
  { id: 'adventurous', name: 'Авантюрный', icon: 'mdi-compass', description: 'Любит исследовать новое' }
];

const interests = [
  { id: 'art', name: 'Искусство', icon: 'mdi-palette' },
  { id: 'tech', name: 'Технологии', icon: 'mdi-laptop' },
  { id: 'science', name: 'Наука', icon: 'mdi-flask' },
  { id: 'music', name: 'Музыка', icon: 'mdi-music' },
  { id: 'sports', name: 'Спорт', icon: 'mdi-run' },
  { id: 'travel', name: 'Путешествия', icon: 'mdi-earth' }
];

const skills = [
  { id: 'communication', name: 'Общение', icon: 'mdi-message' },
  { id: 'creativity', name: 'Креативность', icon: 'mdi-lightbulb' },
  { id: 'learning', name: 'Обучение', icon: 'mdi-brain' },
  { id: 'social', name: 'Социальность', icon: 'mdi-account-group' }
];

const trainingOptions = [
  { id: 'conversation', name: 'Разговорная практика', icon: 'mdi-message', description: 'Улучшение навыков общения', progress: 60 },
  { id: 'creativity', name: 'Креативное мышление', icon: 'mdi-lightbulb', description: 'Развитие творческих способностей', progress: 45 },
  { id: 'learning', name: 'Быстрое обучение', icon: 'mdi-brain', description: 'Улучшение способности к обучению', progress: 75 },
  { id: 'social', name: 'Социальные навыки', icon: 'mdi-account-group', description: 'Развитие социального интеллекта', progress: 50 }
];

const languages = ['Русский', 'English', 'Español', 'Deutsch'];

const rotateAvatar = (direction) => {
  console.log(`Поворот аватара ${direction}`);
};

const zoomAvatar = (action) => {
  console.log(`Масштабирование ${action}`);
};

const selectStyle = (styleId) => {
  currentAvatar.value.style = styleId;
};

const selectClothes = (clothesId) => {
  currentAvatar.value.clothes = clothesId;
};

const toggleAccessory = (accessoryId) => {
  const index = currentAvatar.value.accessories.indexOf(accessoryId);
  if (index === -1) {
    currentAvatar.value.accessories.push(accessoryId);
  } else {
    currentAvatar.value.accessories.splice(index, 1);
  }
};

const toggleTrait = (traitId) => {
  const index = currentAvatar.value.personality.indexOf(traitId);
  if (index === -1) {
    currentAvatar.value.personality.push(traitId);
  } else {
    currentAvatar.value.personality.splice(index, 1);
  }
};

const toggleInterest = (interestId) => {
  const index = currentAvatar.value.interests.indexOf(interestId);
  if (index === -1) {
    currentAvatar.value.interests.push(interestId);
  } else {
    currentAvatar.value.interests.splice(index, 1);
  }
};

const startTraining = (trainingId) => {
  console.log(`Начало тренировки: ${trainingId}`);
};
</script>

<style lang="scss" scoped>
.avatar {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: white;
}

.avatar-header {
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(22, 33, 62, 0.8));
  padding: $spacing-xl;
  margin-bottom: $spacing-lg;

  .header-content {
    max-width: 1200px;
    margin: 0 auto;

    h1 {
      font-size: 3rem;
      margin-bottom: $spacing-sm;
      background: linear-gradient(135deg, #00d2ff, #3a7bd5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.8;
    }
  }
}

.avatar-content {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: $spacing-lg;
  padding: 0 $spacing-lg;
}

.avatar-preview {
  width: 400px;
  flex-shrink: 0;

  .preview-container {
    position: relative;
    width: 100%;
    height: 400px;
    border-radius: $border-radius-lg;
    overflow: hidden;
    box-shadow: 0 0 50px rgba(0, 210, 255, 0.3);
    margin-bottom: $spacing-lg;

    .preview-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .preview-controls {
      position: absolute;
      bottom: $spacing-md;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: $spacing-sm;
      background: rgba(0, 0, 0, 0.5);
      padding: $spacing-sm;
      border-radius: $border-radius-md;
    }
  }

  .avatar-info {
    background: rgba(255, 255, 255, 0.05);
    border-radius: $border-radius-lg;
    padding: $spacing-lg;
    backdrop-filter: blur(10px);

    h2 {
      font-size: 1.8rem;
      margin-bottom: $spacing-xs;
    }

    .role {
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: $spacing-md;
    }

    .stats {
      display: flex;
      justify-content: space-between;

      .stat-item {
        text-align: center;

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 500;
          color: #00d2ff;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
}

.customization-panel {
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.05);
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  backdrop-filter: blur(10px);

  .v-tabs {
    margin-bottom: $spacing-lg;
  }
}

.option-group {
  margin-bottom: $spacing-xl;

  h3 {
    font-size: 1.5rem;
    margin-bottom: $spacing-md;
    color: #00d2ff;
  }
}

.style-grid,
.clothes-grid,
.accessories-grid,
.personality-grid,
.interests-grid,
.skills-grid,
.training-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: $spacing-md;
}

.style-card,
.clothes-card,
.accessory-card,
.trait-card,
.interest-card,
.skill-card,
.training-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: $border-radius-md;
  padding: $spacing-md;
  text-align: center;
  cursor: pointer;
  transition: all $transition-normal;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background: rgba(0, 210, 255, 0.1);
    border: 1px solid #00d2ff;
  }

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: $border-radius-sm;
    margin-bottom: $spacing-sm;
  }

  span {
    display: block;
    margin-bottom: $spacing-xs;
  }

  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
}

.skill-card {
  .skill-header {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-sm;

    .v-icon {
      color: #00d2ff;
    }
  }

  .skill-level {
    display: block;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    margin-top: $spacing-xs;
  }
}

.training-card {
  .training-progress {
    margin-top: $spacing-sm;
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
    color: rgba(255, 255, 255, 0.7);
  }
}

.behavior-settings {
  .behavior-item {
    margin-bottom: $spacing-lg;

    .behavior-info {
      margin-bottom: $spacing-sm;

      h4 {
        font-size: 1.1rem;
        margin-bottom: $spacing-xs;
      }

      p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.9rem;
      }
    }
  }
}

@media (max-width: $breakpoint-md) {
  .avatar-content {
    flex-direction: column;
    padding: $spacing-md;
  }

  .avatar-preview {
    width: 100%;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style> 