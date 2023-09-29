<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useProductStore} from "@/stores";
import LdProduct from "@/components/LdProduct.vue";

const {getCategories, getProducts} = useProductStore();
const {categories, activeCategories, search, productFilter} = storeToRefs(useProductStore());

function toggleActiveCategory(category: string) {
  const isCategoryActive = activeCategories.value.includes(category);
  // add value
  if (!isCategoryActive) return activeCategories.value.push(category);
  // remove value
  activeCategories.value = activeCategories.value.filter(cat => cat !== category)
}

await getProducts();
await getCategories();
</script>

<template>
  <section class="view-home">
    <input v-model="search" type="text" placeholder="What are you looking for?"/>
    <nav>
      <div
        class="ld-category"
        v-for="(category, index) in categories"
        :key="index"
        :class="{ 'ld-category--active': activeCategories.includes(category) }"
        @click="toggleActiveCategory(category)"
      >
        {{ category }}
      </div>
    </nav>


    <div class="view-home__content">
      <ld-product
          v-for="product in productFilter"
          :key="product.id"
          :product="product"
      />
    </div>

  </section>
</template>


<style lang="postcss" scoped>
.view-home {
  @apply flex flex-col gap-8;

  & > input {
    @apply input input-bordered w-full max-w-[500px] mx-auto;
  }

  & > nav {
    @apply flex flex-row gap-4 max-w-max mx-auto flex-wrap capitalize;


    & > .ld-category {
      @apply px-2 py-0.5 grid place-items-center min-w-[108px];
      @apply bg-indigo-300/40 text-gray-950 font-semibold rounded-lg text-center duration-200 cursor-pointer select-none;
      @apply transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105;

      &--active {
        @apply bg-indigo-400 ;
      }
    }
  }

  &__content {

    @apply flex gap-4 flex-wrap justify-center p-4 w-full;
  }
}
</style>