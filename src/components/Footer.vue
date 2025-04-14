<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section brand">
          <div class="footer-logo">
            <!-- <div class="logo-avatar-small">
              <img src="@/assets/svg/logo-static.svg" alt="Avatar.AI" class="logo-image">
            </div> -->
            <span>Avatar.AI</span>
          </div>
          <p class="footer-description">Создавайте своих AI-аватаров с уникальной личностью, внешностью и голосом.</p>
        </div>
        
        <div class="footer-section links">
          <h3>Быстрые ссылки</h3>
          <nav class="footer-nav">
            <router-link to="/">Главная</router-link>
            <router-link to="/avatar">Мой аватар</router-link>
            <router-link to="/community">Сообщество</router-link>
            <router-link to="/settings">Настройки</router-link>
          </nav>
        </div>
        
        <div class="footer-section contact">
          <h3>Связаться с нами</h3>
          <div class="contact-item">
            <v-icon size="small">mdi-email</v-icon>
            <span>support@avatar.ai</span>
          </div>
          <div class="contact-item">
            <v-icon size="small">mdi-phone</v-icon>
            <span>+7 (800) 555-35-35</span>
          </div>
          <div class="social-icons">
            <a href="#" class="social-icon" aria-label="Twitter">
              <v-icon>mdi-twitter</v-icon>
            </a>
            <a href="#" class="social-icon" aria-label="Instagram">
              <v-icon>mdi-instagram</v-icon>
            </a>
            <a href="#" class="social-icon" aria-label="Facebook">
              <v-icon>mdi-facebook</v-icon>
            </a>
            <a href="#" class="social-icon" aria-label="GitHub">
              <v-icon>mdi-github</v-icon>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="copyright">
          &copy; {{ new Date().getFullYear() }} Avatar.AI. Все права защищены.
        </div>
        <div class="footer-links">
          <a href="#">Условия использования</a>
          <a href="#">Политика конфиденциальности</a>
        </div>
      </div>
    </div>
    
    <div class="footer-decorations">
      <div class="glow-effect top-left"></div>
      <div class="glow-effect bottom-right"></div>
      <div class="grid-lines"></div>
    </div>
  </footer>
</template>

<script setup>
// Футер не требует сложной логики
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  background: rgba($surface-dark, 0.9);
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba($primary, 0.2);
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.2);
  z-index: 10;
  margin-top: $spacing-xl;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba($primary, 0.8), transparent);
  }
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: $spacing-lg $spacing-md;
  position: relative;
  z-index: 2;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: $spacing-xl;
  padding-bottom: $spacing-lg;
  border-bottom: 1px solid rgba($primary, 0.1);
  
  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
  }
}

.footer-section {
  h3 {
    font-size: $font-size-md;
    color: $text-primary;
    margin-bottom: $spacing-md;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 30px;
      height: 2px;
      background: $primary;
      border-radius: $border-radius-sm;
    }
  }
}

.brand {
  .footer-logo {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    margin-bottom: $spacing-sm;
    
    .logo-avatar-small {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    span {
      font-size: $font-size-lg;
      font-weight: $font-weight-bold;
      background: linear-gradient(135deg, #ffffff, rgba($primary, 0.8));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  
  .footer-description {
    color: $text-secondary;
    font-size: $font-size-sm;
    line-height: 1.6;
    max-width: 300px;
  }
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
  
  a {
    color: $text-secondary;
    text-decoration: none;
    transition: $transition-fast;
    font-size: $font-size-sm;
    position: relative;
    width: fit-content;
    padding-left: $spacing-xs;
    
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: $primary;
      opacity: 0;
      transition: $transition-fast;
    }
    
    &:hover {
      color: $text-primary;
      transform: translateX(3px);
      
      &:before {
        opacity: 1;
      }
    }
    
    &.router-link-active {
      color: $primary;
      
      &:before {
        opacity: 1;
      }
    }
  }
}

.contact-item {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  margin-bottom: $spacing-xs;
  color: $text-secondary;
  font-size: $font-size-sm;
  
  .v-icon {
    color: $primary;
  }
}

.social-icons {
  display: flex;
  gap: $spacing-sm;
  margin-top: $spacing-md;
  
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba($surface-light, 0.1);
    transition: $transition-normal;
    color: $text-secondary;
    text-decoration: none;
    
    &:hover {
      background: $primary;
      color: $background;
      transform: translateY(-3px);
      box-shadow: 0 5px 10px rgba($primary, 0.3);
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: $spacing-md;
  font-size: $font-size-xs;
  color: $text-secondary;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    gap: $spacing-sm;
    text-align: center;
  }
}

.copyright {
  opacity: 0.8;
}

.footer-links {
  display: flex;
  gap: $spacing-md;
  
  a {
    color: $text-secondary;
    text-decoration: none;
    transition: $transition-fast;
    
    &:hover {
      color: $primary;
    }
  }
}

.footer-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  
  .glow-effect {
    position: absolute;
    border-radius: 50%;
    
    &.top-left {
      top: -100px;
      left: -100px;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba($primary, 0.2) 0%, rgba($primary, 0) 70%);
    }
    
    &.bottom-right {
      bottom: -150px;
      right: -150px;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba($accent, 0.15) 0%, rgba($accent, 0) 70%);
    }
  }
  
  .grid-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(0deg, rgba($primary, 0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba($primary, 0.05) 1px, transparent 1px);
    background-size: 30px 30px;
    opacity: 0.2;
  }
}
</style> 