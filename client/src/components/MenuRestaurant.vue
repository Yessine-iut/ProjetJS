<template>
  <div class="hello">
    <div>
     
          <h1>{{ msg }}</h1>

    </div>
   
    
 <!--<md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />-->
     
   

    <md-table  md-sort="name" md-sort-order="asc" md-card>
      <md-table-row>
        <md-table-head>Items</md-table-head>
        <md-table-head>Prix</md-table-head>
        <md-table-head>Ajouter au panier</md-table-head>

      </md-table-row>
    <md-table-row>
       <md-table-cell md-label="Nom" md-sort-by="nom">
         <div v-for="item in menu" :key="item.nom">
         {{
          item.nom
        }}
         </div>
        </md-table-cell>
           <md-table-cell md-label="Prix Total" md-sort-by="prix">
         ${{prixTotal}}
        </md-table-cell>
        <md-table-cell>
           <md-button @click="evenement()" class="md-raised md-primary">
    Ajouter &#128722;
    
    </md-button>
        </md-table-cell>
    </md-table-row>

    
    </md-table>

    </div>

</template>

<script>

export default {
  name: "HelloWorld",
  
  data: () => ({
    plats: [],
    nom: "",
    type: "",
    prix: "",
    nbRestaurantsTotal: 0,
    page: 0,
    pagesize: 10,
    nbPagesTotal: 0,
    msg: "",
    nomRestauRecherche: "",
    menu:[],
    prixTotal:0,
}),
  
  methods: {
    creerMenu() {
          let liste=this.triePlat("Entrée");
          this.menu.push(liste[Math.floor(Math.random() * liste.length)])

          liste=this.triePlat("Plat du jour");
          this.menu.push(liste[Math.floor(Math.random() * liste.length)])

          liste=this.triePlat("Déssert");
          this.menu.push(liste[Math.floor(Math.random() * liste.length)])

          for(let i=0;i<this.menu.length;i++){
           this.prixTotal+=this.menu[i].prix;
          }
          this.prixTotal=Math.round(this.prixTotal*0.80*100)/100;
     
    },
    evenement(){
  this.$root.$emit('ajouterMenu', this.menu);
    },
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
  width: 40%;
  display: block;
  margin-right: auto;
}

</style>
