<template>
  <div class="chat-container">
    <div class="chat-messages" ref="chatMessagesRef">
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        class="message" 
        :class="{ 'message-avatar': message.from === 'avatar', 'message-user': message.from === 'user' }"
      >
        <div class="message-avatar-icon" v-if="message.from === 'avatar'">
          <v-avatar size="36">
            <img :src="avatarImage" :alt="avatarName" />
          </v-avatar>
        </div>
        <div class="message-content">
          <p>{{ message.text }}</p>
          <span class="message-time">{{ message.time }}</span>
        </div>
        <div class="message-user-icon" v-if="message.from === 'user'">
          <v-avatar size="36">
            <img src="@/assets/user-avatar.jpg" alt="Вы" />
          </v-avatar>
        </div>
      </div>
      <div v-if="isTyping" class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
    <div class="chat-input">
      <v-text-field
        v-model="inputMessage"
        placeholder="Напишите сообщение..."
        variant="outlined"
        density="comfortable"
        hide-details
        append-inner-icon="mdi-send"
        @click:append-inner="sendMessage"
        @keyup.enter="sendMessage"
      />
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  defineEmits,
  defineProps,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue';

import AvatarAI from '@/services/avatarAI';
import AvatarMemory from '@/services/avatarMemory';

const props = defineProps({
  avatarName: {
    type: String,
    default: 'Neo'
  },
  userName: {
    type: String,
    default: 'Vladimir'
  },
  avatarImage: {
    type: String,
    default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y'
  },
  avatarSettings: {
    type: Object,
    default: () => ({})
  },
  initialMessages: {
    type: Array,
    default: () => []
  },
  debugMode: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['message-sent', 'avatar-response', 'memory-updated']);

const messages = ref([]);
const isTyping = ref(false);
const inputMessage = ref('');
const chatMessagesRef = ref(null);

// Инициализируем сервисы
const avatarMemory = ref(new AvatarMemory(props.avatarName, props.userName));
const avatarAI = ref(new AvatarAI(avatarMemory.value, {
  debugMode: props.debugMode,
  fallbackMode: true
}));

// При изменении настроек аватара обновляем память
watch(() => props.avatarSettings, (newSettings) => {
  if (newSettings && Object.keys(newSettings).length > 0) {
    avatarMemory.value.updateAvatarInfo(newSettings);
    
    if (props.debugMode) {
      console.log('Обновлены настройки аватара в памяти:', newSettings);
    }
  }
}, { deep: true });

// Эмитим событие обновления памяти для родительского компонента
watch(() => avatarMemory.value.memoryData, () => {
  emit('memory-updated', avatarMemory.value.memoryData);
}, { deep: true });

// Прокрутка чата вниз
const scrollToBottom = () => {
  nextTick(() => {
    if (chatMessagesRef.value) {
      const element = chatMessagesRef.value;
      element.scrollTop = element.scrollHeight;
    }
  });
};

// Форматирование времени для сообщений
const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Отправка сообщения
const sendMessage = async () => {
  if (!inputMessage.value.trim()) return;

  const messageText = inputMessage.value.trim();
  
  // Добавляем сообщение пользователя в чат
  const userMessage = {
    from: 'user',
    text: messageText,
    time: getCurrentTime()
  };
  
  messages.value.push(userMessage);
  emit('message-sent', userMessage);
  
  // Очищаем поле ввода
  inputMessage.value = '';
  
  // Прокручиваем чат вниз
  scrollToBottom();
  
  // Показываем индикатор набора текста
  isTyping.value = true;
  
  try {
    // Получаем ответ от AI
    const response = await avatarAI.value.sendMessage(messageText);
    
    // Скрываем индикатор набора текста
    isTyping.value = false;
    
    // Добавляем ответ от аватара
    const avatarResponse = {
      from: 'avatar',
      text: response,
      time: getCurrentTime()
    };
    
    messages.value.push(avatarResponse);
    emit('avatar-response', avatarResponse);
    
    // Прокручиваем чат вниз
    scrollToBottom();
  } catch (error) {
    console.error('Ошибка при получении ответа от аватара:', error);
    
    // Скрываем индикатор набора текста
    isTyping.value = false;
    
    // Добавляем сообщение об ошибке
    messages.value.push({
      from: 'avatar',
      text: 'Извини, я временно не могу ответить. Пожалуйста, попробуй позже.',
      time: getCurrentTime()
    });
    
    scrollToBottom();
  }
};

// Очистка истории чата
const clearChat = () => {
  messages.value = [];
  avatarAI.value.clearConversation();
};

// Экспортируем функции для использования извне
defineExpose({
  clearChat,
  avatarMemory: avatarMemory.value,
  avatarAI: avatarAI.value
});

// Инициализация при загрузке компонента
onMounted(async () => {
  // Загружаем начальные сообщения, если их нет
  if (props.initialMessages.length > 0) {
    messages.value = [...props.initialMessages];
  } else {
    // Приветственное сообщение от аватара
    messages.value.push({
      from: 'avatar',
      text: 'Привет! Я твой персональный AI-аватар. Чем я могу помочь тебе сегодня?',
      time: getCurrentTime()
    });
  }
  
  // Обновляем информацию об аватаре в памяти
  avatarMemory.value.updateAvatarInfo({
    avatarName: props.avatarName,
    role: props.avatarSettings.role || 'Персональный ассистент'
  });
  
  // Прокручиваем чат вниз
  scrollToBottom();
});

// Отслеживаем изменение сообщений для прокрутки
watch(messages, () => {
  scrollToBottom();
});
</script>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 600px;
  max-height: 70vh;
  
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: $spacing-md;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    
    .message {
      display: flex;
      max-width: 70%;
      align-items: flex-start;
      
      &.message-avatar {
        align-self: flex-start;
        
        .message-content {
          background: rgba($surface-dark, 0.5);
          border-radius: 0 $border-radius-lg $border-radius-lg $border-radius-lg;
          margin-left: $spacing-sm;
        }
      }
      
      &.message-user {
        align-self: flex-end;
        flex-direction: row-reverse;
        
        .message-content {
          background: rgba($primary, 0.2);
          border-radius: $border-radius-lg $border-radius-lg $border-radius-lg 0;
          margin-right: $spacing-sm;
        }
      }
      
      .message-content {
        padding: $spacing-md;
        box-shadow: 0 2px 10px rgba($background, 0.3);
        
        p {
          margin: 0;
          color: $text-primary;
          white-space: pre-line;
        }
        
        .message-time {
          display: block;
          font-size: $font-size-xs;
          margin-top: $spacing-xs;
          color: $text-secondary;
          text-align: right;
        }
      }
    }
    
    .typing-indicator {
      display: flex;
      align-self: flex-start;
      padding: $spacing-sm $spacing-md;
      background: rgba($surface-dark, 0.3);
      border-radius: $border-radius-full;
      margin-left: 44px;
      
      .typing-dot {
        width: 8px;
        height: 8px;
        margin: 0 2px;
        background: $text-secondary;
        border-radius: 50%;
        animation: typingAnimation 1.5s infinite ease-in-out;
        
        &:nth-child(1) { animation-delay: 0s; }
        &:nth-child(2) { animation-delay: 0.2s; }
        &:nth-child(3) { animation-delay: 0.4s; }
      }
    }
  }
  
  .chat-input {
    padding: $spacing-md;
    border-top: 1px solid rgba($primary, 0.2);
    background: rgba($surface-dark, 0.3);
  }
}

@keyframes typingAnimation {
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}
</style> 