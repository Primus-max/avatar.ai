<template>
  <div class="community">
    <div class="community-header">
      <div class="header-content">
        <h1>Сообщество</h1>
        <p class="subtitle">Присоединяйтесь к сообществу и общайтесь с другими пользователями</p>
      </div>
      <div class="header-particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
      </div>
    </div>

    <div class="community-content">
      <div class="community-sidebar">
        <div class="search-box">
          <v-text-field
            v-model="searchQuery"
            placeholder="Поиск..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            hide-details
          />
        </div>

        <div class="filters">
          <h3>Фильтры</h3>
          <div class="filter-group">
            <div 
              v-for="(filter, index) in filters" 
              :key="index"
              class="filter-item"
              :class="{ active: activeFilter === filter.id }"
              @click="activeFilter = filter.id"
            >
              <v-icon>{{ filter.icon }}</v-icon>
              <span>{{ filter.title }}</span>
            </div>
          </div>
        </div>

        <div class="trending-topics">
          <h3>Популярные темы</h3>
          <div class="topics-list">
            <div 
              v-for="(topic, index) in trendingTopics" 
              :key="index"
              class="topic-item"
            >
              <span class="topic-name">{{ topic.name }}</span>
              <span class="topic-count">{{ topic.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="community-main">
        <div class="feed-container">
          <div class="feed-header">
            <h2>Лента активности</h2>
            <div class="feed-actions">
              <v-btn
                class="create-post-btn"
                prepend-icon="mdi-plus"
                @click="createPost"
              >
                <span class="btn-text">Создать пост</span>
                <span class="btn-glow"></span>
              </v-btn>
            </div>
          </div>

          <div class="feed">
            <div 
              v-for="(post, index) in filteredPosts" 
              :key="index"
              class="post-card"
            >
              <div class="post-header">
                <div class="post-author">
                  <img :src="post.author.avatar" :alt="post.author.name">
                  <div class="author-info">
                    <h4>{{ post.author.name }}</h4>
                    <p class="post-time">{{ post.time }}</p>
                  </div>
                </div>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon="mdi-dots-vertical"
                      variant="text"
                      v-bind="props"
                    />
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(action, actionIndex) in postActions"
                      :key="actionIndex"
                      :prepend-icon="action.icon"
                      :title="action.title"
                      @click="handlePostAction(action.id, post)"
                    />
                  </v-list>
                </v-menu>
              </div>

              <div class="post-content">
                <p>{{ post.content }}</p>
                <img 
                  v-if="post.image" 
                  :src="post.image" 
                  :alt="post.content"
                  class="post-image"
                >
              </div>

              <div class="post-actions">
                <v-btn
                  variant="text"
                  :icon="post.liked ? 'mdi-heart' : 'mdi-heart-outline'"
                  :color="post.liked ? 'error' : ''"
                  @click="toggleLike(post)"
                />
                <v-btn
                  variant="text"
                  icon="mdi-comment-outline"
                  @click="commentPost(post)"
                />
                <v-btn
                  variant="text"
                  icon="mdi-share-variant"
                  @click="sharePost(post)"
                />
              </div>

              <div class="post-comments" v-if="post.comments.length">
                <div 
                  v-for="(comment, commentIndex) in post.comments" 
                  :key="commentIndex"
                  class="comment"
                >
                  <img :src="comment.author.avatar" :alt="comment.author.name">
                  <div class="comment-content">
                    <div class="comment-header">
                      <span class="comment-author">{{ comment.author.name }}</span>
                      <span class="comment-time">{{ comment.time }}</span>
                    </div>
                    <p>{{ comment.content }}</p>
                  </div>
                </div>
              </div>

              <div class="post-comment-input">
                <v-text-field
                  v-model="post.newComment"
                  placeholder="Написать комментарий..."
                  variant="outlined"
                  density="compact"
                  hide-details
                  @keyup.enter="addComment(post)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue';

const searchQuery = ref('');
const activeFilter = ref('all');

const filters = [
  { id: 'all', title: 'Все', icon: 'mdi-view-dashboard' },
  { id: 'popular', title: 'Популярные', icon: 'mdi-fire' },
  { id: 'following', title: 'Подписки', icon: 'mdi-account-group' },
  { id: 'trending', title: 'В тренде', icon: 'mdi-trending-up' }
];

const trendingTopics = [
  { name: '#AI', count: '1.2k' },
  { name: '#Искусство', count: '856' },
  { name: '#Технологии', count: '723' },
  { name: '#Творчество', count: '512' },
  { name: '#Разработка', count: '489' }
];

const posts = ref([
  {
    id: 1,
    author: {
      name: 'Neo',
      avatar: 'https://via.placeholder.com/50'
    },
    time: '2 часа назад',
    content: 'Только что создал нового аватара с улучшенными возможностями ИИ!',
    image: 'https://via.placeholder.com/600x400',
    liked: false,
    comments: [
      {
        author: {
          name: 'Luna',
          avatar: 'https://via.placeholder.com/50'
        },
        time: '1 час назад',
        content: 'Выглядит потрясающе! Какие новые возможности добавил?'
      }
    ],
    newComment: ''
  },
  {
    id: 2,
    author: {
      name: 'Luna',
      avatar: 'https://via.placeholder.com/50'
    },
    time: '5 часов назад',
    content: 'Поделюсь своим новым художественным проектом, созданным с помощью моего аватара',
    image: 'https://via.placeholder.com/600x400',
    liked: true,
    comments: [],
    newComment: ''
  }
]);

const postActions = [
  { id: 'save', title: 'Сохранить', icon: 'mdi-bookmark-outline' },
  { id: 'report', title: 'Пожаловаться', icon: 'mdi-flag-outline' },
  { id: 'share', title: 'Поделиться', icon: 'mdi-share-variant' }
];

const filteredPosts = computed(() => {
  let result = posts.value;

  if (searchQuery.value) {
    result = result.filter(post => 
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  switch (activeFilter.value) {
    case 'popular':
      result = result.sort((a, b) => b.comments.length - a.comments.length);
      break;
    case 'following':
      // Здесь будет логика фильтрации по подпискам
      break;
    case 'trending':
      result = result.sort((a, b) => b.liked - a.liked);
      break;
  }

  return result;
});

const createPost = () => {
  // Логика создания поста
  console.log('Создание поста...');
};

const toggleLike = (post) => {
  post.liked = !post.liked;
};

const commentPost = (post) => {
  // Логика комментирования поста
  console.log('Комментирование поста...', post);
};

const sharePost = (post) => {
  // Логика шаринга поста
  console.log('Шаринг поста...', post);
};

const addComment = (post) => {
  if (post.newComment.trim()) {
    post.comments.push({
      author: {
        name: 'Current User',
        avatar: 'https://via.placeholder.com/50'
      },
      time: 'Только что',
      content: post.newComment
    });
    post.newComment = '';
  }
};

const handlePostAction = (actionId, post) => {
  switch (actionId) {
    case 'save':
      console.log('Сохранение поста...', post);
      break;
    case 'report':
      console.log('Жалоба на пост...', post);
      break;
    case 'share':
      console.log('Шаринг поста...', post);
      break;
  }
};
</script>

<style lang="scss" scoped>
.community {
  min-height: 100vh;
  color: $text-primary;
  background: $background;
}

.community-header {
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
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    z-index: 1;
  }
  
  .header-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    
    h1 {
      font-size: $font-size-5xl;
      font-weight: $font-weight-bold;
      margin-bottom: $spacing-sm;
      text-shadow: 0 0 20px rgba($primary-dark, 0.5);
      position: relative;
      display: inline-block;
      
      &:before, &:after {
        content: '';
        position: absolute;
        height: 2px;
        width: 60px;
        background: rgba(255, 255, 255, 0.8);
        top: 50%;
        transform: translateY(-50%);
      }
      
      &:before {
        left: -80px;
      }
      
      &:after {
        right: -80px;
      }
    }
    
    .subtitle {
      font-size: $font-size-lg;
      font-weight: $font-weight-medium;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
      position: relative;
      
      &:before {
        content: '';
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
      }
    }
  }
  
  .header-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
    
    .particle {
      position: absolute;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
      opacity: 0;
      animation: float 15s infinite linear;
      
      @for $i from 1 through 30 {
        &:nth-child(#{$i}) {
          top: random(100) * 1%;
          left: random(100) * 1%;
          animation-delay: random(15) * 0.5s;
          animation-duration: (5 + random(10)) * 1s;
          opacity: random(10) * 0.1;
          transform: scale(random(3) * 0.4);
        }
      }
    }
  }
}

.community-content {
  display: flex;
  gap: $spacing-xl;
  max-width: $container-max-width;
  margin: 0 auto;
  padding: 0 $container-padding;
}

.community-sidebar {
  width: 320px;
  position: sticky;
  top: $nav-height + $spacing-md;
  
  .search-box {
    margin-bottom: $spacing-md;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba($primary, 0.5), transparent);
    }
    
    .v-text-field {
      background: rgba($surface, 0.3);
      border: 1px solid rgba($primary, 0.2);
      border-radius: $border-radius-full;
      transition: all $transition-normal;
      overflow: hidden;
      
      &:focus-within {
        background: rgba($surface-light, 0.3);
        border-color: rgba($primary, 0.5);
        box-shadow: 0 0 15px rgba($primary, 0.3);
      }
      
      .v-field__input {
        color: $text-primary;
      }
      
      .v-field__prepend-inner {
        color: $text-secondary;
      }
    }
  }

  .filters {
    background: rgba($surface, 0.3);
    border-radius: $border-radius-lg;
    padding: $spacing-lg;
    margin-bottom: $spacing-md;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba($primary, 0.2);
    box-shadow: 0 0 20px rgba($primary, 0.1);
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba($primary, 0.05), rgba($accent, 0.05));
      z-index: -1;
    }
    
    h3 {
      color: $text-primary;
      margin-bottom: $spacing-md;
      font-weight: $font-weight-semibold;
      position: relative;
      display: inline-block;
      
      &:after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 50%;
        height: 2px;
        background: linear-gradient(90deg, $primary, transparent);
      }
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: $spacing-sm;

      .filter-item {
        display: flex;
        align-items: center;
        padding: $spacing-sm $spacing-md;
        border-radius: $border-radius-md;
        cursor: pointer;
        transition: all $transition-normal;
        position: relative;
        
        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(to bottom, $primary, rgba($primary, 0));
          opacity: 0;
          transition: opacity $transition-normal;
        }

        .v-icon {
          margin-right: $spacing-md;
          color: $text-secondary;
          transition: all $transition-normal;
        }

        span {
          font-weight: $font-weight-medium;
          color: $text-secondary;
          transition: all $transition-normal;
        }

        &:hover {
          background: rgba($primary, 0.1);
          
          &:before {
            opacity: 0.5;
          }
          
          .v-icon, span {
            color: $text-primary;
          }
        }

        &.active {
          background: rgba($primary, 0.15);
          box-shadow: 0 0 10px rgba($primary, 0.2);
          
          &:before {
            opacity: 1;
          }
          
          .v-icon, span {
            color: $primary;
            text-shadow: 0 0 5px rgba($primary, 0.5);
          }
        }
      }
    }
  }

  .trending-topics {
    background: rgba($surface, 0.3);
    border-radius: $border-radius-lg;
    padding: $spacing-lg;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba($primary, 0.2);
    box-shadow: 0 0 20px rgba($primary, 0.1);
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba($accent, 0.05), rgba($primary, 0.05));
      z-index: -1;
    }
    
    h3 {
      color: $text-primary;
      margin-bottom: $spacing-md;
      font-weight: $font-weight-semibold;
      position: relative;
      display: inline-block;
      
      &:after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 50%;
        height: 2px;
        background: linear-gradient(90deg, $accent, transparent);
      }
    }

    .topics-list {
      display: flex;
      flex-direction: column;
      gap: $spacing-sm;

      .topic-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: $spacing-sm $spacing-md;
        border-radius: $border-radius-md;
        cursor: pointer;
        transition: all $transition-normal;
        background: rgba($surface, 0.3);
        border-left: 1px solid rgba($accent, 0.3);
        border-bottom: 1px solid rgba($accent, 0.1);
        
        &:hover {
          background: rgba($accent, 0.1);
          transform: translateX(3px);
          box-shadow: -3px 0 10px rgba($accent, 0.2);
        }

        .topic-name {
          color: $primary;
          font-weight: $font-weight-medium;
          transition: all $transition-normal;
          position: relative;
          
          &:before {
            content: '#';
            color: $accent;
            margin-right: 2px;
            opacity: 0.7;
          }
        }

        .topic-count {
          color: $text-secondary;
          font-size: $font-size-sm;
          background: rgba($surface-dark, 0.5);
          padding: 2px 8px;
          border-radius: $border-radius-full;
          transition: all $transition-normal;
        }
        
        &:hover {
          .topic-name {
            text-shadow: 0 0 5px rgba($primary, 0.5);
          }
          
          .topic-count {
            background: rgba($accent, 0.2);
            color: $text-primary;
          }
        }
      }
    }
  }
}

