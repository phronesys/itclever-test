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
    <figure>
      <img :src="productDetail.image" :alt="productDetail.title">
    </figure>

    <main class="view-product__content">
      <div class="view-product__content--text">
        <h1>
          {{ productDetail.title }}
        </h1>
        <p> {{ productDetail.description }}</p>
        <p><b>
          {{ productDetail.price }} USD$
        </b></p>
      </div>


      <div class="view-product__content--action">
        <RouterLink to="/">Go back</RouterLink>
        <ld-add-remove :id="productDetail.id" desktop></ld-add-remove>
      </div>
    </main>
  </section>
</template>

<style scoped lang="postcss">
.view-product {
  @apply flex flex-col lg:flex-row justify-start lg:justify-center items-center p-4 gap-8 rounded-lg max-w-[500px] lg:max-w-full mx-auto;
  @apply bg-slate-950/90;

  & > figure {
    @apply w-full h-[200px] bg-white lg:h-full;

    & > img {
      @apply h-full w-max mx-auto object-contain ;
    }
  }

  &__content {
    @apply flex flex-row justify-between w-full max-w-[500px] lg:max-w-full h-full;

    &--text {
      @apply flex flex-col ;

      & > h1 {
        @apply text-4xl mb-5 font-semibold;
      }

      & > p {
        @apply text-2xl mb-4;
      }
    }

    &--action {
      @apply min-w-[100px] lg:min-w-[200px] flex flex-col justify-between items-end;

      & > a {
        @apply text-2xl underline text-slate-600 hover:text-slate-300;
      }
    }
  }
}
</style>