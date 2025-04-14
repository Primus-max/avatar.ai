<template>
  <v-card class="create-post">
    <v-card-text>
      <div class="post-header">
        <v-avatar size="40" class="mr-2">
          <v-img :src="userAvatar" />
        </v-avatar>
        <v-textarea
          v-model="postContent"
          variant="outlined"
          placeholder="Что у вас на уме?"
          rows="3"
          hide-details
          auto-grow
        ></v-textarea>
      </div>

      <!-- Предпросмотр медиа -->
      <div v-if="mediaPreview" class="media-preview mt-4">
        <v-img
          v-if="mediaType === 'image'"
          :src="mediaPreview"
          height="200"
          cover
          class="rounded-lg"
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-close"
              variant="text"
              @click="clearMedia"
            ></v-btn>
          </template>
        </v-img>
      </div>

      <!-- Действия -->
      <div class="post-actions mt-4">
        <v-btn
          variant="text"
          prepend-icon="mdi-image"
          @click="addImage"
        >
          Фото
        </v-btn>
        <v-btn
          variant="text"
          prepend-icon="mdi-video"
          @click="addVideo"
        >
          Видео
        </v-btn>
        <v-btn
          variant="text"
          prepend-icon="mdi-emoticon-outline"
          @click="addEmoji"
        >
          Эмодзи
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          :disabled="!canPost"
          @click="createPost"
        >
          Опубликовать
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue';

const userAvatar = ref('https://randomuser.me/api/portraits/men/78.jpg')
const postContent = ref('')
const mediaPreview = ref(null)
const mediaType = ref(null)

const canPost = computed(() => {
  return postContent.value.trim().length > 0 || mediaPreview.value
})

const addImage = () => {
  // Логика добавления изображения
  mediaType.value = 'image'
  mediaPreview.value = 'https://source.unsplash.com/random/800x600'
}

const addVideo = () => {
  // Логика добавления видео
  mediaType.value = 'video'
  mediaPreview.value = 'https://example.com/video.mp4'
}

const addEmoji = () => {
  // Логика добавления эмодзи
}

const clearMedia = () => {
  mediaPreview.value = null
  mediaType.value = null
}

const createPost = () => {
  if (!canPost.value) return

  const post = {
    id: Date.now(),
    author: {
      name: 'Вы',
      avatar: userAvatar.value
    },
    content: postContent.value,
    image: mediaType.value === 'image' ? mediaPreview.value : null,
    video: mediaType.value === 'video' ? mediaPreview.value : null,
    date: 'Только что',
    likes: 0,
    comments: 0,
    commentsList: []
  }

  // Эмитим событие с новым постом
  emit('post-created', post)

  // Очищаем форму
  postContent.value = ''
  clearMedia()
}

const emit = defineEmits(['post-created'])
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.create-post {
  margin-bottom: $spacing-md;
  background-color: $surface;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-sm;
}

.post-header {
  display: flex;
  align-items: flex-start;
}

.media-preview {
  position: relative;

  .v-img {
    position: relative;
  }

  .v-btn {
    position: absolute;
    top: $spacing-sm;
    right: $spacing-sm;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
}

.post-actions {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  border-top: 1px solid $border;
  padding-top: $spacing-md;
}
</style> 