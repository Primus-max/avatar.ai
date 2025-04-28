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
          <AvatarModel
            :model-type="currentAvatar.style"
            :auto-rotate="false"
          />
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

      <div class="panel-container">
        <v-tabs v-model="activeTab" color="primary">
          <v-tab value="chat">Чат</v-tab>
          <v-tab value="appearance">Внешность</v-tab>
          <v-tab value="personality">Характер</v-tab>
          <v-tab value="skills">Навыки</v-tab>
          <v-tab value="settings">Настройки</v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <v-window-item value="chat">
            <AvatarChat
              :avatar-name="currentAvatar.name"
              :avatar-image="currentAvatar.iconImage"
              @message-sent="handleUserMessage"
              @avatar-response="handleAvatarResponse"
            />
          </v-window-item>

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
                </div>
              </div>

              <div class="option-group">
                <h3>Сохранение и восстановление</h3>
                <div class="backup-controls">
                  <v-btn
                    class="control-btn"
                    prepend-icon="mdi-content-save"
                    @click="saveAvatar"
                  >
                    Сохранить настройки
                  </v-btn>
                  <v-btn
                    class="control-btn"
                    prepend-icon="mdi-backup-restore"
                    @click="resetAvatar"
                  >
                    Сбросить настройки
                  </v-btn>
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
import {
  onMounted,
  ref,
} from 'vue';

import AvatarModel from '@/components/avatar/AvatarModel.vue';
import AvatarChat from '@/components/AvatarChat.vue';

const activeTab = ref('chat');

const currentAvatar = ref({
  name: 'Neo',
  role: 'Персональный ассистент',
  level: 5,
  experience: 2400,
  friends: 12,
  style: 'futuristic',
  clothes: 'casual',
  accessories: ['glasses'],
  personality: ['friendly', 'creative'],
  interests: ['tech', 'art'],
  language: 'Русский',
  autonomy: 70,
  creativity: 85,
  skills: {
    communication: 80,
    knowledge: 70,
    reasoning: 65,
    creativity: 75
  },
  iconImage: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y'
});

const styles = [
  { id: 'realistic', name: 'Реалистичный', preview: 'https://www.gravatar.com/avatar/11111111111111111111111111111111?d=identicon&f=y' },
  { id: 'anime', name: 'Аниме', preview: 'https://www.gravatar.com/avatar/22222222222222222222222222222222?d=identicon&f=y' },
  { id: 'cartoon', name: 'Мультяшный', preview: 'https://www.gravatar.com/avatar/33333333333333333333333333333333?d=identicon&f=y' },
  { id: 'futuristic', name: 'Футуристичный', preview: 'https://www.gravatar.com/avatar/44444444444444444444444444444444?d=identicon&f=y' }
];

const clothesOptions = [
  { id: 'casual', name: 'Повседневная', preview: 'https://www.gravatar.com/avatar/55555555555555555555555555555555?d=identicon&f=y' },
  { id: 'formal', name: 'Деловая', preview: 'https://www.gravatar.com/avatar/66666666666666666666666666666666?d=identicon&f=y' },
  { id: 'sporty', name: 'Спортивная', preview: 'https://www.gravatar.com/avatar/77777777777777777777777777777777?d=identicon&f=y' },
  { id: 'sci-fi', name: 'Sci-Fi', preview: 'https://www.gravatar.com/avatar/88888888888888888888888888888888?d=identicon&f=y' }
];

const accessories = [
  { id: 'glasses', name: 'Очки', preview: 'https://www.gravatar.com/avatar/99999999999999999999999999999999?d=identicon&f=y' },
  { id: 'hat', name: 'Шляпа', preview: 'https://www.gravatar.com/avatar/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa?d=identicon&f=y' },
  { id: 'jewelry', name: 'Украшения', preview: 'https://www.gravatar.com/avatar/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb?d=identicon&f=y' },
  { id: 'gadget', name: 'Гаджет', preview: 'https://www.gravatar.com/avatar/cccccccccccccccccccccccccccccccc?d=identicon&f=y' }
];

