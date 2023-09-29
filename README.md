# The Storeroom 🛒🛒🛒

El proyecto es una solución a la prueba técnica de CleverIt,
donde en 24 horas se debía desarrollar lo siguiente

```
Estás trabajando en un proyecto de comercio electrónico 
y se te ha asignado la tarea de crear una página web para 
mostrar una lista de productos. Esta página debe ser 
responsiva y fácil de navegar. Utilizarás el framework 
frontend de tu elección (por ejemplo, React, Angular, 
Vue.js, etc.) para completar esta tarea 
```

### [Demo link](https://cleverit-prueba.vercel.app/)

#### Desarrollado usado las siguientes herramientas:

- [Vue](https://vuejs.org)
- [Pinia](https://pinia.vuejs.org)
- [Tailwind](https://tailwindcss.com)
- [DaisyUI](https://daisyui.com/)
- [Fake Store API](https://fakestoreapi.com/docs)
- [Iconify](https://iconify.design/docs/icon-components/vue/)

#### Info útil

- [Transitions](https://vuejs.org/guide/built-ins/transition.html)
- [Suspense](https://vuejs.org/guide/built-ins/suspense.html)
- [Dynamic Route Matching](https://router.vuejs.org/guide/essentials/dynamic-matching.html)
- [Scroll Behaviour](https://router.vuejs.org/guide/advanced/scroll-behavior.html)
- [Tailwind Sass like syntax](https://tailwindcss.com/docs/using-with-preprocessors#nesting)
- [Pinia Setup Stores](https://pinia.vuejs.org/core-concepts/)

### Estructura

Intenté hacer la solución de la manera más simple

```
App
|--Router
    |--/home            # busqueda, categorias y lista filtrada
    |--/product/:id     # parametro dinámico, muestra datos según id
|--Pinia
    |--useProductStore  # trae categorias y productos, se encarga de filtrar
    |--useCartStore     # maneja todo lo relacionado a la logica del carrito
|--Components
    |--LdProduct        # elemento renderizado con la interfaz de Producto
    |--LdAddRemove      # component que interactua con el carrito
    |--LdAlert          # se muestra cuando se agrega un elemento al carrito en HomeView
    |--LdCartModal      # modal de resumen (carrito de compra)
```

En mi opinión la parte menos simple de la app es el carrito de compras.
Por lo que lo detallaré a continuación:


### `useCartStore.ts`
Para manejar la cantidad de veces que agrega un producto, opté por indexar sus id's, asociandolos a la cantidad de veces
que se ha añadido

```js
const cart = reactive({
    7: 20,
    4: 12
})
// id 7 tiene 20 items en el carro
```

para obtener los productos equivalentes, está un getter(computed) que los calcula, `productsInCart`
retornando una copia del producto con su cantidad. 
Luego, para obtener el valor total se realiza la sumatoria de (precio * cantidad)

Y por otro lado, las funciones `cartAdd` y `cartRemove` se encargan de agregar y eliminar los id's.

La idea de hacerlo de esta forma, no era solamente por que se me hacía más rápida, si no, que pensaba que debiese
funcionar con infinitos id's. Probablemente hay una solución más simple :')


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

