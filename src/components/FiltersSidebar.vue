<template>
  <div class="filters-sidebar">
    <div class="filters">
      <h3>Фильтры</h3>
      <div class="filter-group">
        <div 
          v-for="(filter, index) in filters" 
          :key="index"
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
          v-for="(topic, index) in topics" 
          :key="index"
          class="topic-item"
        >
          <span class="topic-name">{{ topic.name }}</span>
          <span class="topic-count">{{ topic.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  filters: {
    type: Array,
    required: true
  },
  topics: {
    type: Array,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
.filters-sidebar {
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
    
    h3 {
      color: $text-primary;
      margin-bottom: $spacing-md;
      font-weight: $font-weight-semibold;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: $spacing-sm;
    }

    .filter-item {
      display: flex;
      align-items: center;
      padding: $spacing-sm $spacing-md;
      border-radius: $border-radius-md;
      cursor: pointer;
      transition: all $transition-normal;
      background: rgba($surface-dark, 0.3);

      .v-icon {
        margin-right: $spacing-md;
        color: $text-secondary;
      }

      span {
        color: $text-secondary;
      }

      &:hover {
        background: rgba($primary, 0.15);
        transform: translateX(4px);

        .v-icon, span {
          color: $text-primary;
        }
      }

      &.active {
        background: rgba($primary, 0.2);
        
        .v-icon, span {
          color: $primary;
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
    
    h3 {
      color: $text-primary;
      margin-bottom: $spacing-md;
      font-weight: $font-weight-semibold;
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
        background: rgba($surface-dark, 0.3);

        &:hover {
          background: rgba($primary, 0.15);
          transform: translateX(4px);
        }

        .topic-name {
          color: $primary;
          font-weight: $font-weight-medium;
        }

        .topic-count {
          color: $text-secondary;
          font-size: $font-size-sm;
          background: rgba($surface-dark, 0.5);
          padding: 2px 8px;
          border-radius: $border-radius-full;
        }
      }
    }
  }
}
</style> 