const personalityTraits = [
  { id: 'friendly', name: 'Дружелюбный', icon: 'mdi-emoticon', description: 'Общительный и располагающий к себе характер' },
  { id: 'analytical', name: 'Аналитический', icon: 'mdi-brain', description: 'Логический подход к решению задач' },
  { id: 'creative', name: 'Креативный', icon: 'mdi-lightbulb', description: 'Склонность к нестандартным решениям' },
  { id: 'humorous', name: 'С чувством юмора', icon: 'mdi-emoticon-cool', description: 'Любит шутить и поднимать настроение' },
  { id: 'calm', name: 'Спокойный', icon: 'mdi-meditation', description: 'Уравновешенный и невозмутимый' },
  { id: 'caring', name: 'Заботливый', icon: 'mdi-heart', description: 'Проявляет внимание к чувствам и благополучию' }
];

const interests = [
  { id: 'tech', name: 'Технологии', icon: 'mdi-laptop' },
  { id: 'art', name: 'Искусство', icon: 'mdi-palette' },
  { id: 'science', name: 'Наука', icon: 'mdi-atom' },
  { id: 'sports', name: 'Спорт', icon: 'mdi-basketball' },
  { id: 'music', name: 'Музыка', icon: 'mdi-music' },
  { id: 'travel', name: 'Путешествия', icon: 'mdi-airplane' },
  { id: 'books', name: 'Книги', icon: 'mdi-book-open-variant' },
  { id: 'cooking', name: 'Кулинария', icon: 'mdi-food' }
];

const skills = [
  { id: 'communication', name: 'Коммуникация', icon: 'mdi-message-text' },
  { id: 'knowledge', name: 'Эрудиция', icon: 'mdi-database' },
  { id: 'reasoning', name: 'Логика', icon: 'mdi-cogs' },
  { id: 'creativity', name: 'Творчество', icon: 'mdi-palette' }
];

const trainingOptions = [
  { 
    id: 'conversation', 
    name: 'Разговорная практика', 
    icon: 'mdi-chat', 
    description: 'Улучшает навыки общения и коммуникации',
    progress: 45
  },
  { 
    id: 'dataAnalysis', 
    name: 'Анализ данных', 
    icon: 'mdi-chart-bar', 
    description: 'Развивает логическое мышление и аналитику',
    progress: 30
  },
  { 
    id: 'creativeTasks', 
    name: 'Творческие задания', 
    icon: 'mdi-draw', 
    description: 'Раскрывает творческий потенциал',
    progress: 60
  },
  { 
    id: 'knowledgeBase', 
    name: 'Расширение базы знаний', 
    icon: 'mdi-book-open-page-variant', 
    description: 'Пополняет базу знаний новой информацией',
    progress: 20
  }
];

const languages = ['Русский', 'English', 'Español', '中文', '日本語'];

const selectStyle = (styleId) => {
  currentAvatar.value.style = styleId;
};

const selectClothes = (clothesId) => {
  currentAvatar.value.clothes = clothesId;
};

const toggleAccessory = (accessoryId) => {
  const accessories = currentAvatar.value.accessories;
  const index = accessories.indexOf(accessoryId);
  
  if (index !== -1) {
    accessories.splice(index, 1);
  } else {
    accessories.push(accessoryId);
  }
};

const toggleTrait = (traitId) => {
  const traits = currentAvatar.value.personality;
  const index = traits.indexOf(traitId);
  
  if (index !== -1) {
    traits.splice(index, 1);
  } else {
    traits.push(traitId);
  }
};

const toggleInterest = (interestId) => {
  const interests = currentAvatar.value.interests;
  const index = interests.indexOf(interestId);
  
  if (index !== -1) {
    interests.splice(index, 1);
  } else {
    interests.push(interestId);
  }
};

const startTraining = (trainingId) => {
  const training = trainingOptions.find(t => t.id === trainingId);
  if (!training) return;
  
  training.progress += 10;
  if (training.progress > 100) training.progress = 100;
  
  let skillToUpdate;
  switch (trainingId) {
    case 'conversation':
      skillToUpdate = 'communication';
      break;
    case 'dataAnalysis':
      skillToUpdate = 'reasoning';
      break;
    case 'creativeTasks':
      skillToUpdate = 'creativity';
      break;
    case 'knowledgeBase':
      skillToUpdate = 'knowledge';
      break;
  }
  
  if (skillToUpdate) {
    const increase = Math.floor(Math.random() * 3) + 1;
    currentAvatar.value.skills[skillToUpdate] = Math.min(
      currentAvatar.value.skills[skillToUpdate] + increase, 
      100
    );
  }
};

const saveAvatar = () => {
  localStorage.setItem('avatar_settings', JSON.stringify(currentAvatar.value));
  alert('Настройки аватара сохранены!');
};

