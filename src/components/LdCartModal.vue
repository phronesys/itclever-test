<script setup lang="ts">

import {storeToRefs} from "pinia";
import {useCartStore} from "@/stores";

const {modalCart, productsInCart, totalPriceCart} = storeToRefs(useCartStore());
</script>

<template>
  <teleport to="body">
    <dialog class="modal ld-cart-modal" :class="{'modal-open': modalCart }">
      <div class="modal-box">
        <header>
          <h4>Carrito</h4>
          <button class="btn" @click="modalCart = false">Close</button>
        </header>

        <div v-if="productsInCart.length > 0">
          <div v-for="product in productsInCart" :key="product?.id">
            <h6>
              - {{ product?.title }}
            </h6>
            <p>
              {{ product?.price }}$ x {{ product?.quantity }}
            </p>
          </div>
        </div>
        <div v-else>
          No hay nada en el carrito :(
        </div>


        <footer>
          Precio total: <b>
          {{ Math.round(totalPriceCart) }}$
        </b>
        </footer>
      </div>
    </dialog>
  </teleport>
</template>

<style scoped lang="postcss">
.ld-cart-modal {
  & > .modal-box {
    @apply bg-slate-200 text-gray-950 h-[600px] min-w-[300px] flex flex-col;

    & > header {
      @apply flex justify-between items-center mb-8;

      h4 {
        @apply text-4xl font-semibold;
      }
    }

    & > div > div {
      @apply flex items-center justify-between mb-4;

      & > h6 {
        @apply text-xl max-w-[300px] whitespace-nowrap text-ellipsis overflow-hidden;
      }

    }

    & > footer {
      @apply mt-auto text-3xl;
    }
  }
}
</style>