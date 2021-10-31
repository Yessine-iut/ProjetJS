<template>
  <div id="app">
    <md-tabs md-sync-route style="margin-bottom: 70px">
      <md-tab id="tab-home" md-label="Home" to="/" exact></md-tab>
      <md-tab id="tab-pages" md-label="Restaurants" to="/Restaurants"></md-tab>
    </md-tabs>
    <router-view></router-view>
    <footer></footer>
  </div>
</template>

<script>
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