const resetAvatar = () => {
  if (confirm('Вы уверены, что хотите сбросить все настройки аватара?')) {
    currentAvatar.value = {
      name: 'Neo',
      role: 'Персональный ассистент',
      level: 1,
      experience: 0,
      friends: 0,
      style: 'default',
      clothes: 'casual',
      accessories: [],
      personality: ['friendly'],
      interests: ['tech'],
      language: 'Русский',
      autonomy: 50,
      creativity: 50,
      skills: {
        communication: 50,
        knowledge: 50,
        reasoning: 50,
        creativity: 50
      },
      iconImage: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y'
    };
  }
};

const handleUserMessage = (message) => {
  console.log('Сообщение пользователя:', message);
};

const handleAvatarResponse = (message) => {
  console.log('Ответ аватара:', message);
};

onMounted(() => {
  const savedSettings = localStorage.getItem('avatar_settings');
  if (savedSettings) {
    try {
      currentAvatar.value = JSON.parse(savedSettings);
    } catch (e) {
      console.error('Ошибка при загрузке настроек аватара:', e);
    }
  }
});
</script>

<style lang="scss" scoped>
.avatar {
  min-height: 100vh;
  color: $text-primary;
  background: $background;
}

.avatar-header {
  background: linear-gradient(135deg, $primary, $accent);
  padding: $spacing-xl;
  color: white;
  position: relative;
  overflow: hidden;
  margin-bottom: $spacing-xl;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/grid-pattern.svg'), linear-gradient(135deg, rgba($primary, 0.8), rgba($accent, 0.8));
    background-size: cover;
    opacity: 0.3;
    z-index: 0;
  }
  
  .header-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    
    h1 {
      font-size: $font-size-4xl;
      font-weight: $font-weight-bold;
      margin-bottom: $spacing-sm;
      text-shadow: 0 0 20px rgba($primary-dark, 0.5);
    }
    
    .subtitle {
      font-size: $font-size-lg;
      font-weight: $font-weight-medium;
      opacity: 0.9;
    }
  }
}

.avatar-content {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
  max-width: $container-max-width;
  margin: 0 auto;
  padding: 0 $container-padding;
  
  @media (min-width: $breakpoint-lg) {
    flex-direction: row;
  }
}

.avatar-preview {
  display: flex;
  flex-direction: column;
  width: 100%;
  
  @media (min-width: $breakpoint-lg) {
    width: 40%;
    position: sticky;
    top: $spacing-xl;
    align-self: flex-start;
  }
  
  .preview-container {
    position: relative;
    width: 100%;
    border-radius: $border-radius-xl;
    overflow: hidden;
    background: rgba($surface, 0.3);
    border: 1px solid rgba($primary, 0.3);
    margin-bottom: $spacing-md;
    box-shadow: 0 10px 30px rgba($background, 0.6);
  }
  
  .avatar-info {
    background: rgba($surface, 0.3);
    border-radius: $border-radius-xl;
    padding: $spacing-lg;
    border: 1px solid rgba($primary, 0.3);
    text-align: center;
    
    h2 {
      font-size: $font-size-2xl;
      font-weight: $font-weight-bold;
      margin-bottom: $spacing-xs;
      color: $text-primary;
    }
    
    .role {
      color: $text-secondary;
      margin-bottom: $spacing-md;
    }
    
    .stats {
      display: flex;
      justify-content: space-around;
      
      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .stat-value {
          font-size: $font-size-xl;
          font-weight: $font-weight-bold;
          color: $primary;
        }
        
        .stat-label {
          font-size: $font-size-sm;
          color: $text-secondary;
        }
      }
    }
  }
}

.panel-container {
  flex: 1;
  background: rgba($surface, 0.3);
  border-radius: $border-radius-xl;
  border: 1px solid rgba($primary, 0.3);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba($background, 0.6);
  
  .v-window {
    height: 100%;
  }
}

