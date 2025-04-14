<template>
  <div class="community">
    <div class="community-header">
      <div class="header-content">
        <h1>Сообщество</h1>
        <p class="subtitle">Присоединяйтесь к сообществу и общайтесь с другими пользователями</p>
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
                variant="outlined"
                prepend-icon="mdi-plus"
                @click="createPost"
              >
                Создать пост
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
@import '../styles/variables.scss';

.community {
  min-height: 100vh;
  background-color: $background-color;
  color: $text-color;
}

.community-header {
  background: linear-gradient(135deg, $primary-color, $accent-color);
  padding: $spacing-xl;
  color: white;
  margin-bottom: $spacing-lg;

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: $spacing-sm;
  }

  .subtitle {
    opacity: 0.8;
    font-size: 1.1rem;
  }
}

.community-content {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: $spacing-lg;
  padding: 0 $spacing-lg;
}

.community-sidebar {
  width: 300px;
  flex-shrink: 0;

  .search-box {
    margin-bottom: $spacing-lg;
  }

  .filters {
    background-color: $surface-color;
    border-radius: $border-radius-lg;
    padding: $spacing-lg;
    margin-bottom: $spacing-lg;
    box-shadow: $shadow-md;

    h3 {
      font-size: 1.2rem;
      margin-bottom: $spacing-md;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: $spacing-sm;
    }

    .filter-item {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      padding: $spacing-sm;
      border-radius: $border-radius-md;
      cursor: pointer;
      transition: background-color $transition-normal;

      &:hover {
        background-color: $hover-color;
      }

      &.active {
        background-color: rgba($primary-color, 0.1);
        color: $primary-color;
      }

      .v-icon {
        margin-right: $spacing-sm;
      }
    }
  }

  .trending-topics {
    background-color: $surface-color;
    border-radius: $border-radius-lg;
    padding: $spacing-lg;
    box-shadow: $shadow-md;

    h3 {
      font-size: 1.2rem;
      margin-bottom: $spacing-md;
    }

    .topics-list {
      display: flex;
      flex-direction: column;
      gap: $spacing-sm;
    }

    .topic-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacing-sm;
      border-radius: $border-radius-md;
      transition: background-color $transition-normal;

      &:hover {
        background-color: $hover-color;
      }

      .topic-name {
        color: $primary-color;
      }

      .topic-count {
        color: $text-secondary;
        font-size: 0.9rem;
      }
    }
  }
}

.community-main {
  flex-grow: 1;
}

.feed-container {
  .feed-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-lg;

    h2 {
      font-size: 1.8rem;
    }
  }
}

.post-card {
  background-color: $surface-color;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  box-shadow: $shadow-md;

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-md;

    .post-author {
      display: flex;
      align-items: center;
      gap: $spacing-md;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }

      .author-info {
        h4 {
          margin-bottom: $spacing-xs;
        }

        .post-time {
          color: $text-secondary;
          font-size: 0.9rem;
        }
      }
    }
  }

  .post-content {
    margin-bottom: $spacing-md;

    p {
      margin-bottom: $spacing-md;
    }

    .post-image {
      width: 100%;
      border-radius: $border-radius-md;
      margin-top: $spacing-md;
    }
  }

  .post-actions {
    display: flex;
    gap: $spacing-md;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: $spacing-md;
  }

  .post-comments {
    margin-top: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    .comment {
      display: flex;
      gap: $spacing-md;
      margin-bottom: $spacing-md;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .comment-content {
        flex-grow: 1;

        .comment-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: $spacing-xs;

          .comment-author {
            font-weight: 500;
          }

          .comment-time {
            color: $text-secondary;
            font-size: 0.9rem;
          }
        }

        p {
          color: $text-secondary;
        }
      }
    }
  }

  .post-comment-input {
    margin-top: $spacing-md;
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
</style> 