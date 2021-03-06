import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
	path:'/axiosBasic',
	name:'axiosBasic',
	component:() => import('../views/axiosBasic.vue')
  },{
	path:'/vueInstance',
	name:'vueInstance',
	component:() => import('../views/vueInstance.vue')
  },{
  	path:'/axiosInterceptor',
  	name:'axiosInterceptor',
  	component:() => import('../views/axiosInterceptor.vue')
},{
  	path:'/axiosErr',
  	name:'axiosErr',
  	component:() => import('../views/axiosErr.vue')
},{
  	path:'/buddyList',
  	name:'buddyList',
  	component:() => import('../views/buddyList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
