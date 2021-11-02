<template>
  <div>
    <div style="width:100%;display:block;height:20%;position:relative">
    <h1 style="text-align:center">{{ name }}</h1>
    <br>
    <div style="width:150px; height:150px;margin-left:50px;margin-right:20px">
    <img :src="json"   style="padding-bottom: 20px;width:100%" />
    </div>
    <ul >
      <li>Cuisine : {{ cuisine }}</li>
      <li>Ville : {{ borough }}</li>
      <li>Score : {{score}}/20</li>

      
    </ul>

    <div>
    </div>

    <div v-if="checkVideo">
      <video
        :src="video"
        controls
        poster="sintel.jpg"
        width="400"
        style="padding-top: 20px; padding-bottom: 20px;;margin-left:15%"
      ></video>
    </div>
    <div id="map">
      <Map ref="map" />
    </div>
    </div>
        <h2>JKD?NC NKEP</h2>

    <div>
      
      <CarteRestaurant />
    </div>
  </div>
</template>

<script>
import Map from "./Map.vue";
import CarteRestaurant from "./CarteRestaurant.vue";
import axios from "axios";
import { createClient } from "pexels";
const client = createClient(
  "563492ad6f9170000100000119c783799a2c471bb82118265933c92f"
);

export default {
  name: "RestaurantDetail",
  components: {
    Map,
    CarteRestaurant,
  },
  props: {},
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data: function () {
    return {
      restaurant: null,
      grades: [],
      cuisine: "",
      borough: "",
      name: "",
      center: [],
      info: null,
      json: "",
      video: "",
      checkVideo: false,
      score:0,
    };
  },
  mounted() {
    this.getRestaurantInfo();
  },
  methods: {
    getRestaurantInfo() {
      let url = "http://localhost:8080/api/restaurants/" + this.id;

      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((data) => {
            this.restaurant = data.restaurant;
            this.name = data.restaurant.name;

            this.cuisine = data.restaurant.cuisine;
            this.json = this.searchImages("restaurant+", 1);
            this.video = this.searchVideo(
              "restaurant+" + this.cuisine.replaceAll(" ", "+"),
              1
            );
            this.borough = data.restaurant.borough;
            this.grades = data.restaurant.grades;
            this.score=this.moyenneScore();
            this.latitude = this.restaurant.address.coord[1];
            this.longitude = this.restaurant.address.coord[0];
            this.center = [this.latitude, this.longitude];
            this.$refs.map.center = this.center;
            this.$refs.map.markerUpdated(this.center);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    searchImages(keyword, page = 1) {
      console.log(keyword);
      const query = "restaurant+" + this.name;
      client.photos.search({ query, per_page: page }).then((photos) => {
        console.log(photos.photos[0].src.original);
        this.json = photos.photos[0].src.original;
      });
    },
    searchVideo(keyword, page = 1) {
      axios
        .get(
          `https://pixabay.com/api/videos/?page=${page}&key=23926467-1744e6f995758bd74f36d9467&q=${keyword}`
        )
        .then((response) => {
          console.log(response.data.hits[0].videos["medium"].url);
          if (response.data.hits.length > 0)
            this.video = response.data.hits[0].videos["medium"].url;
          this.checkVideo = true;
        });
      console.log("test");
      console.log(this.video === "");
    },
    moyenneScore(){
      let total=0;
      for(let i=0;i<this.grades.length;i++){
        total+=this.grades[i].score;

      }
      return Math.round(total/this.grades.length*10)/10
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
  margin-left: 20px;
}
ul{
  
  padding-top:60px;
}
small {
  display: block;
}

table {
  border: 1px solid black;
  width: 100%;
  border-collapse: collapse;
}

th {
  border: 1px solid black;
  /*background-color:*/
}

tr,
td {
  border: 1px solid black;
}

tr {
  width: 100%;
}
td {
  padding: 5px;
}

.md-table-cell-container {
  padding: 0px !important;
}

input:invalid {
  background-color: pink;
}

input:valid {
  background-color: lightGreen;
}

.bordureRouge {
  border: 2px dashed red;
}

.md-table {
  width: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#map {
  width: 33%;
  height: 33%;
  position:static;
}
</style>
