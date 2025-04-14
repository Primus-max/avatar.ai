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
        <div class="feature-card">
          <div class="feature-icon">
            <v-icon size="48">mdi-brain</v-icon>
          </div>
          <h3>Обучение</h3>
          <p>Аватар учится у тебя и развивается вместе с тобой</p>
          <div class="feature-preview">
            <div class="feature-image">
              <v-icon size="48">mdi-brain</v-icon>
              <img src="https://www.gravatar.com/avatar/11111111111111111111111111111111?d=identicon&s=300&f=y" alt="Learning Preview">
            </div>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <v-icon size="48">mdi-account-group</v-icon>
          </div>
          <h3>Общение</h3>
          <p>Взаимодействуй с другими аватарами в виртуальном мире</p>
          <div class="feature-preview">
            <div class="feature-image">
              <v-icon size="48">mdi-account-group</v-icon>
              <img src="https://www.gravatar.com/avatar/22222222222222222222222222222222?d=identicon&s=300&f=y" alt="Communication Preview">
            </div>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <v-icon size="48">mdi-palette</v-icon>
          </div>
          <h3>Кастомизация</h3>
          <p>Создай уникальный образ и характер своего аватара</p>
          <div class="feature-preview">
            <div class="feature-image">
              <v-icon size="48">mdi-palette</v-icon>
              <img src="https://www.gravatar.com/avatar/33333333333333333333333333333333?d=identicon&s=300&f=y" alt="Customization Preview">
            </div>
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
            <div class="step-image">
              <img src="https://www.gravatar.com/avatar/44444444444444444444444444444444?d=identicon&s=200&f=y" alt="Step 1">
            </div>
          </div>
        </div>
        <div class="step-card">
          <div class="step-number">2</div>
          <h3>Настрой внешность</h3>
          <p>Выбери стиль, одежду и аксессуары для своего аватара</p>
          <div class="step-preview">
            <div class="step-image">
              <img src="https://www.gravatar.com/avatar/55555555555555555555555555555555?d=identicon&s=200&f=y" alt="Step 2">
            </div>
          </div>
        </div>
        <div class="step-card">
          <div class="step-number">3</div>
          <h3>Создай характер</h3>
          <p>Определи личность, интересы и манеру общения аватара</p>
          <div class="step-preview">
            <div class="step-image">
              <img src="https://www.gravatar.com/avatar/66666666666666666666666666666666?d=identicon&s=200&f=y" alt="Step 3">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="community-preview">
      <h2>Присоединяйся к сообществу</h2>
      <div class="avatars-grid">
        <div class="avatar-card">
          <div class="avatar-preview">
            <img src="https://www.gravatar.com/avatar/77777777777777777777777777777777?d=identicon&s=150&f=y" alt="Avatar 1">
            <h4>Технический</h4>
            <p>Инженер ИИ</p>
          </div>
        </div>
        <div class="avatar-card">
          <div class="avatar-preview">
            <img src="https://www.gravatar.com/avatar/88888888888888888888888888888888?d=identicon&s=150&f=y" alt="Avatar 2">
            <h4>Креативный</h4>
            <p>Цифровой художник</p>
          </div>
        </div>
        <div class="avatar-card">
          <div class="avatar-preview">
            <img src="https://www.gravatar.com/avatar/99999999999999999999999999999999?d=identicon&s=150&f=y" alt="Avatar 3">
            <h4>Социальный</h4>
            <p>Коммуникатор</p>
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
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.9)),
              radial-gradient(rgba(0, 210, 255, 0.1) 1px, transparent 1px) 0 0 / 20px 20px;

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

      .feature-image {
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

      .step-image {
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

    .avatar-preview {
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