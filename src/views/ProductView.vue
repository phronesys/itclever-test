<script setup lang="ts">
import {useRoute} from "vue-router";
import {useProductStore} from "@/stores";
import LdAddRemove from "@/components/LdAddRemove.vue";


const route = useRoute()
const {getProductById} = useProductStore();
const productDetail = await getProductById(Number(route.params.id));
</script>

<template>
  <section class="view-product">
    <RouterLink to="/">Go back</RouterLink>
    <figure>
      <img :src="productDetail.image" :alt="productDetail.title">
    </figure>

    <main class="view-product__content">
      <h1>
        {{ productDetail.title }}
      </h1>
      <p> {{ productDetail.description }}</p>
      <p><b>
        {{ productDetail.price }} USD$
      </b></p>
      <ld-add-remove :id="productDetail.id" desktop></ld-add-remove>
    </main>
  </section>
</template>

<style scoped lang="postcss">
.view-product {
  @apply flex flex-col lg:flex-row justify-start lg:justify-center items-center gap-8 rounded-lg max-w-[500px] lg:max-w-full mx-auto;
  @apply bg-gray-800/80 overflow-hidden relative;

  & > a {
    @apply text-lg underline text-slate-600 hover:text-white lg:hover:text-white max-w-max self-start lg:order-3 min-w-max p-4 bg-slate-900 rounded-bl-lg;
    @apply absolute right-0;
  }

  & > figure {
    @apply w-full h-[300px] bg-white lg:h-full;

    & > img {
      @apply h-full w-max mx-auto object-contain lg:max-w-[300px];
    }
  }

  &__content {
    @apply flex flex-col gap-4 w-full max-w-[500px] lg:max-w-full h-full  p-4;

    & > h1 {
      @apply text-4xl mb-5 font-semibold text-slate-300;
    }

    & > p {
      @apply text-2xl mb-4 text-slate-400;
    }
    & > .ld-add-remove__placeholder {
      @apply max-w-[240px];
    }
  }
}
</style>