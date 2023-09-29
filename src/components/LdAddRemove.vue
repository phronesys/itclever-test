<script setup lang="ts">
import {useCartStore} from "@/stores";
import {Icon} from "@iconify/vue";
import {storeToRefs} from "pinia";
import {computed, toRefs} from "vue";

export interface LdAddRemoveProps {
  id: number;
  desktop?: boolean;
}

const props = defineProps<LdAddRemoveProps>()
const emit = defineEmits(['added-item'])
const {id, desktop} = toRefs(props);

const {cartRemove, cartAdd, MAX_VALUE} = useCartStore();
const {cart} = storeToRefs(useCartStore());

const add = () => {
  cartAdd(id.value);
  if (itemCount.value < MAX_VALUE) emit('added-item');
}
const remove = () => cartRemove(id.value);

// count how many id's from a certain type are in the cart
const itemCount = computed(() => cart.value[id.value])
</script>

<template>
  <div v-if="itemCount > 0" class="ld-add-remove" :class="{desktop}">
    <button @click="remove">
      <Icon icon="mdi:minus"></Icon>
    </button>
    <span>{{ itemCount }}</span>
    <button @click="add">
      <Icon icon="mdi:add"></Icon>
    </button>
  </div>
  <div v-else class="ld-add-remove__placeholder" :class="{desktop}" @click="add">
    Add to cart
  </div>
</template>

<style scoped lang="postcss">
.ld-add-remove {
  @apply flex justify-center gap-4 items-center p-2 bg-gray-400/20 rounded-md max-w-[100px] ;

  & > button {
    @apply bg-gray-100 text-indigo-700 ;

    & > svg {
      @apply w-4 h-4 ;
    }
  }

  & > span {
    @apply text-2xl;
  }

  &__placeholder {
    @apply bg-indigo-600 px-2 py-1 rounded transition hover:scale-105 ease-linear duration-200 cursor-pointer select-none;
    @apply text-center min-w-max;
  }
}

.ld-add-remove.desktop {
  @apply max-w-[200px];

  & > button {
    & > svg {
      @apply w-8 h-8;
    }
  }
}

.ld-add-remove__placeholder.desktop {
  @apply text-3xl;
}
</style>