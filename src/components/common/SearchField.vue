<template>
  <div class="search-bar" :class="{ 'compact-mode': compact && !isExpanded }" @click.stop>
    <v-icon icon="mdi-magnify" class="search-icon" @click="expandSearch" />
    <input 
      type="text" 
      :placeholder="placeholder" 
      v-model="searchValue"
      :class="{ 'hidden': compact && !isExpanded }"
      @focus="isSearchFocused = true"
      @blur="handleBlur"
      @click.stop
      @input="handleInput"
      @keyup.enter="handleEnter"
      ref="searchInput"
    >
    <div class="search-glow" :class="{ active: isSearchFocused }"></div>
  </div>
</template>

<script setup>
import {
  nextTick,
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
  },
  compact: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'search']);

const searchValue = ref(props.modelValue);
const isSearchFocused = ref(false);
const isExpanded = ref(false);
const searchInput = ref(null);

watch(() => props.modelValue, (newValue) => {
  searchValue.value = newValue;
});

const expandSearch = () => {
  if (props.compact && !isExpanded.value) {
    isExpanded.value = true;
    nextTick(() => {
      searchInput.value.focus();
    });
  }
};

const handleBlur = () => {
  isSearchFocused.value = false;
  if (props.compact && searchValue.value === '') {
    isExpanded.value = false;
  }
};

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
  transition: all $transition-normal;

  &.compact-mode {
    width: 40px;
    height: 40px;
    
    .search-icon {
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      background: rgba($surface, 0.3);
      border: 1px solid rgba($primary, 0.3);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background: rgba($primary, 0.1);
        box-shadow: 0 0 15px rgba($primary, 0.2);
      }
    }
  }

  .search-icon {
    position: absolute;
    left: $spacing-md;
    top: 50%;
    transform: translateY(-50%);
    color: $text-secondary;
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
    
    &.hidden {
      width: 0;
      padding: 0;
      opacity: 0;
      border: none;
    }

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