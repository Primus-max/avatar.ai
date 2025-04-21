<template>
  <div class="create-post-button">
    <v-btn
      color="primary"
      class="create-btn"
      @click="showModal = true"
      elevation="2"
    >
      <v-icon>mdi-plus</v-icon>
      <span class="d-none d-sm-inline">Создать пост</span>
    </v-btn>

    <v-dialog
      v-model="showModal"
      max-width="500"
      scrollable
      :fullscreen="$vuetify.display.mobile"
    >
      <v-card>
        <v-toolbar color="primary" class="modal-header">
          <v-btn icon @click="showModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Создать пост</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            variant="text"
            :disabled="!isValid"
            @click="createPost"
          >
            Опубликовать
          </v-btn>
        </v-toolbar>

        <v-card-text class="modal-content">
          <v-textarea
            v-model="postText"
            placeholder="О чем вы хотите рассказать?"
            rows="4"
            auto-grow
            hide-details
            class="mb-4"
          ></v-textarea>

          <v-file-input
            v-model="mediaFiles"
            placeholder="Добавить фото"
            prepend-icon="mdi-camera"
            accept="image/*"
            multiple
            hide-details
            class="mb-4"
            @change="handleFileUpload"
          ></v-file-input>

          <div v-if="mediaPreview.length" class="media-preview">
            <div v-for="(preview, index) in mediaPreview" :key="index" class="preview-item">
              <img :src="preview" alt="Preview">
              <v-btn
                icon="mdi-close"
                size="small"
                class="remove-btn"
                @click="removeMedia(index)"
              ></v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue';

import { usePostsStore } from '@/stores/posts';

const postsStore = usePostsStore()
const showModal = ref(false)
const postText = ref('')
const mediaFiles = ref([])
const mediaPreview = ref([])

const isValid = computed(() => {
  return postText.value.trim().length > 0 || mediaFiles.value.length > 0
})

const handleFileUpload = (files) => {
  if (!files) {
    mediaPreview.value = []
    return
  }

  mediaPreview.value = []
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      mediaPreview.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const removeMedia = (index) => {
  mediaFiles.value = mediaFiles.value.filter((_, i) => i !== index)
  mediaPreview.value = mediaPreview.value.filter((_, i) => i !== index)
}

const createPost = async () => {
  try {
    const newPost = {
      id: Date.now(),
      author: {
        name: 'Текущий пользователь',
        avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp'
      },
      content: postText.value,
      images: mediaPreview.value,
      time: 'Только что',
      likes: 0,
      comments: []
    }

    await postsStore.addPost(newPost)
    
    // Сброс формы
    postText.value = ''
    mediaFiles.value = []
    mediaPreview.value = []
    showModal.value = false
  } catch (error) {
    console.error('Ошибка при создании поста:', error)
  }
}
</script>

<style lang="scss" scoped>
.create-post-button {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 100;

  .create-btn {
    min-width: 48px;
    height: 48px;
    border-radius: 24px;
  }
}

.modal-content {
  padding: 16px;

  .media-preview {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 8px;
    margin-top: 16px;

    .preview-item {
      position: relative;
      aspect-ratio: 1;
      border-radius: 8px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .remove-btn {
        position: absolute;
        top: 4px;
        right: 4px;
        background: rgba(0, 0, 0, 0.5) !important;
        color: white;
      }
    }
  }
}

@media (max-width: 600px) {
  .create-post-button {
    bottom: 72px;
    right: 16px;

    .create-btn {
      width: 48px;
      padding: 0;
    }
  }

  .modal-content {
    .media-preview {
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    }
  }
}
</style> 