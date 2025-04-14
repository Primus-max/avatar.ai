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
          <img src="https://via.placeholder.com/400" alt="AI Avatar Preview" class="preview-image">
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
        <div class="feature-card">
          <div class="feature-icon">
            <v-icon size="48">mdi-brain</v-icon>
          </div>
          <h3>Обучение</h3>
          <p>Аватар учится у тебя и развивается вместе с тобой</p>
          <div class="feature-preview">
            <img src="https://via.placeholder.com/300x200" alt="Learning Preview">
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <v-icon size="48">mdi-account-group</v-icon>
          </div>
          <h3>Общение</h3>
          <p>Взаимодействуй с другими аватарами в виртуальном мире</p>
          <div class="feature-preview">
            <img src="https://via.placeholder.com/300x200" alt="Communication Preview">
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <v-icon size="48">mdi-palette</v-icon>
          </div>
          <h3>Кастомизация</h3>
          <p>Создай уникальный образ и характер своего аватара</p>
          <div class="feature-preview">
            <img src="https://via.placeholder.com/300x200" alt="Customization Preview">
          </div>
        </div>
      </div>
    </div>

    <div class="creation-steps">
      <h2>Как создать своего аватара?</h2>
      <div class="steps-container">
        <div class="step-card">
          <div class="step-number">1</div>
          <h3>Загрузи фото</h3>
          <p>Начни с загрузки своего фото или выбери готовый шаблон</p>
          <div class="step-preview">
            <img src="https://via.placeholder.com/200" alt="Step 1">
          </div>
        </div>
        <div class="step-card">
          <div class="step-number">2</div>
          <h3>Настрой внешность</h3>
          <p>Выбери стиль, одежду и аксессуары для своего аватара</p>
          <div class="step-preview">
            <img src="https://via.placeholder.com/200" alt="Step 2">
          </div>
        </div>
        <div class="step-card">
          <div class="step-number">3</div>
          <h3>Создай характер</h3>
          <p>Определи личность, интересы и манеру общения аватара</p>
          <div class="step-preview">
            <img src="https://via.placeholder.com/200" alt="Step 3">
          </div>
        </div>
      </div>
    </div>

    <div class="community-preview">
      <h2>Присоединяйся к сообществу</h2>
      <div class="avatars-grid">
        <div class="avatar-card">
          <img src="https://via.placeholder.com/150" alt="Avatar 1">
          <div class="avatar-info">
            <h4>Neo</h4>
            <p>Исследователь метавселенной</p>
          </div>
        </div>
        <div class="avatar-card">
          <img src="https://via.placeholder.com/150" alt="Avatar 2">
          <div class="avatar-info">
            <h4>Luna</h4>
            <p>Цифровой художник</p>
          </div>
        </div>
        <div class="avatar-card">
          <img src="https://via.placeholder.com/150" alt="Avatar 3">
          <div class="avatar-info">
            <h4>Atlas</h4>
            <p>AI-ученый</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const startCreation = () => {
  // Логика начала создания аватара
  console.log('Начало создания аватара...');
};

const learnMore = () => {
  // Логика перехода к подробной информации
  console.log('Узнать больше...');
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: white;
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-xl;
  min-height: 80vh;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(22, 33, 62, 0.8)),
              url('https://via.placeholder.com/1920x1080') center/cover;

  .hero-content {
    max-width: 600px;

    h1 {
      font-size: 4rem;
      margin-bottom: $spacing-md;
      background: linear-gradient(135deg, #00d2ff, #3a7bd5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 1.5rem;
      opacity: 0.9;
      margin-bottom: $spacing-lg;
    }

    .hero-buttons {
      display: flex;
      gap: $spacing-md;
    }
  }

  .hero-preview {
    .avatar-preview {
      position: relative;
      width: 400px;
      height: 400px;
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

.features-section {
  padding: $spacing-xl;
  text-align: center;

  h2 {
    font-size: 3rem;
    margin-bottom: $spacing-xl;
    background: linear-gradient(135deg, #00d2ff, #3a7bd5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-lg;
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: $border-radius-lg;
    padding: $spacing-lg;
    transition: transform $transition-normal;
    backdrop-filter: blur(10px);

    &:hover {
      transform: translateY(-10px);
    }

    .feature-icon {
      color: #00d2ff;
      margin-bottom: $spacing-md;
    }

    h3 {
      font-size: 1.8rem;
      margin-bottom: $spacing-sm;
    }

    p {
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: $spacing-md;
    }

    .feature-preview {
      border-radius: $border-radius-md;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0, 210, 255, 0.2);

      img {
        width: 100%;
        height: auto;
      }
    }
  }
}

.creation-steps {
  padding: $spacing-xl;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(22, 33, 62, 0.8));

  h2 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: $spacing-xl;
    background: linear-gradient(135deg, #00d2ff, #3a7bd5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .steps-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-lg;
    max-width: 1200px;
    margin: 0 auto;
  }

  .step-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: $border-radius-lg;
    padding: $spacing-lg;
    text-align: center;
    backdrop-filter: blur(10px);

    .step-number {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #00d2ff, #3a7bd5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto $spacing-md;
      font-size: 1.5rem;
      font-weight: bold;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: $spacing-sm;
    }

    p {
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: $spacing-md;
    }

    .step-preview {
      border-radius: $border-radius-md;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0, 210, 255, 0.2);

      img {
        width: 100%;
        height: auto;
      }
    }
  }
}

.community-preview {
  padding: $spacing-xl;
  text-align: center;

  h2 {
    font-size: 3rem;
    margin-bottom: $spacing-xl;
    background: linear-gradient(135deg, #00d2ff, #3a7bd5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .avatars-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-lg;
    max-width: 1200px;
    margin: 0 auto;
  }

  .avatar-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: $border-radius-lg;
    overflow: hidden;
    transition: transform $transition-normal;
    backdrop-filter: blur(10px);

    &:hover {
      transform: translateY(-10px);
    }

    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    .avatar-info {
      padding: $spacing-md;

      h4 {
        font-size: 1.5rem;
        margin-bottom: $spacing-xs;
      }

      p {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
}

@media (max-width: $breakpoint-md) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding: $spacing-lg;

    .hero-content {
      margin-bottom: $spacing-lg;
    }

    .hero-preview {
      .avatar-preview {
        width: 300px;
        height: 300px;
      }
    }
  }

  .features-grid,
  .steps-container,
  .avatars-grid {
    grid-template-columns: 1fr;
  }
}
</style> 