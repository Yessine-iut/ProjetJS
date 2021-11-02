<template>
  <div>
    <div style="width: 100%; display: block; height: 20%; position: relative">
      <h1 style="font-size: 40px; text-align: center">{{ name }}</h1>
      <br />
      <hr style="margin-bottom: 20px;">
      <div class="wrapper">
        <div class="one" style="width: 150px;">
          <img :src="json" style="width: 100%" />
        </div>
        <ul class="two">
          <li>Cuisine : {{ cuisine }}</li>
          <li>Ville : {{ borough }}</li>
          <li>Moyenne Score : {{ score }}</li>
        </ul>

        <div class="three" v-if="checkVideo">
          <video
            :src="video"
            controls
            poster="sintel.jpg"
            width="400"
            style="padding-top: 20px; padding-bottom: 20px"
          ></video>
        </div>
        <div class="four" id="map" v-if="this.center.length!==0">
          <Map ref="map" />
        </div>
      </div>
      <hr style="margin-top:20px">
    </div>
    <h1 style="padding-top:20px;padding-bottom:10px;text-align:center">Faites votre choix</h1>
    <h2 style="padding-top:20px;">Carte du restaurant</h2>
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
      score: 0,
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
            this.score="NaN";
            if(this.grades===undefined){
            this.score="NaN";
            }else
              this.score = this.moyenneScore();
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
      const query = "restaurant+" + this.name;
      client.photos.search({ query, per_page: page }).then((photos) => {
        this.json = photos.photos[0].src.original;
      });
    },
    searchVideo(keyword, page = 1) {
      axios
        .get(
          `https://pixabay.com/api/videos/?page=${page}&key=23926467-1744e6f995758bd74f36d9467&q=${keyword}`
        )
        .then((response) => {
          if (response.data.hits.length > 0)
            this.video = response.data.hits[0].videos["medium"].url;
          this.checkVideo = true;
        });
    },
    moyenneScore() {
      let total = 0;
      for (let i = 0; i < this.grades.length; i++) {
        total += this.grades[i].score;
      }
      return Math.round((total / this.grades.length) * 10) / 10;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  padding-top: 60px;
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

.md-table {
  width: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#map {
  width: 33%;
  height: 33%;
  position: static;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  grid-auto-rows: minmax(100px, auto);
}
.one {
  grid-column: 1 / 4;
  grid-row: 1;
  z-index: 1;
}
.two {
  grid-column: 2 / 4;
  margin-left: -20%;
  grid-row: 1;
}
.three {
  grid-column: 3 / 4;
  grid-row: 1;
}
.four {
  grid-column: 4/4;
  grid-row: 1;
}
</style>
