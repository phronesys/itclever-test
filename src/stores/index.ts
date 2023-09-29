import {createPersistedState} from 'pinia-plugin-persistedstate';
import {createPinia} from 'pinia';

export {useProductStore} from './useProductsStore';
export {useCartStore} from './useCartStore';

const pinia = createPinia();

// pinia.use(createPersistedState({
//   storage: sessionStorage,
//   auto: true
// }));

export default pinia;