<template>
  <div class="home">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Создай своего AI-аватара</h1>
        <p class="subtitle">Твой цифровой двойник, который учится, развивается и общается</p>
        <div class="hero-buttons">
          <v-btn
            color="primary"
            size="large"
            class="mr-4"
            @click="startCreation"
          >
            Начать создание
          </v-btn>
          <v-btn
            variant="outlined"
            size="large"
            @click="learnMore"
          >
            Узнать больше
          </v-btn>
        </div>
      </div>
      <div class="hero-preview">
        <div class="avatar-preview">
          <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&s=400&f=y" alt="AI Avatar Preview" class="preview-image">
          <div class="preview-controls">
            <v-btn icon="mdi-rotate-left" variant="text" />
            <v-btn icon="mdi-rotate-right" variant="text" />
            <v-btn icon="mdi-zoom-in" variant="text" />
            <v-btn icon="mdi-zoom-out" variant="text" />
          </div>
        </div>
      </div>
    </div>

    <div class="features-section">
      <h2>Что может твой AI-аватар?</h2>
      <div class="features-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="feature-content">
            <div class="feature-icon">
              <v-icon size="48" :icon="feature.icon"></v-icon>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
          <div class="feature-preview">
            <img :src="feature.image" :alt="feature.title">
          </div>
        </div>
      </div>
    </div>

    <div class="creation-steps">
      <h2>Как создать своего аватара?</h2>
      <div class="steps-container">
        <div v-for="step in steps" :key="step.number" class="step-card">
          <div class="step-content">
            <div class="step-number">{{ step.number }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
          <div class="step-preview">
            <img :src="step.image" :alt="'Step ' + step.number">
          </div>
        </div>
      </div>
    </div>

    <div class="community-preview">
      <h2>Присоединяйся к сообществу</h2>
      <div class="avatars-grid">
        <div v-for="avatar in avatars" :key="avatar.title" class="avatar-card">
          <div class="avatar-preview">
            <img :src="avatar.image" :alt="avatar.title">
            <div class="avatar-content">
              <h4>{{ avatar.title }}</h4>
              <p>{{ avatar.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue';

import VueSlickCarousel from 'vue-slick-carousel';

const isMobile = ref(false);
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
};

const features = [
  {
    icon: 'mdi-brain',
    title: 'Обучение',
    description: 'Аватар учится у тебя и развивается вместе с тобой',
    image: 'https://www.gravatar.com/avatar/11111111111111111111111111111111?d=identicon&s=300&f=y'
  },
  {
    icon: 'mdi-account-group',
    title: 'Общение',
    description: 'Взаимодействуй с другими аватарами в виртуальном мире',
    image: 'https://www.gravatar.com/avatar/22222222222222222222222222222222?d=identicon&s=300&f=y'
  },
  {
    icon: 'mdi-palette',
    title: 'Кастомизация',
    description: 'Создай уникальный образ и характер своего аватара',
    image: 'https://www.gravatar.com/avatar/33333333333333333333333333333333?d=identicon&s=300&f=y'
  }
];

const steps = [
  {
    number: 1,
    title: 'Загрузи фото',
    description: 'Начни с загрузки своего фото или выбери готовый шаблон',
    image: 'https://www.gravatar.com/avatar/44444444444444444444444444444444?d=identicon&s=200&f=y'
  },
  {
    number: 2,
    title: 'Настрой внешность',
    description: 'Выбери стиль, одежду и аксессуары для своего аватара',
    image: 'https://www.gravatar.com/avatar/55555555555555555555555555555555?d=identicon&s=200&f=y'
  },
  {
    number: 3,
    title: 'Создай характер',
    description: 'Определи личность, интересы и манеру общения аватара',
    image: 'https://www.gravatar.com/avatar/66666666666666666666666666666666?d=identicon&s=200&f=y'
  }
];

const avatars = [
  {
    title: 'Технический',
    role: 'Инженер ИИ',
    image: 'https://www.gravatar.com/avatar/77777777777777777777777777777777?d=identicon&s=150&f=y'
  },
  {
    title: 'Креативный',
    role: 'Цифровой художник',
    image: 'https://www.gravatar.com/avatar/88888888888888888888888888888888?d=identicon&s=150&f=y'
  },
  {
    title: 'Социальный',
    role: 'Коммуникатор',
    image: 'https://www.gravatar.com/avatar/99999999999999999999999999999999?d=identicon&s=150&f=y'
  }
];

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

const startCreation = () => {
  console.log('Начало создания аватара...');
};

const learnMore = () => {
  console.log('Узнать больше...');
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: white;
  overflow-x: hidden;
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-lg;
  min-height: 70vh;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.9)),
              radial-gradient(rgba(0, 210, 255, 0.1) 1px, transparent 1px) 0 0 / 20px 20px;

  .hero-content {
    max-width: 500px;

    h1 {
      font-size: 3.5rem;
      margin-bottom: $spacing-sm;
      background: linear-gradient(135deg, #00d2ff, #3a7bd5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 1.25rem;
      opacity: 0.9;
      margin-bottom: $spacing-md;
    }

    .hero-buttons {
      display: flex;
      gap: $spacing-md;
    }
  }

  .hero-preview {
    .avatar-preview {
      position: relative;
      width: 350px;
      height: 350px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 0 50px rgba(0, 210, 255, 0.3);

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
  }
}

.features-section,
.creation-steps,
.community-preview {
  padding: $spacing-lg;
  
  @media (max-width: $breakpoint-md) {
    padding: $spacing-sm;
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: $spacing-lg;
    background: linear-gradient(135deg, #00d2ff, #3a7bd5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: $breakpoint-md) {
      font-size: 1.8rem;
      margin-bottom: $spacing-md;
    }
  }
}

.features-grid,
.steps-container,
.avatars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }
}

