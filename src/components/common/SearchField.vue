<template>
  <div class="search-bar" @click.stop>
    <v-icon icon="mdi-magnify" class="search-icon" />
    <input 
      type="text" 
      :placeholder="placeholder" 
      v-model="searchValue"
      @focus="isSearchFocused = true"
      @blur="isSearchFocused = false"
      @click.stop
      @input="handleInput"
      @keyup.enter="handleEnter"
    >
    <div class="search-glow" :class="{ active: isSearchFocused }"></div>
  </div>
</template>

<script setup>
import {
  ref,
  watch,
} from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Поиск...'
  }
});

const emit = defineEmits(['update:modelValue', 'search']);

const searchValue = ref(props.modelValue);
const isSearchFocused = ref(false);

watch(() => props.modelValue, (newValue) => {
  searchValue.value = newValue;
});

const handleInput = () => {
  emit('update:modelValue', searchValue.value);
};

const handleEnter = () => {
  emit('search', searchValue.value);
};
</script>

<style lang="scss" scoped>
.search-bar {
  position: relative;
  width: 100%;

  .search-icon {
    position: absolute;
    left: $spacing-md;
    top: 50%;
    transform: translateY(-50%);
    color: $text-secondary;
    pointer-events: none;
    z-index: 1;
    transition: all $transition-normal;
  }

  input {
    width: 100%;
    height: $input-height;
    padding: 0 $spacing-md 0 ($spacing-md * 2 + 24px);
    background: rgba($surface, 0.3);
    border: 1px solid rgba($primary, 0.3);
    border-radius: $border-radius-full;
    color: $text-primary;
    font-size: $font-size-sm;
    transition: all $transition-normal;
    position: relative;
    z-index: 1;

    &::placeholder {
      color: $text-secondary;
    }

    &:focus {
      background: rgba($surface-light, 0.3);
      border-color: rgba($primary, 0.7);
      outline: none;
      
      & + .search-glow {
        box-shadow: 0 0 20px rgba($primary, 0.4);
      }
      
      & ~ .search-icon {
        color: $primary;
        filter: drop-shadow(0 0 5px rgba($primary, 0.6));
      }
    }
  }

  .search-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: $border-radius-full;
    box-shadow: 0 0 0 rgba($primary, 0);
    transition: all $transition-normal;
    pointer-events: none;
    
    &.active {
      box-shadow: 0 0 20px rgba($primary, 0.4);
    }
  }
  
  &:hover .search-icon {
    color: $text-primary;
  }
}
</style> 