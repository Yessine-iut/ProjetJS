<template>

  <div class="hello">
     <Panier ref='panier'/>
    <md-table v-model="carte" md-sort="name" md-sort-order="asc" md-card>
      <md-table-row>
        <md-table-head>Nom</md-table-head>
        <md-table-head>Type </md-table-head>
        <md-table-head>Prix </md-table-head>

      </md-table-row>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        @click="ajouterPanier(item)"
      >
        <md-table-cell md-label="Nom" md-sort-by="nom">{{
          item.nom
        }}</md-table-cell>
        <md-table-cell md-label="Type" md-sort-by="type">
          {{ item.type }}</md-table-cell
        >
        <md-table-cell      
 md-label="Prix" md-sort-by="prix">
          ${{ item.prix }}</md-table-cell
        >
        <md-table-cell      
 md-label="Description" md-sort-by="description">
          {{ item.description }}</md-table-cell
        >
          <md-table-cell      
 md-label="Image" >
  <img :src='item.urlimage' width="400px" style="padding-bottom:20px"> 
         </md-table-cell
        >
         <md-table-cell md-label="Ajouter au panier" >
          <md-button class="md-raised md-primary">
    Ajouter &#128722;
    
    </md-button>
           
          </md-table-cell
        >
        
      </md-table-row>
    </md-table>
<h2>Menu du midi</h2>
     <Menu ref='menu'/>
<h2>Menu gastronomique</h2>

     <Menu2 ref='menu2'/>

    </div>

</template>

<script>
import Menu from './MenuRestaurant.vue';
import Menu2 from './MenuRestaurant.vue';
import Panier from './Panier.vue';


export default {
  name: "HelloWorld",
  components:{
    Menu,
    Menu2,
    Panier
  },
  data: () => ({
    plats: [],
    nom: "",
    type: "",
    prix: "",
    nomPlatRecherche: "",
    carte:[]
  }),
  mounted() {
    this.getPlatsFromServer();
  },
  methods: {
   
   triePlat(s){
      let res=[]
      let l=this.plats.length;
      for(let i=0;i<l;i++){
        if(this.plats[i].type===s){
          res.push(this.plats[i]);
        }
      }
    return res;   
 },
    getPlatsFromServer() {
      let url = "http://localhost:8080/api/plats?";
      url += "page=" + this.page;
      url += "&name=" + this.nomPlatRecherche;

      fetch(url).then((responseJSON) => {
        responseJSON.json().then((resJS) => {
          this.plats = resJS.data;
          this.creerCarte()
          
          this.$refs.menu.plats=this.carte;
          this.$refs.menu.creerMenu();

          this.$refs.menu2.plats=this.carte;
          this.$refs.menu2.creerMenu();
         
          
        });
      });
    },
    creerCarte(){
          let liste=this.triePlat("Entrée");
          this.carte.push(liste.splice(Math.floor(Math.random() * liste.length),1)[0])
          this.carte.push(liste.splice(Math.floor(Math.random() * liste.length),1)[0])
          this.carte.push(liste.splice(Math.floor(Math.random() * liste.length),1)[0])


          liste=this.triePlat("Plat du jour");
          this.carte.push(liste.splice(Math.floor(Math.random() * liste.length),1)[0])
          this.carte.push(liste.splice(Math.floor(Math.random() * liste.length),1)[0])
          this.carte.push(liste.splice(Math.floor(Math.random() * liste.length),1)[0])

          liste=this.triePlat("Déssert");
          this.carte.push(liste.splice(Math.floor(Math.random() * liste.length),1)[0])
          this.carte.push(liste.splice(Math.floor(Math.random() * liste.length),1)[0])
          this.carte.push(liste.splice(Math.floor(Math.random() * liste.length),1)[0])

    },
    ajouterPanier(item){
      this.$refs.panier.plats.push(item);
      this.$refs.panier.calculPageMax();
      this.$refs.panier.getItemsCommande();
      this.$refs.panier.calculTotal();
      

    }
   
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


.md-table-cell-container {
  padding: 0px !important;
}

.md-table {
  width: 50%;
  display: block;
  margin-right: auto;
}
h2{
  margin-top: 10px;
}
</style>
