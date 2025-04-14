<template>
  <div 
    class="base-card"
    :class="[
      `elevation-${elevation}`,
      {
        'hoverable': hoverable,
        'glass': glass,
        'bordered': bordered,
        [`radius-${radius}`]: true
      }
    ]"
  >
    <div v-if="$slots.media" class="card-media">
      <slot name="media" />
    </div>

    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>

    <div class="card-content">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>

    <div v-if="loading" class="card-overlay">
      <div class="loader">
        <v-progress-circular
          indeterminate
          color="primary"
          size="32"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  elevation: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 24
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  glass: {
    type: Boolean,
    default: true
  },
  bordered: {
    type: Boolean,
    default: false
  },
  radius: {
    type: String,
    default: 'lg',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.base-card {
  position: relative;
  background: $surface;
  overflow: hidden;

  // Border radius variants
  &.radius-none { border-radius: 0; }
  &.radius-sm { border-radius: $border-radius-sm; }
  &.radius-md { border-radius: $border-radius-md; }
  &.radius-lg { border-radius: $border-radius-lg; }
  &.radius-xl { border-radius: $border-radius-xl; }
  &.radius-full { border-radius: $border-radius-full; }

  // Glass effect
  &.glass {
    @include glass-effect;
  }

  // Border
  &.bordered {
    border: 1px solid rgba($text-primary, 0.1);
  }

  // Elevation levels
  @for $i from 0 through 24 {
    &.elevation-#{$i} {
      box-shadow: 0 #{$i * 1}px #{$i * 2}px rgba(0, 0, 0, #{0.1 + $i * 0.02});
    }
  }

  // Hover effect
  &.hoverable {
    transition: transform $transition-normal, box-shadow $transition-normal;

    &:hover {
      transform: translateY(-4px);
      box-shadow: $shadow-lg;
    }
  }
}

.card-media {
  position: relative;
  width: 100%;
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card-header {
  padding: $card-padding;
  border-bottom: $glass-border;
}

.card-content {
  padding: $card-padding;
}

.card-footer {
  padding: $card-padding;
  border-top: $glass-border;
}

.card-overlay {
  @include absolute-center;
  @include flex-center;
  width: 100%;
  height: 100%;
  background: rgba($surface, 0.7);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.loader {
  @include flex-center;
  width: 100%;
  height: 100%;
}
</style> 