.feature-card,
.step-card,
.avatar-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: $border-radius-lg;
  padding: $spacing-md;
  height: 100%;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
  
  @media (max-width: $breakpoint-md) {
    padding: $spacing-sm;
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }
}

.feature-content,
.step-content,
.avatar-content {
  @media (max-width: $breakpoint-md) {
    flex: 1;
  }
}

.feature-preview,
.step-preview {
  margin-top: $spacing-sm;
  border-radius: $border-radius-md;
  overflow: hidden;
  
  @media (max-width: $breakpoint-md) {
    margin-top: 0;
    width: 80px;
    height: 80px;
    flex-shrink: 0;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.feature-icon {
  color: #00d2ff;
  margin-bottom: $spacing-sm;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: $breakpoint-md) {
    height: 32px;
    margin-bottom: $spacing-xs;
  }
}

h3 {
  font-size: 1.5rem;
  margin-bottom: $spacing-xs;
  
  @media (max-width: $breakpoint-md) {
    font-size: 1.2rem;
    margin-bottom: $spacing-xs;
  }
}

p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: $spacing-sm;
  line-height: 1.4;
  
  @media (max-width: $breakpoint-md) {
    font-size: 0.9rem;
    margin-bottom: 0;
  }
}

.avatar-preview {
  text-align: center;
  
  @media (max-width: $breakpoint-md) {
    display: flex;
    align-items: center;
    text-align: left;
    gap: $spacing-sm;
  }
  
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: $spacing-sm;
    
    @media (max-width: $breakpoint-md) {
      width: 60px;
      height: 60px;
      margin-bottom: 0;
    }
  }
  
  h4 {
    font-size: 1.3rem;
    margin-bottom: $spacing-xs;
    
    @media (max-width: $breakpoint-md) {
      font-size: 1.1rem;
      margin-bottom: 0;
    }
  }
}

.step-number {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #00d2ff, #3a7bd5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto $spacing-sm;
  font-weight: bold;
  
  @media (max-width: $breakpoint-md) {
    width: 24px;
    height: 24px;
    margin: 0;
    font-size: 0.9rem;
  }
}

@media (max-width: $breakpoint-md) {
  .features-section,
  .creation-steps,
  .community-preview {
    .mobile-scroll {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scroll-snap-type: x mandatory;
      padding: $spacing-sm $spacing-md;
      margin: 0 -$spacing-md;
      display: flex;
      gap: $spacing-md;
      
      &::-webkit-scrollbar {
        display: none;
      }
      
      > div {
        flex: 0 0 85%;
        scroll-snap-align: center;
        
        &:first-child {
          margin-left: $spacing-md;
        }
        
        &:last-child {
          margin-right: $spacing-md;
        }
      }
    }
  }
}

@media (max-width: $breakpoint-md) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding: $spacing-md;
    min-height: auto;
    padding-top: $spacing-xl;

    .hero-content {
      margin-bottom: $spacing-lg;

      h1 {
        font-size: 2.2rem;
        margin-bottom: $spacing-sm;
      }

      .subtitle {
        font-size: 1.1rem;
        margin-bottom: $spacing-sm;
      }

      .hero-buttons {
        justify-content: center;
        flex-wrap: wrap;
      }
    }

    .hero-preview {
      .avatar-preview {
        width: 250px;
        height: 250px;
        margin: 0 auto;
      }
    }
  }

  .features-section,
  .creation-steps,
  .community-preview {
    padding: $spacing-sm 0;

    h2 {
      font-size: 1.8rem;
      margin-bottom: $spacing-md;
      padding: 0 $spacing-sm;
    }

    .features-grid,
    .steps-container,
    .avatars-grid {
      padding: 0 $spacing-sm;
    }
  }

  .features-grid,
  .steps-container,
  .avatars-grid {
    grid-template-columns: 1fr;
    gap: $spacing-md;
  }

  .feature-card,
  .step-card,
  .avatar-card {
    padding: $spacing-sm;
    margin-bottom: $spacing-sm;

    h3 {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.9rem;
    }

    .feature-preview,
    .step-preview {
      max-height: 160px;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .hero-section {
    .hero-content {
      h1 {
        font-size: 1.8rem;
      }

      .subtitle {
        font-size: 1rem;
      }

      .hero-buttons {
        flex-direction: column;
        gap: $spacing-sm;
        
        .v-btn {
          width: 100%;
        }
      }
    }

    .hero-preview {
      .avatar-preview {
        width: 200px;
        height: 200px;
      }
    }
  }

  .features-section,
  .creation-steps,
  .community-preview {
    h2 {
      font-size: 1.5rem;
    }
  }

  .feature-card,
  .step-card,
  .avatar-card {
    .feature-preview,
    .step-preview {
      max-height: 140px;
    }

    img {
      max-height: 120px;
    }
  }
}
</style> 