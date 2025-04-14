<template>
  <v-card class="post-card">
    <v-card-text>
      <!-- Заголовок поста -->
      <div class="post-header">
        <v-avatar size="40" class="mr-2">
          <v-img :src="post.author.avatar" />
        </v-avatar>
        <div>
          <div class="text-subtitle-1">{{ post.author.name }}</div>
          <div class="text-caption text-medium-emphasis">
            {{ post.date }}
          </div>
        </div>
        <v-spacer />
        <v-btn
          icon="mdi-dots-vertical"
          variant="text"
        ></v-btn>
      </div>

      <!-- Контент поста -->
      <div class="post-content mt-4">
        <p class="text-body-1">{{ post.content }}</p>
        <v-img
          v-if="post.image"
          :src="post.image"
          class="mt-2 rounded-lg"
          cover
        />
      </div>

      <!-- Действия с постом -->
      <div class="post-actions mt-4">
        <v-btn
          variant="text"
          prepend-icon="mdi-heart-outline"
          @click="likePost"
        >
          {{ post.likes }}
        </v-btn>
        <v-btn
          variant="text"
          prepend-icon="mdi-comment-outline"
          @click="commentPost"
        >
          {{ post.comments }}
        </v-btn>
        <v-btn
          variant="text"
          prepend-icon="mdi-share-variant"
          @click="sharePost"
        >
          Поделиться
        </v-btn>
      </div>

      <!-- Комментарии -->
      <div v-if="showComments" class="post-comments mt-4">
        <div v-for="comment in post.commentsList" :key="comment.id" class="comment">
          <v-avatar size="32" class="mr-2">
            <v-img :src="comment.author.avatar" />
          </v-avatar>
          <div class="comment-content">
            <div class="text-subtitle-2">{{ comment.author.name }}</div>
            <div class="text-body-2">{{ comment.content }}</div>
          </div>
        </div>
        <v-text-field
          v-model="newComment"
          variant="outlined"
          density="compact"
          placeholder="Написать комментарий..."
          hide-details
          class="mt-2"
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-send"
              variant="text"
              :disabled="!newComment"
              @click="addComment"
            ></v-btn>
          </template>
        </v-text-field>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const showComments = ref(false)
const newComment = ref('')

const likePost = () => {
  props.post.likes++
}

const commentPost = () => {
  showComments.value = !showComments.value
}

const sharePost = () => {
  // Логика шаринга
}

const addComment = () => {
  if (!newComment.value) return
  
  props.post.commentsList.push({
    id: Date.now(),
    author: {
      name: 'Вы',
      avatar: 'https://randomuser.me/api/portraits/men/78.jpg'
    },
    content: newComment.value
  })
  
  newComment.value = ''
  props.post.comments++
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.post-card {
  margin-bottom: $spacing-md;
  background-color: $surface;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-sm;
}

.post-header {
  display: flex;
  align-items: center;
}

.post-content {
  .text-body-1 {
    white-space: pre-line;
  }
}

.post-actions {
  display: flex;
  gap: $spacing-md;
  border-top: 1px solid $border;
  padding-top: $spacing-md;
}

.post-comments {
  border-top: 1px solid $border;
  padding-top: $spacing-md;

  .comment {
    display: flex;
    margin-bottom: $spacing-sm;
  }

  .comment-content {
    background-color: $background;
    padding: $spacing-sm;
    border-radius: $border-radius-md;
    flex: 1;
  }
}
</style> 