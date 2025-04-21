<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="600"
    class="create-post-modal"
    :fullscreen="$vuetify.display.mobile"
  >
    <v-card class="modal-card">
      <div class="modal-header">
        <h2>Создать пост</h2>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <div class="modal-content">
        <div class="post-type-selector">
          <button 
            v-for="type in postTypes" 
            :key="type.id"
            class="type-btn"
            :class="{ active: selectedType === type.id }"
            @click="selectedType = type.id"
          >
            <v-icon :icon="type.icon" class="type-icon" />
            <span>{{ type.title }}</span>
          </button>
        </div>

        <div class="post-content">
          <textarea 
            v-model="postText"
            placeholder="Поделитесь своими мыслями..."
            class="post-textarea"
          ></textarea>

          <div class="media-preview" v-if="mediaFiles.length">
            <div 
              v-for="(file, index) in mediaFiles" 
              :key="index"
              class="media-item"
            >
              <img :src="file.preview" alt="Preview">
              <button class="remove-media" @click="removeMedia(index)">
                <v-icon icon="mdi-close" />
              </button>
            </div>
          </div>

          <div class="post-actions">
            <button class="action-btn" @click="triggerFileInput">
              <v-icon icon="mdi-image-plus" />
              <span>Добавить медиа</span>
            </button>
            <input 
              type="file" 
              ref="fileInput"
              multiple
              accept="image/*,video/*"
              @change="handleFiles"
              class="hidden"
            >
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="cancel-btn" @click="close">Отмена</button>
        <button 
          class="publish-btn" 
          :disabled="!canPublish"
          @click="publishPost"
        >
          Опубликовать
        </button>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'post-created'])

const selectedType = ref('text')
const postText = ref('')
const mediaFiles = ref([])
const fileInput = ref(null)

const postTypes = [
  {
    id: 'text',
    title: 'Текст',
    icon: 'mdi-text'
  },
  {
    id: 'media',
    title: 'Медиа',
    icon: 'mdi-image'
  }
]

const canPublish = computed(() => {
  return postText.value.trim().length > 0 || mediaFiles.value.length > 0
})

const close = () => {
  emit('update:modelValue', false)
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFiles = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      mediaFiles.value.push({
        file,
        preview: e.target.result
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeMedia = (index) => {
  mediaFiles.value.splice(index, 1)
}

const publishPost = () => {
  const post = {
    type: selectedType.value,
    content: postText.value,
    media: mediaFiles.value.map(m => m.preview)
  }

  emit('post-created', post)
  
  // Сброс формы
  postText.value = ''
  mediaFiles.value = []
  selectedType.value = 'text'
  close()
}
</script>

<style lang="scss" scoped>
.create-post-modal {
  .modal-card {
    background: $surface;
    border-radius: $border-radius-lg;
    overflow: hidden;
    border: 1px solid rgba($primary, 0.2);
  }

  .modal-header {
    padding: $spacing-lg;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, rgba($background, 0.7), rgba($primary, 0.1));
    border-bottom: 1px solid rgba($primary, 0.2);
    
    h2 {
      color: $text-primary;
      font-size: $font-size-xl;
      font-weight: $font-weight-semibold;
      margin: 0;
    }
  }

  .modal-content {
    padding: $spacing-lg;
    
    .post-type-selector {
      display: flex;
      gap: $spacing-sm;
      margin-bottom: $spacing-lg;
      
      .type-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: $spacing-xs;
        padding: $spacing-sm;
        background: rgba($surface-light, 0.1);
        border: 1px solid rgba($primary, 0.2);
        border-radius: $border-radius-md;
        color: $text-secondary;
        cursor: pointer;
        transition: all $transition-normal;
        
        .type-icon {
          font-size: 20px;
        }
        
        &:hover {
          background: rgba($surface-light, 0.2);
          color: $text-primary;
        }
        
        &.active {
          background: rgba($primary, 0.15);
          border-color: rgba($primary, 0.5);
          color: $primary;
          box-shadow: 0 0 15px rgba($primary, 0.2);
        }
      }
    }

    .post-content {
      .post-textarea {
        width: 100%;
        min-height: 120px;
        padding: $spacing-md;
        background: rgba($surface-light, 0.1);
        border: 1px solid rgba($primary, 0.2);
        border-radius: $border-radius-md;
        color: $text-primary;
        font-size: $font-size-md;
        resize: vertical;
        transition: all $transition-normal;
        
        &:focus {
          outline: none;
          border-color: rgba($primary, 0.5);
          box-shadow: 0 0 15px rgba($primary, 0.2);
        }
        
        &::placeholder {
          color: $text-secondary;
        }
      }

      .media-preview {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: $spacing-sm;
        margin-top: $spacing-md;
        
        .media-item {
          position: relative;
          aspect-ratio: 1;
          border-radius: $border-radius-sm;
          overflow: hidden;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .remove-media {
            position: absolute;
            top: $spacing-xs;
            right: $spacing-xs;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba($error, 0.8);
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            opacity: 0;
            transition: all $transition-normal;
            
            &:hover {
              background: $error;
            }
          }
          
          &:hover .remove-media {
            opacity: 1;
          }
        }
      }

      .post-actions {
        margin-top: $spacing-md;
        
        .action-btn {
          display: flex;
          align-items: center;
          gap: $spacing-xs;
          padding: $spacing-sm $spacing-md;
          background: none;
          border: 1px solid rgba($primary, 0.3);
          border-radius: $border-radius-md;
          color: $text-secondary;
          cursor: pointer;
          transition: all $transition-normal;
          
          &:hover {
            background: rgba($primary, 0.1);
            color: $primary;
            border-color: rgba($primary, 0.5);
          }
        }
        
        .hidden {
          display: none;
        }
      }
    }
  }

  .modal-footer {
    padding: $spacing-md $spacing-lg;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: $spacing-md;
    border-top: 1px solid rgba($primary, 0.2);
    
    .cancel-btn {
      padding: $spacing-sm $spacing-lg;
      background: none;
      border: 1px solid rgba($primary, 0.3);
      border-radius: $border-radius-md;
      color: $text-secondary;
      cursor: pointer;
      transition: all $transition-normal;
      
      &:hover {
        background: rgba($primary, 0.1);
        color: $text-primary;
      }
    }
    
    .publish-btn {
      padding: $spacing-sm $spacing-lg;
      background: linear-gradient(135deg, $primary, $accent);
      border: none;
      border-radius: $border-radius-md;
      color: white;
      font-weight: $font-weight-medium;
      cursor: pointer;
      transition: all $transition-normal;
      
      &:hover {
        box-shadow: 0 0 15px rgba($primary, 0.3);
        transform: translateY(-1px);
      }
      
      &:active {
        transform: translateY(0);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        
        &:hover {
          box-shadow: none;
          transform: none;
        }
      }
    }
  }
}

@media (max-width: $breakpoint-md) {
  .create-post-modal {
    margin: $spacing-sm;

    .modal-header {
      padding: $spacing-md;
    }

    .modal-content {
      padding: $spacing-md;
    }

    .modal-footer {
      padding: $spacing-md;
    }
  }
}
</style> 