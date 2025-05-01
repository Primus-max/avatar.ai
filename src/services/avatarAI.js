/**
 * Сервис для взаимодействия с Ollama API
 * Обеспечивает генерацию ответов с учетом контекста
 */
import axios from 'axios';

export default class AvatarAI {
  constructor(avatarMemory, config = {}) {
    this.memory = avatarMemory;
    this.config = {
      modelName: config.modelName || 'gemma2:2b',
      apiUrl: config.apiUrl || 'http://localhost:11434/api/chat',
      fallbackMode: config.fallbackMode || true,
      debugMode: config.debugMode || false,
      ...config
    };
    
    this.conversationHistory = [];
    this.maxContextLength = 10; // Максимальное количество сообщений в контексте
  }
  
  /**
   * Формирует системный промпт с инструкциями и памятью
   */
  getSystemPrompt() {
    const memoryPrompt = this.memory.getMemoryPrompt();
    
    let prompt = `${memoryPrompt}\n\n`;
    prompt += `## Инструкции\n`;
    prompt += `- Отвечай кратко и по делу\n`;
    prompt += `- Если не уверен в ответе, так и скажи\n`;
    prompt += `- Обращайся к пользователю по имени, если знаешь его\n`;
    prompt += `- Проявляй индивидуальность и характер\n`;
    prompt += `- Используй предыдущий контекст разговора\n`;
    
    return prompt;
  }
  
  /**
   * Очищает историю сообщений (но не память)
   */
  clearConversation() {
    this.conversationHistory = [];
  }
  
  /**
   * Добавляет сообщение в историю
   */
  addToConversationHistory(role, content) {
    this.conversationHistory.push({ role, content });
    
    // Ограничиваем максимальный размер контекста
    if (this.conversationHistory.length > this.maxContextLength) {
      this.conversationHistory.shift();
    }
  }
  
  /**
   * Генерирует ответ для имитации (fallback режим)
   */
  getFallbackResponse(message) {
    const lowercaseMsg = message.toLowerCase();
    
    // Простой сопоставитель ключевых слов для имитации
    if (lowercaseMsg.includes('привет') || lowercaseMsg.includes('здравствуй')) {
      const userName = this.memory.memoryData.userInfo.name;
      const greeting = userName ? `Привет, ${userName}!` : 'Привет!';
      return `${greeting} Рад снова видеть тебя. Как я могу помочь сегодня?`;
    }
    
    if (lowercaseMsg.includes('как дела') || lowercaseMsg.includes('как ты')) {
      return 'У меня всё отлично! Я продолжаю обучаться и становиться лучше. А как твои дела?';
    }
    
    if (lowercaseMsg.includes('что ты умеешь') || lowercaseMsg.includes('что ты можешь')) {
      return 'Я могу поддержать разговор, отвечать на вопросы, помогать с задачами и быть твоим виртуальным компаньоном. Моя память также позволяет мне запоминать информацию о тебе и наших разговорах.';
    }
    
    if (lowercaseMsg.includes('спасибо') || lowercaseMsg.includes('благодар')) {
      return 'Всегда рад помочь! Если будут еще вопросы, обращайся.';
    }
    
    // Проверяем, спрашивает ли пользователь о его имени
    if (lowercaseMsg.includes('как меня зовут') || lowercaseMsg.includes('помнишь мое имя')) {
      const userName = this.memory.memoryData.userInfo.name;
      if (userName) {
        return `Конечно, тебя зовут ${userName}!`;
      } else {
        return 'Кажется, мы еще не знакомы. Как тебя зовут?';
      }
    }
    
    // Если не нашли соответствия, используем общие ответы
    const genericResponses = [
      'Интересная мысль! Расскажи подробнее.',
      'Понимаю, о чем ты говоришь. Что еще тебя интересует?',
      'Это хороший вопрос. Давай обсудим это подробнее.',
      'Я обрабатываю твой запрос. В полной версии я смогу дать более детальный ответ.',
      'Спасибо за сообщение! Я постоянно учусь и развиваюсь.'
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  }
  
  /**
   * Отправляет запрос к Ollama API и получает ответ
   */
  async sendMessage(message, useMemory = true) {
    if (!message || typeof message !== 'string') {
      throw new Error('Сообщение должно быть строкой');
    }
    
    try {
      // Обновляем память на основе сообщения
      if (useMemory) {
        this.memory.extractInfoFromMessage(message);
      }
      
      // Добавляем сообщение пользователя в историю
      this.addToConversationHistory('user', message);
      
      // Проверяем подключение к Ollama
      let response;
      
      try {
        // Формируем полный контекст с историей
        const systemPrompt = this.getSystemPrompt();
        
        const messages = [
          { role: 'system', content: systemPrompt },
          ...this.conversationHistory
        ];
        
        if (this.config.debugMode) {
          console.log('Отправка запроса к Ollama:', {
            model: this.config.modelName,
            messages
          });
        }
        
        // Отправляем запрос к Ollama API
        const apiResponse = await axios.post(
          this.config.apiUrl,
          {
            model: this.config.modelName,
            messages,
            stream: false
          },
          { timeout: 60000 } // 60 секунд таймаут
        );
        
        response = apiResponse.data.message.content;
      } catch (error) {
        console.error('Ошибка при обращении к Ollama:', error);
        
        if (!this.config.fallbackMode) {
          throw error;
        }
        
        // Используем режим имитации, если не удалось подключиться к Ollama
        console.log('Переключение в режим имитации...');
        response = this.getFallbackResponse(message);
      }
      
      // Добавляем ответ в историю
      this.addToConversationHistory('assistant', response);
      
      // Сохраняем важные части диалога в долговременную память
      if (useMemory) {
        this.memory.saveConversation(message, response);
      }
      
      return response;
    } catch (error) {
      console.error('Ошибка в avatarAI.sendMessage:', error);
      return 'Извини, произошла ошибка при обработке твоего сообщения. Пожалуйста, попробуй еще раз.';
    }
  }
} 