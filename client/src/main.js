import Vue from 'vue'
import * as VueMaterial from 'vue-material'
import App from './App.vue'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import CarteRestaurant from './components/CarteRestaurant.vue'
import Accueil from './components/Accueil.vue'
import Restaurants from './components/Restaurants.vue'
import RestaurantDetail from './components/RestaurantDetail.vue'
import MenuRestaurant from './components/MenuRestaurant.vue'
import * as Vue2Leaflet from 'vue2-leaflet';




Vue.config.productionTip = false
Vue.use(VueMaterial.default)
Vue.use(VueRouter)
Vue.use(Vue2Leaflet);
const router = new VueRouter({
  routes: [
    // l'objet qui suit est un itinéraire de route
    {
      path: '/',
      component: Accueil,
    },
    {
      path: '/CarteRestaurant',
      component: CarteRestaurant,
    },
    {
      path: '/Restaurants',
      component: Restaurants,
    },
    {
      path: '/DetailsRestaurant/:id',
      component: RestaurantDetail,
    },
    {
      path: '/MenuRestaurant',
      component: MenuRestaurant,
    }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