.appearance-options, .personality-options, .skills-options, .settings-options {
  padding: $spacing-lg;
  overflow-y: auto;
  max-height: 600px;
  
  .option-group {
    margin-bottom: $spacing-xl;
    
    h3 {
      font-size: $font-size-lg;
      color: $text-primary;
      margin-bottom: $spacing-md;
      font-weight: $font-weight-semibold;
      position: relative;
      display: inline-block;
      
      &:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 70%;
        height: 2px;
        background: linear-gradient(90deg, $primary, transparent);
      }
    }
  }
  
  .style-grid, .clothes-grid, .accessories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: $spacing-md;
    
    .style-card, .clothes-card, .accessory-card {
      background: rgba($surface-dark, 0.3);
      border-radius: $border-radius-md;
      padding: $spacing-sm;
      text-align: center;
      cursor: pointer;
      transition: all $transition-normal;
      border: 1px solid transparent;
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba($primary, 0.15);
      }
      
      &.active {
        border-color: $primary;
        background: rgba($primary, 0.1);
        box-shadow: 0 0 15px rgba($primary, 0.3);
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
        font-size: $font-size-sm;
        color: $text-primary;
      }
    }
  }
  
  .personality-grid, .interests-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: $spacing-md;
    
    .trait-card, .interest-card {
      background: rgba($surface-dark, 0.3);
      border-radius: $border-radius-md;
      padding: $spacing-sm;
      text-align: center;
      cursor: pointer;
      transition: all $transition-normal;
      border: 1px solid transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba($primary, 0.15);
      }
      
      &.active {
        border-color: $primary;
        background: rgba($primary, 0.1);
        box-shadow: 0 0 15px rgba($primary, 0.3);
      }
      
      .v-icon {
        font-size: 32px;
        color: $primary;
        margin-bottom: $spacing-sm;
      }
      
      span {
        font-weight: $font-weight-medium;
        margin-bottom: $spacing-xs;
        color: $text-primary;
      }
      
      p {
        font-size: $font-size-xs;
        color: $text-secondary;
        line-height: 1.4;
      }
    }
  }
  
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: $spacing-md;
    
    .skill-card {
      background: rgba($surface-dark, 0.3);
      border-radius: $border-radius-md;
      padding: $spacing-md;
      
      .skill-header {
        display: flex;
        align-items: center;
        margin-bottom: $spacing-sm;
        
        .v-icon {
          color: $primary;
          margin-right: $spacing-sm;
        }
        
        span {
          font-weight: $font-weight-medium;
          color: $text-primary;
        }
      }
      
      .skill-level {
        display: block;
        font-size: $font-size-xs;
        color: $text-secondary;
        margin-top: $spacing-xs;
        text-align: right;
      }
    }
  }
  
  .training-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: $spacing-md;
    
    .training-card {
      background: rgba($surface-dark, 0.3);
      border-radius: $border-radius-md;
      padding: $spacing-md;
      cursor: pointer;
      transition: all $transition-normal;
      border: 1px solid transparent;
      display: flex;
      flex-direction: column;
      
      &:hover {
        transform: translateY(-3px);
        background: rgba($surface, 0.4);
        border-color: rgba($primary, 0.3);
        box-shadow: 0 5px 15px rgba($primary, 0.15);
      }
      
      .v-icon {
        color: $primary;
        margin-bottom: $spacing-sm;
        font-size: 28px;
      }
      
      span {
        font-weight: $font-weight-medium;
        margin-bottom: $spacing-xs;
        color: $text-primary;
      }
      
      p {
        font-size: $font-size-sm;
        color: $text-secondary;
        line-height: 1.4;
        margin-bottom: $spacing-md;
      }
      
      .training-progress {
        margin-top: auto;
      }
    }
  }
  
  .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: $spacing-md;
    
    .setting-item {
      margin-bottom: $spacing-md;
      
      label {
        display: block;
        font-size: $font-size-sm;
        color: $text-secondary;
        margin-bottom: $spacing-xs;
      }
    }
  }
  
  .behavior-settings {
    .behavior-item {
      margin-bottom: $spacing-lg;
      
      .behavior-info {
        margin-bottom: $spacing-sm;
        
        h4 {
          color: $text-primary;
          font-weight: $font-weight-medium;
          margin-bottom: 2px;
        }
        
        p {
          font-size: $font-size-sm;
          color: $text-secondary;
        }
      }
    }
  }
  
  .backup-controls {
    display: flex;
    gap: $spacing-md;
    flex-wrap: wrap;
  }
}

.control-btn {
  height: 40px;
  min-width: 40px;
  border-radius: $border-radius-lg;
  position: relative;
  background: rgba($surface, 0.3);
  border: 1px solid rgba($primary, 0.3);
  color: $text-primary;
  transition: all $transition-normal;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba($primary, 0.1);
    box-shadow: 0 0 15px rgba($primary, 0.2);
    transform: translateY(-2px);
  }
  
  .v-icon {
    color: $primary;
    filter: drop-shadow(0 0 3px rgba($primary, 0.2));
  }
}
</style> 