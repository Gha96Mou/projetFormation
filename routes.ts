import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      {
        path: 'products',
        component: () => import('pages/ProductPage.vue'),

      },
      {
        path: 'product-details/:code',
        component: () => import('pages/ProductDetailsPage.vue'),
        name: 'product-details',
        props: route => ({
          code: route.params.code,
          libelle: route.params.libelle,
          commentaires: route.params.commentaires
        })
      },
      {
        path: 'customers',
        component: () => import('pages/CustomerPage.vue'),

      },

      // Always leave this as last one,
      // but you can also remove it
     {
        path: '/:catchAll(.*)*',
       component: () => import('pages/Error404.vue')
      }
       ]
   },

]

export default routes
