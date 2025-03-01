/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import searchpage from "@/pages/searchpage.vue"
import FAQ from "@/pages/FAQ.vue"
import contact from "@/pages/contact.vue"
import CarDetails from "@/pages/carDetails.vue"
import brand from '@/pages/brand.vue'
import category from '@/pages/category.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([
    ...routes,
    { path: "/search", component: searchpage },
    { path: "/faq", component: FAQ },
    { path: "/contact", component: contact },
    { path: '/car/:id', name: 'carDetails', component: CarDetails, props: true },
    { path: '/brand/:brand', name: 'brand', component: brand, props: true },
    { path: '/category/:category', name: 'category', component: category, props: true },
    
  ]),
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
