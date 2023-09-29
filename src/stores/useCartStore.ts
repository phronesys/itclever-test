import {defineStore, storeToRefs} from "pinia";
import {computed, reactive, ref} from 'vue'
import {useProductStore} from "@/stores/useProductsStore";

export type CartType = {
    [key: number]: number
}
export const useCartStore = defineStore('cart', () => {
    const MAX_VALUE = 20;
    const cart = reactive<CartType>({});
    const modalCart = ref(false);

    const {products} = storeToRefs(useProductStore());

    /*getters*/
    const productsInCart = computed(() => {
        // obtain cart id's
        const cartIds = Object.keys(cart);

        if (cartIds.length === 0) return [];

        // for every id in the cart find the product
        return cartIds.map((id) => {
            const quantity = cart[Number(id)];
            const product = products.value.find(p => p.id === Number(id))

            if (product) return {...product, quantity}
        })
    })

    const totalPriceCart = computed(() => {
        if (productsInCart.value.length === 0) return 0;
        return productsInCart.value.reduce((accumulator, currentItem) => {
            const cost = Number(currentItem?.price) * Number(currentItem?.quantity);
            return accumulator + cost;
        }, 0)
    })


    function cartRemove(id: number) {
        if (cart[id] > 1) return cart[id]--;

        delete cart[id];
    }

    function cartAdd(id: number) {
        if (cart[id] === MAX_VALUE) return;
        if (!cart[id]) {
            cart[id] = 1
            return;
        }
        cart[id]++;
    }

    return {
        MAX_VALUE,
        cart,
        modalCart,
        productsInCart,
        totalPriceCart,
        cartRemove,
        cartAdd
    }
})