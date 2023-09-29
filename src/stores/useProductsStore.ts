import {defineStore} from "pinia";
import {computed, ref} from "vue";


export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

export const useProductStore = defineStore('product', () => {
  const BASE_URL = 'https://fakestoreapi.com';
  /* state */
  const products = ref<Product[]>([])
  const categories = ref<string[]>([]);
  const activeCategories = ref<string[]>([]);
  const search = ref('');
  /* getters */

  /* product list to render */
  const productFilter = computed<Product[]>(() => {
    let finalProductList: Product[] = [];
    if (products.value.length === 0 || categories.value.length === 0) return finalProductList;

    // filter by category
    finalProductList = products.value.filter((product) => {
      return activeCategories.value.includes(product.category)
    })

    // don't filter by search if empty
    if (search.value.length === 0) return finalProductList;

    // filter by search value
    return finalProductList.filter(product => {
      const formattedSearch = search.value.toLowerCase();

      const foundTitle = product.title.toLowerCase().includes(formattedSearch);
      const foundDescription = product.description.toLowerCase().includes(formattedSearch);

      return foundTitle || foundDescription;
    })
  })

  /* actions */


  /* get product list */
  async function getProducts() {
    if (products.value.length > 0) return; // already fetched

    const response = await fetch(`${BASE_URL}/products`);
    products.value = await response.json();
  }

  /* get categories list */
  async function getCategories() {
    if (categories.value.length > 0) return; // already fetched categories

    const response = await fetch(`${BASE_URL}/products/categories`);
    categories.value = await response.json();
    activeCategories.value = categories.value;
  }

  /* get a single product */
  async function getProductById(id: number): Promise<Product> {
    // check if product is already fetched
    const localProduct = products.value.find(product => product.id === id);
    if (localProduct) return localProduct;

    const response = await fetch(`${BASE_URL}/products/${id}`)
    return await response.json();
  }


  return {
    /* state */
    products,
    categories,
    activeCategories,
    search,
    /* getters */
    productFilter,
    /* actions */
    getProducts,
    getCategories,
    getProductById,
  }
})