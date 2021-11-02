import Vue from 'vue'
import * as VueMaterial from 'vue-material'
import App from './App.vue'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import CarteRestaurant from './components/CarteRestaurant.vue'
import HelloWorld from './components/HelloWorld.vue'
import RestaurantDetail from './components/RestaurantDetail.vue'
import MenuRestaurant from './components/MenuRestaurant.vue'
//import * as VueGoogleMaps from 'vue2-google-maps'
import * as Vue2Leaflet from 'vue2-leaflet';




Vue.config.productionTip = false
Vue.use(VueMaterial.default)
Vue.use(VueRouter)
Vue.use(Vue2Leaflet);


/*Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDMAxFQ5iEyac6IRoM21lDBQSjnaRMvZlA',
    libraries: 'places',
  }
});*/
const router = new VueRouter({
  routes: [
    // l'objet qui suit est un itinéraire de route
    {
      path: '/',
      component: HelloWorld,
      /*children: [
        // c'est aussi un itinéraire
        { path: 'bar', component: Bar }
      ]*/
    },
    {
      path: '/CarteRestaurant',
      component: CarteRestaurant,
      /*children: [
        // c'est aussi un itinéraire
        { path: 'bar', component: Bar }
      ]*/
    },
    {
      path: '/DetailsRestaurant/:id',
      component: RestaurantDetail,
      /*children: [
        // c'est aussi un itinéraire
        { path: 'bar', component: Bar }
      ]*/
    },
    {
      path: '/MenuRestaurant',
      component: MenuRestaurant,
      /*children: [
        // c'est aussi un itinéraire
        { path: 'bar', component: Bar }
      ]*/
    }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


