<script setup lang="ts">
import type {Product} from "@/stores/useProductsStore";
import {ref, toRefs} from "vue";
import {useRouter} from "vue-router";
import LdAddRemove from "@/components/LdAddRemove.vue";
import LdAlert from "@/components/LdAlert.vue";

export interface LdProductProps {
  product: Product
}

const router = useRouter();
const props = defineProps<LdProductProps>();
const {product} = toRefs(props);
const showAlert = ref(false)

async function handleProductClick() {
  const {id} = product.value;
  await router.push({path: `/product/${id}`})
}

function onAddedItem() {
  showAlert.value = true;

  setTimeout(() => {
    showAlert.value = false;
  }, 1000)
}

</script>

<template>
  <div class="ld-product__wrapper">
    <article class="ld-product">
      <figure @click="handleProductClick">
        <img :src="product.image" :alt="product.title">
      </figure>

      <div class="card-body" @click="handleProductClick">
        <h2 class="card-title">
          {{ product.title }}
        </h2>
        <p>{{ product.description }}</p>
        <p><b>{{ product.price }}$</b></p>


      </div>
      <footer>
        <span>{{ product.category }}</span>

        <ld-add-remove :id="product.id" @added-item="onAddedItem"></ld-add-remove>
      </footer>
    </article>
  </div>

  <teleport to="body">
    <transition name="alert">
      <ld-alert :show="showAlert">
        {{ product.title }}
      </ld-alert>
    </transition>

  </teleport>
</template>

<style lang="postcss" scoped>
.ld-product {
  @apply card w-[300px] bg-base-100 shadow-xl cursor-pointer select-none;

  & > figure {
    @apply w-[300px] h-[200px] bg-white;

    & > img {
      @apply h-full max-w-[150px] w-max mx-auto object-contain;
    }
  }


  & > .card-body {
    & > p,
    & > .card-title {
      @apply overflow-ellipsis whitespace-nowrap w-[200px] overflow-hidden;
    }
  }

  & > footer {
    @apply flex justify-between items-center mt-2 px-5 py-4;

    & > span {
      @apply capitalize bg-pink-500/30 px-2 py-1.5 rounded-lg;
    }
  }


  &__wrapper {
    @apply p-0.5 bg-transparent transition-colors ease-linear duration-300 hover:bg-indigo-400/70 rounded-2xl;
  }
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.2s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translate(20%, -10%);
}
</style>