<script setup lang="ts">
const props = defineProps({
  show: Boolean
})
</script>

<template>
  <transition name="alert">
    <div v-if="show" class="ld-alert">
      Successfully added
      <slot/>
    </div>
  </transition>
</template>

<style scoped lang="postcss">
.ld-alert {
  @apply fixed top-4 right-4 lg:top-16 lg:right-16 p-4 max-w-[300px];
  @apply bg-indigo-600 text-white font-bold;
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.2s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
}



</style>