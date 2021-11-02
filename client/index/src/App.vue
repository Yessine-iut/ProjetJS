<template>
  <div id="app">
    <!-- <md-button class="md-raised md-primary">
     <router-link style="color:white" to="/restaurants">Liste des restaurants</router-link>
    </md-button>-->
 <md-tabs
        md-sync-route
        md-active-tab="tab-pages"
        style="margin-bottom:70px"
      >
        <md-tab
          id="tab-home"
          md-label="Home"
          to="/"
        ></md-tab>
        <md-tab
          id="tab-pages"
          md-label="Pages"
          to="/CarteRestaurant"
        ></md-tab>
        <md-tab
          id="tab-posts"
          md-label="Posts"
          to="/HelloWorld2"
        ></md-tab>
        <md-tab
          id="tab-settings"
          md-label="Settings"
          to="/HelloWorld2"
        ></md-tab>
        <md-tab id="tab-disabled" md-label="Disabled" md-disabled></md-tab>
      </md-tabs>
    <router-view></router-view>
    <footer>
    </footer>
  </div>
  
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
/*import VueRouter from 'vue-router'
import HelloWorld2 from './components/HelloWorld2.vue'*/





</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
