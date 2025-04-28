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
  defineEmits,
  defineProps,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue';

const props = defineProps({
  avatarName: {
    type: String,
    default: 'Neo'
  },
  avatarImage: {
    type: String,
    default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y'
  },
  initialMessages: {
    type: Array,
    default: () => [{
      from: 'avatar',
      text: 'Привет! Я твой персональный AI-аватар. Чем я могу помочь тебе сегодня?',
      time: '12:30'
    }]
  }
});

const emit = defineEmits(['message-sent', 'avatar-response']);

const messages = ref([...props.initialMessages]);
const isTyping = ref(false);
const inputMessage = ref('');
const chatMessagesRef = ref(null);

// Прокрутка чата вниз
const scrollToBottom = () => {
  nextTick(() => {
    if (chatMessagesRef.value) {
      const element = chatMessagesRef.value;
      element.scrollTop = element.scrollHeight;
    }
  });
};

// Отправка сообщения
const sendMessage = () => {
  if (!inputMessage.value.trim()) return;

  // Добавляем сообщение пользователя в чат
  const userMessage = {
    from: 'user',
    text: inputMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  
  messages.value.push(userMessage);
  emit('message-sent', userMessage);
  
  const messageText = inputMessage.value;
  inputMessage.value = '';
  
  // Прокручиваем чат вниз
  scrollToBottom();
  
  // Показываем индикатор набора текста
  isTyping.value = true;
  
  // Имитируем ответ от аватара
  setTimeout(() => {
    isTyping.value = false;
    
    // Получаем ответ (в будущем здесь будет API-запрос)
    const response = getAIResponse(messageText);
    
    // Добавляем ответ от аватара
    const avatarResponse = {
      from: 'avatar',
      text: response,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    messages.value.push(avatarResponse);
    emit('avatar-response', avatarResponse);
    
    // Прокручиваем чат вниз
    scrollToBottom();
  }, 1000 + Math.random() * 1000);
};

// Временная функция для симуляции ответов аватара
const getAIResponse = (message) => {
  const lowercaseMsg = message.toLowerCase();
  
  if (lowercaseMsg.includes('привет') || lowercaseMsg.includes('здравствуй')) {
    return 'Привет! Рад видеть тебя снова. Как я могу помочь?';
  }
  else if (lowercaseMsg.includes('как дела') || lowercaseMsg.includes('как ты')) {
    return 'У меня всё отлично! Я постоянно обучаюсь новому. А как твои дела?';
  }
  else if (lowercaseMsg.includes('погода')) {
    return 'Я пока не могу узнать погоду в реальном времени, но в будущем это будет возможно!';
  }
  else if (lowercaseMsg.includes('умеешь') || lowercaseMsg.includes('можешь')) {
    return 'Я могу поддержать разговор, помогать с задачами, давать рекомендации и многое другое. Мои возможности будут расширяться со временем!';
  }
  else if (lowercaseMsg.includes('кто ты') || lowercaseMsg.includes('что ты такое')) {
    return `Я ${props.avatarName}, твой персональный AI-аватар. Я создан, чтобы помогать тебе в различных задачах и быть твоим цифровым компаньоном.`;
  }
  else {
    const responses = [
      'Интересная мысль! Давай обсудим это подробнее.',
      'Я понимаю, о чём ты говоришь. Хочешь узнать об этом больше?',
      'Это хороший вопрос. В будущих обновлениях я смогу отвечать на него более детально.',
      'Я обрабатываю твой запрос. В полной версии я смогу дать более развёрнутый ответ.',
      'Спасибо за сообщение! Я постоянно учусь и скоро буду более полезным.'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
};

// Прокручиваем чат вниз при загрузке компонента
onMounted(() => {
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