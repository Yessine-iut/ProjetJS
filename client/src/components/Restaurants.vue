<template>
  <div style="text-align: center; line-height: 30px">
    <div>
      <h1>{{ msg }}</h1>
    </div>
    <form @submit.prevent="ajouterRestaurant($event)">
      <label>
        Nom : <input name="nom" type="text" required v-model="nom" />
      </label>
      <label>
        Cuisine :
        <input name="cuisine" type="text" required v-model="cuisine" />
      </label>
      <label>
        Ville :
        <input name="borough" type="text" required v-model="borough" />
      </label>

      <md-button
        type="submit"
        class="md-raised md-primary"
        style="margin-top: -5px"
        >Ajouter</md-button
      >
    </form>
    <h1>Nombre de restaurants : {{ nbRestaurantsTotal }}</h1>
    <p>
      Chercher par nom :
      <input
        @input="chercherRestaurant()"
        type="text"
        v-model="nomRestauRecherche"
      />
    </p>
    <p>
      Nombre de restaurant par page :
      <input
        @input="getRestaurantsFromServer()"
        type="range"
        min="2"
        max="100"
        v-model="pagesize"
      />{{ pagesize }}
    </p>
    <div v-if="restaurants.length > 0">
      <md-table
        v-model="restaurants"
        md-sort="name"
        md-sort-order="asc"
        md-card
      >
        <md-table-row>
          <md-table-head>Nom</md-table-head>
          <md-table-head>Cuisine </md-table-head>
          <md-table-head>Ville </md-table-head>
        </md-table-row>

        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }"
          @click="supprimerRestaurant(item)"
        >
          <md-table-cell md-label="Name" md-sort-by="name">{{
            item.name
          }}</md-table-cell>
          <md-table-cell md-label="Cuisine" md-sort-by="cuisine">
            {{ item.cuisine }}</md-table-cell
          >
          <md-table-cell
            @click="detail(item)"
            md-label="Ville"
            md-sort-by="ville"
          >
            {{ item.borough }}</md-table-cell
          >
          <md-table-cell md-label="Detail">
            <md-button class="md-raised md-primary">
              <router-link
                style="color: white"
                :to="'/DetailsRestaurant/' + item._id"
                >Details</router-link
              >
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <md-button
        class="md-raised"
        :disabled="page === 0"
        @click="pagePrecedente()"
        >Précédent</md-button
      >
      <md-button
        class="md-raised"
        :disabled="page === nbPagesTotal"
        @click="pageSuivante()"
        >Suivant</md-button
      >
      <p>Nb de page total : {{ nbPagesTotal }}</p>
      <p>Page courante : {{ page }}</p>
    </div>
    <div v-else>Aucun restaurant trouvé</div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Restaurants",
  data: () => ({
    restaurants: [],
    nom: "",
    cuisine: "",
    borough: "",
    nbRestaurantsTotal: 0,
    page: 0,
    pagesize: 10,
    nbPagesTotal: 0,
    msg: "",
    nomRestauRecherche: "",
  }),
  mounted() {
    this.getRestaurantsFromServer();
  },
  methods: {
    pagePrecedente() {
      if (this.page === 0) return;
      this.page--;
      this.getRestaurantsFromServer();
    },
    pageSuivante() {
      if (this.page === this.dernierePage) return;
      this.page++;
      this.getRestaurantsFromServer();
    },
    chercherRestaurant: _.debounce(function () {
      this.getRestaurantsFromServer();
    }, 300),
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pagesize;
      url += "&name=" + this.nomRestauRecherche;
      fetch(url).then((responseJSON) => {
        responseJSON.json().then((resJS) => {
          this.restaurants = resJS.data;
          this.nbRestaurantsTotal = resJS.count;
          this.nbPagesTotal = Math.round(
            this.nbRestaurantsTotal / this.pagesize
          );
        });
      });
    },
    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r._id;

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then(() => {
            this.msg = 'Suppression reussie du restaurant "' + r.name + '"';
            this.getRestaurantsFromServer();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ajouterRestaurant(event) {
      // eviter le comportement par defaut
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            this.msg = resJS.msg;
            this.getRestaurantsFromServer();
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.nom = "";
      this.cuisine = "";
      this.borough = "";
    },
    getColor(index) {
      return index % 2 ? "#A9A9A9" : "white";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
