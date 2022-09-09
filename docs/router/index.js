import Vue from "vue";
import { createRouter, createWebHistory, VueRouter } from 'vue-router';
import login from '../views/Login.vue'

const routes = [
  {
    path: '/usuario',
    name: 'usuario',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Usuario.vue')
  },

  {
    path: '/app',
    name: 'app',
    
    component: () => import(/* webpackChunkName: "about" */ '../App.vue')
  },
  {
    path: '/',
    name: 'login',
    component: login,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),

  },
  {
    path: '/empresa',
    name: 'empresa',
    beforeEnter: (to, from) => {
      if (router.app.$session.exists()) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Empresa.vue')
  },
  {
    path: '/inicio',
    name: 'inicio',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue')
  },
  {
    path: '/cargaexcel',
    name: 'cargaexcel',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/CargaExcel.vue')
  },
  {
    // /search/screens -> /search?q=screens
    path: '/empresa/:id',
    name: 'empresa',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Empresa.vue')
  },
  {
    path: '/diagnostico/:id', component: 'diagnostico',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Diagnostico.vue')
  },
  {
    path: '/search',
    // ...
  },
  {
    path: '/perfil',
    name: 'perfil',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../Perfil.vue')
  },
  {
    path: '/diagnostico/:id',
    name: 'diagnostico',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Diagnostico.vue')
  },
  {
    path: '/chequeo/:id',
    name: 'chequeo',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Chequeo.vue')
  },
  {
    path: '/asistencia/:id',
    name: 'asistencia',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Asistencia.vue')
  },
  {
    path: '/proveedor',
    name: 'proveedor',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Proveedor.vue')
  },

  
  {
    path: '/metrica/',
    name: 'metrica',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Metricas.vue')
  },
  {
    path: '/seguimiento/:id',
    name: 'seguimiento',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Seguimiento.vue')
  },
  {
    path: '/documentos/:id',
    name: 'documentos',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/ArchivoDocumento.vue')
  },
  {
    path: '/aaaa/',
    name: 'aaaa',
    beforeEnter: (to, from, next) => {
      if (sessionStorage.length!=0) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/aaaa.vue')
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