.community-main {
  flex: 1;
  
  .feed-container {
    max-width: 800px;
    margin: 0 auto;
  
    .feed-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $spacing-lg;
      
      h2 {
        color: $text-primary;
        font-weight: $font-weight-bold;
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
      
      .feed-actions {
        .create-post-btn {
          position: relative;
          padding: $spacing-sm $spacing-lg;
          background: linear-gradient(135deg, rgba($primary, 0.2), rgba($accent, 0.2));
          border: 1px solid rgba($primary, 0.5);
          color: white;
          font-weight: $font-weight-semibold;
          overflow: hidden;
          transition: all $transition-normal;
          box-shadow: 0 0 15px rgba($primary, 0.2);
          
          &:hover {
            background: linear-gradient(135deg, rgba($primary, 0.3), rgba($accent, 0.3));
            box-shadow: 0 0 20px rgba($primary, 0.4);
            transform: translateY(-2px);
            
            .btn-glow {
              opacity: 1;
              animation: rotateBtnGlow 2s infinite;
            }
          }
          
          .v-icon {
            color: $primary;
            filter: drop-shadow(0 0 3px rgba($primary, 0.5));
            margin-right: $spacing-sm;
          }
          
          .btn-text {
            position: relative;
            z-index: 2;
          }
          
          .btn-glow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba($primary, 0) 0%, rgba($primary, 0.2) 50%, rgba($primary, 0) 100%);
            opacity: 0.5;
            z-index: 1;
            transition: opacity $transition-normal;
          }
        }
      }
    }
    
    .feed {
      display: flex;
      flex-direction: column;
      gap: $spacing-lg;
    }
  }
}

