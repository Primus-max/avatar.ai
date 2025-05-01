/**
 * Сервис для управления памятью аватара
 * Хранит информацию о пользователе, предпочтениях и историю разговоров
 */
export default class AvatarMemory {
  constructor(avatarName, userName) {
    this.avatarName = avatarName || 'Neo';
    this.userName = userName || 'Vladimir';
    this.storageKey = `avatar_memory_${this.avatarName}`;
    this.memoryData = this.load() || this.getInitialMemory();
  }
  
  /**
   * Создает начальную структуру памяти
   */
  getInitialMemory() {
    return {
      personalInfo: {
        avatarName: this.avatarName,
        createdAt: new Date().toISOString()
      },
      userInfo: {},
      conversations: [],
      facts: [],
      preferences: {},
      lastInteraction: null
    };
  }
  
  /**
   * Загружает данные памяти из localStorage
   */
  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Ошибка при загрузке памяти аватара:', error);
      return null;
    }
  }
  
  /**
   * Сохраняет данные памяти в localStorage
   */
  save() {
    try {
      this.memoryData.lastInteraction = new Date().toISOString();
      localStorage.setItem(this.storageKey, JSON.stringify(this.memoryData));
      return true;
    } catch (error) {
      console.error('Ошибка при сохранении памяти аватара:', error);
      return false;
    }
  }
  
  /**
   * Обновляет информацию об аватаре
   */
  updateAvatarInfo(info) {
    this.memoryData.personalInfo = {
      ...this.memoryData.personalInfo,
      ...info
    };
    this.save();
  }
  
  /**
   * Обновляет информацию о пользователе
   */
  updateUserInfo(info) {
    this.memoryData.userInfo = {
      ...this.memoryData.userInfo,
      ...info
    };
    this.save();
  }
  
  /**
   * Добавляет новый факт о пользователе
   */
  addFact(fact) {
    if (!fact) return;
    
    this.memoryData.facts.push({
      content: fact,
      timestamp: new Date().toISOString()
    });
    
    // Ограничиваем количество хранимых фактов
    if (this.memoryData.facts.length > 50) {
      this.memoryData.facts.shift();
    }
    
    this.save();
  }
  
  /**
   * Сохраняет важные сообщения из диалога
   */
  saveConversation(userMessage, avatarResponse) {
    if (!userMessage || !avatarResponse) return;
    
    this.memoryData.conversations.push({
      user: userMessage,
      avatar: avatarResponse,
      timestamp: new Date().toISOString()
    });
    
    // Ограничиваем количество хранимых сообщений
    if (this.memoryData.conversations.length > 20) {
      this.memoryData.conversations.shift();
    }
    
    this.save();
  }
  
  /**
   * Обновляет предпочтения пользователя
   */
  updatePreferences(preferences) {
    this.memoryData.preferences = {
      ...this.memoryData.preferences,
      ...preferences
    };
    this.save();
  }
  
  /**
   * Извлекает важную информацию из сообщения пользователя
   * для автоматического обновления памяти
   */
  extractInfoFromMessage(message) {
    // Здесь можно реализовать простую NLP логику
    // для извлечения информации из текста
    
    // Пример: извлечение имени
    const nameMatch = message.match(/меня зовут ([А-Яа-яA-Za-z]+)/i);
    if (nameMatch && nameMatch[1]) {
      this.updateUserInfo({ name: nameMatch[1] });
    }
    
    // Пример: извлечение возраста
    const ageMatch = message.match(/мне (\d+)/i);
    if (ageMatch && ageMatch[1]) {
      this.updateUserInfo({ age: parseInt(ageMatch[1]) });
    }
    
    // Пример: извлечение интересов
    const interestsMatches = [
      /я (люблю|обожаю|нравится) ([^,.!?]+)/i,
      /мое хобби ([^,.!?]+)/i,
      /я увлекаюсь ([^,.!?]+)/i
    ];
    
    for (const pattern of interestsMatches) {
      const match = message.match(pattern);
      if (match && match[match.length - 1]) {
        const interest = match[match.length - 1].trim();
        this.addFact(`Интересуется: ${interest}`);
        break;
      }
    }
  }
  
  /**
   * Получает данные памяти для формирования промпта
   */
  getMemoryPrompt() {
    const { personalInfo, userInfo, facts, conversations, preferences } = this.memoryData;
    
    let prompt = `## Информация об аватаре\n`;
    prompt += `Ты персональный AI-аватар по имени ${personalInfo.avatarName}.\n`;
    prompt += `Ты общаешься с пользователем по имени ${this.userName}.\n`;
    
    if (personalInfo.role) {
      prompt += `Твоя роль: ${personalInfo.role}\n`;
    }
    
    if (Object.keys(userInfo).length > 0) {
      prompt += `\n## Информация о пользователе\n`;
      
      if (userInfo.name) {
        prompt += `- Имя пользователя: ${userInfo.name}\n`;
      }
      
      Object.entries(userInfo)
        .filter(([key]) => key !== 'name')
        .forEach(([key, value]) => {
          prompt += `- ${key}: ${value}\n`;
        });
    }
    
    if (facts.length > 0) {
      prompt += `\n## Факты о пользователе\n`;
      facts.slice(-5).forEach(fact => {
        prompt += `- ${fact.content}\n`;
      });
    }
    
    if (Object.keys(preferences).length > 0) {
      prompt += `\n## Предпочтения пользователя\n`;
      Object.entries(preferences).forEach(([key, value]) => {
        prompt += `- ${key}: ${value}\n`;
      });
    }
    
    if (conversations.length > 0) {
      prompt += `\n## Важные моменты из предыдущих бесед\n`;
      conversations.slice(-3).forEach(conv => {
        prompt += `- Пользователь сказал: "${conv.user}"\n`;
        prompt += `  Ты ответил: "${conv.avatar}"\n`;
      });
    }
    
    return prompt;
  }
  
  /**
   * Очищает память аватара
   */
  clearMemory() {
    this.memoryData = this.getInitialMemory();
    this.save();
  }
} 