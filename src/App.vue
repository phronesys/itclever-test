<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {Icon} from '@iconify/vue';
import LdCartModal from "@/components/LdCartModal.vue";
import {storeToRefs} from "pinia";
import {useCartStore} from "@/stores";

const {modalCart} = storeToRefs(useCartStore());

function openCartModal() {
  modalCart.value = true
}
</script>

<template>
  <div class="ld-app">
    <header>
      <h1>
        <RouterLink to='/'>
          The Storeroom
          <Icon icon="gala:search"></Icon>
        </RouterLink>
      </h1>

      <span @click="openCartModal">
        Carrito
        <Icon icon="mdi-light:cart"></Icon>
      </span>
    </header>

    <main class="content">
      <RouterView v-slot="{ Component }">
        <Suspense timeout="0">
          <template #default>
            <Component :is="Component" :key="$route.path"></Component>
          </template>
          <template #fallback>
            <div>Loading...</div>
          </template>
        </Suspense>
      </RouterView>
    </main>
    <ld-cart-modal></ld-cart-modal>
  </div>
</template>

<style lang="postcss" scoped>
.ld-app {
  @apply p-4 pt-8 max-w-xl sm:max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto;

  & > header {
    @apply mb-10 py-4 px-8 flex justify-between items-center;
    @apply bg-gray-700/30 rounded-full;

    & > h1 {
      @apply text-2xl lg:text-4xl font-semibold;

      & > a {
        @apply flex items-center gap-4;
      }
    }

    & > span {
      @apply bg-indigo-700/50 hover:bg-indigo-700 hover:text-white transition-colors ease-linear duration-100 cursor-pointer;
      @apply min-w-max min-h-max rounded-full flex px-3 py-1 items-center text-lg lg:text-2xl;

      & > svg {
        @apply w-8 h-8 p-1.5 sm:w-10 sm:h-10;
      }
    }


  }

  & > .content {
    @apply flex w-full;
  }
}

</style>
