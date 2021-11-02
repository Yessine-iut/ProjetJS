<template>
 <div style="height: 200px; width:300px;">
    <div class="info" >
      <span>Coordonnées: {{ center }}</span>
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
       <l-marker
 :key="marker.id"
 :lat-lng="marker.coordinates"
>
 <l-icon ref="icon">
     <img class="restaurant-icon" :src="marker.imageUrl"/>
   </l-icon>
</l-marker>

    </l-map>
   
  </div>

</template>

<script>

import {LMap, LTileLayer, LMarker,LIcon} from 'vue2-leaflet';
import "leaflet/dist/leaflet.css"

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [40.734051, -74.002786],
      zoom:12,
     marker: 
   {id: 1, coordinates:[40.734051, -74.002786],imageUrl: 'https://i.imgur.com/XFUd0se.png'},

  

    };
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    markerUpdated(center){
    this.marker.coordinates=center;
    }
  }
}


</script>
<style scoped>
.restaurant-icon {
   height: 50px;
   width: auto;
 }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