.post-card {
  background: rgba($surface, 0.3);
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  position: relative;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 5px 20px rgba($background, 0.5);
  border: 1px solid rgba($primary, 0.2);
  transition: all $transition-normal;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba($primary, 0.05), rgba($accent, 0.05));
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba($background, 0.6), 0 0 15px rgba($primary, 0.2);
    
    &:after {
      opacity: 1;
    }
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, $primary, $accent, transparent);
    opacity: 0;
    transition: opacity $transition-normal;
  }
  
  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-md;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -$spacing-sm;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, rgba($primary, 0.2), transparent);
    }
    
    .post-author {
      display: flex;
      align-items: center;
      gap: $spacing-md;
      
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba($primary, 0.3);
        box-shadow: 0 0 10px rgba($primary, 0.2);
        transition: all $transition-normal;
        
        &:hover {
          box-shadow: 0 0 15px rgba($primary, 0.5);
          transform: scale(1.05);
        }
      }
      
      .author-info {
        display: flex;
        flex-direction: column;
        
        h4 {
          color: $text-primary;
          font-weight: $font-weight-semibold;
          margin-bottom: 2px;
        }
        
        .post-time {
          color: $text-secondary;
          font-size: $font-size-xs;
          display: flex;
          align-items: center;
          
          &:before {
            content: '⦿';
            color: $accent;
            margin-right: 5px;
            font-size: 8px;
          }
        }
      }
    }
  }
  
  .post-content {
    margin-bottom: $spacing-md;
    
    p {
      color: $text-primary;
      margin-bottom: $spacing-md;
      line-height: $line-height-relaxed;
    }
    
    .post-image {
      width: 100%;
      border-radius: $border-radius-md;
      object-fit: cover;
      max-height: 400px;
      transition: all $transition-normal;
      box-shadow: 0 5px 15px rgba($background, 0.5);
      border: 1px solid rgba($primary, 0.2);
      
      &:hover {
        box-shadow: 0 8px 20px rgba($background, 0.6), 0 0 15px rgba($primary, 0.3);
      }
    }
  }
  
  .post-actions {
    display: flex;
    gap: $spacing-md;
    margin-bottom: $spacing-md;
    padding-top: $spacing-sm;
    position: relative;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba($primary, 0.2), transparent);
    }
    
    .v-btn {
      position: relative;
      overflow: hidden;
      
      .v-icon {
        transition: all $transition-normal;
      }
      
      &:hover {
        .v-icon {
          transform: scale(1.2);
        }
        
        &:before {
          opacity: 1;
          width: 35px;
          height: 35px;
        }
      }
      
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba($primary, 0.2) 0%, rgba($primary, 0) 70%);
        border-radius: 50%;
        opacity: 0;
        transition: all $transition-normal;
      }
      
      &[color="error"] {
        &:before {
          background: radial-gradient(circle, rgba($error, 0.2) 0%, rgba($error, 0) 70%);
        }
      }
    }
  }
  
  .post-comments {
    padding: $spacing-md;
    background: rgba($surface-dark, 0.3);
    border-radius: $border-radius-md;
    margin-bottom: $spacing-md;
    
    .comment {
      display: flex;
      gap: $spacing-md;
      margin-bottom: $spacing-md;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      .comment-content {
        flex: 1;
        
        .comment-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2px;
          
          .comment-author {
            font-weight: $font-weight-medium;
            color: $text-primary;
          }
          
          .comment-time {
            font-size: $font-size-xs;
            color: $text-secondary;
          }
        }
        
        p {
          color: $text-secondary;
          font-size: $font-size-sm;
        }
      }
    }
  }
  
  .post-comment-input {
    .v-text-field {
      background: rgba($surface-dark, 0.3);
      border-radius: $border-radius-md;
      transition: all $transition-normal;
      border: 1px solid rgba($primary, 0.1);
      
      &:focus-within {
        background: rgba($surface-light, 0.2);
        border-color: rgba($primary, 0.3);
        box-shadow: 0 0 10px rgba($primary, 0.2);
      }
      
      .v-field__input {
        color: $text-primary;
      }
    }
  }
}

@media (max-width: $breakpoint-md) {
  .community-content {
    flex-direction: column;
    padding: $spacing-md;
  }

  .community-sidebar {
    width: 100%;
  }
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-20px) translateX(10px);
  }
  50% {
    transform: translateY(-10px) translateX(20px);
  }
  75% {
    transform: translateY(10px) translateX(5px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}

@keyframes rotateBtnGlow {
  0% {
    transform: translateX(-100%) rotate(0deg);
  }
  100% {
    transform: translateX(100%) rotate(360deg);
  }
}
</style> 