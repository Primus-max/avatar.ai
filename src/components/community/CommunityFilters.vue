<template>
  <div class="community-filters" :class="{ 'is-mobile': isMobile }">
    <v-btn
      v-if="isMobile"
      class="filters-toggle"
      icon="mdi-filter-variant"
      variant="text"
      @click="isFiltersOpen = !isFiltersOpen"
    />
    
    <v-expand-transition>
      <div v-show="!isMobile || isFiltersOpen" class="filters-content">
        <div class="filters">
          <h3>Фильтры</h3>
          <div class="filter-group">
            <div 
              v-for="filter in filters" 
              :key="filter.id"
              class="filter-item"
              :class="{ active: modelValue === filter.id }"
              @click="$emit('update:modelValue', filter.id)"
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
              v-for="topic in trendingTopics" 
              :key="topic.name"
              class="topic-item"
              @click="$emit('topic-selected', topic)"
            >
              <span class="topic-name">{{ topic.name }}</span>
              <span class="topic-count">{{ topic.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue';

import { useDisplay } from 'vuetify';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  filters: {
    type: Array,
    required: true
  },
  trendingTopics: {
    type: Array,
    required: true
  }
});

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
const isFiltersOpen = ref(false);
</script>

<style lang="scss" scoped>
.community-filters {
  &.is-mobile {
    .filters-toggle {
      position: fixed;
      bottom: 80px;
      right: 16px;
      z-index: 100;
      background: linear-gradient(135deg, $primary, $accent);
      color: white;
      border-radius: 50%;
      box-shadow: 0 4px 15px rgba($primary, 0.3);
      
      &:hover {
        box-shadow: 0 6px 20px rgba($primary, 0.4);
      }
    }
    
    .filters-content {
      position: fixed;
      bottom: 140px;
      right: 16px;
      z-index: 99;
      background: rgba($surface, 0.95);
      backdrop-filter: blur(10px);
      border-radius: $border-radius-lg;
      padding: $spacing-md;
      width: 280px;
      max-height: 70vh;
      overflow-y: auto;
      box-shadow: 0 4px 25px rgba($background, 0.3);
      border: 1px solid rgba($primary, 0.1);
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
</style> 