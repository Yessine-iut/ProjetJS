<template>
  <div class="hello">
    <md-table md-sort="name" md-sort-order="asc" md-card>
      <md-table-row>
        <md-table-head>Items</md-table-head>
      </md-table-row>
      <md-table-row v-if="plats.length > 0|| menus.length > 0">
        <md-table-cell md-label="Nom" md-sort-by="nom">
          <div v-for="item in plats" :key="item.nom">
            {{ item.nom
            }}<md-button
              class="md-icon-button md-raised md-accent test"
              @click="supprimerPlat(item)"
            >
              X
            </md-button>
            <hr/>
            <br/>

            </div>
            
            <div v-for="item in menus" :key="item">
              
              <div > <b>MENU</b> <md-button
                class="md-icon-button md-raised md-accent test"
                @click="supprimerMenu(item)"
              >
                X
              </md-button>
              </div>
              
              <div v-for="itemMenu in item" :key="itemMenu">
                {{ itemMenu.nom }}
              </div>
              <br/>

              <hr/>
              <br/>

            </div>
          
        </md-table-cell>
       
      </md-table-row>

      <md-table-row style="border: 0px solid !important">
        <md-table-cell md-label="Prix Total" md-sort-by="prix" >
          Total :           {{ prixTotal }}

        </md-table-cell>
     
      </md-table-row>
    </md-table>
    <div v-if="plats.length > 0">
      <md-button class="md-raised md-primary" @click="openModal()"
        >Commander</md-button
      >
    </div>
    <transition name="fade">
      <div class="modal" v-if="show">
        <div class="modal__backdrop" @click="closeModal()" />

        <div class="modal__dialog">
          <div class="modal__header">
            <slot name="header" />
            <button
              type="button"
              class="modal__close"
              @click="closeModal()"
            ></button>
            <h2>Récapitulatif de la commande</h2>
          </div>

          <div class="modal__body">
            <slot name="body" />
            <md-table
              id="recapitulatif"
              md-sort="name"
              md-sort-order="asc"
              md-card
            >
              <md-table-row v-if="plats.length > 0">
                <md-table-cell md-label="Nom" md-sort-by="nom">
                  <div v-for="item in plats" :key="item.nom">
                    {{ item.nom }}
                  </div>
                   <div v-for="item in menus" :key="item">
              
              <div > 
                  <br> <b>MENU</b> <br>
              </div>
              
              <div v-for="itemMenu in item" :key="itemMenu">
                {{ itemMenu.nom }}
              </div>
            

            </div>
          
        </md-table-cell>
               
              </md-table-row>

              <md-table-row style="border-top: 1px solid">
                <md-table-cell md-label="Prix Total" md-sort-by="prix">
                  Total:                   {{ prixTotal }}

                </md-table-cell>
               
              </md-table-row>
            </md-table>
          </div>

          <div class="modal__footer">
            <slot name="footer" />
            <div>Merci d'avoir commandé</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Panier",
  components: {},
  data: () => ({
    plats: [],
    prixTotal: 0,
    show: false,
    menus: [],
  }),
  mounted() {
    this.$root.$on("ajouterMenu", (data) => {
      this.menus.push(data);
      this.calculTotal();
      console.log(this.menus);
    });
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
      this.plats = [];
      this.menus=[];
      this.prixTotal = 0;
    
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    },
    calculTotal() {
      this.prixTotal = 0;
      for (let i = 0; i < this.plats.length; i++) {
        this.prixTotal += this.plats[i].prix;
      }
       for (let i = 0; i < this.menus.length; i++) {
           let prixTotalMenu=0;
        for(let j=0;j<this.menus[i].length;j++){
            prixTotalMenu += this.menus[i][j].prix;
        }
        this.prixTotal+=Math.round(prixTotalMenu*0.8*100)/100;
      }
      this.prixTotal = Math.round(this.prixTotal * 100) / 100;
    },
    supprimerPlat(item) {
      for (let i = 0; i < this.plats.length; i++) {
        if (this.plats[i] === item) {
          this.plats.splice(i, 1);
          break;
        }
      }
      this.calculTotal();
    },
    supprimerMenu(item) {
     for(let i=0;i<this.menus.length;i++){
         let compteur=0;
         for(let j=0;j<this.menus[i].length;j++){
             if(this.menus[i][j]===item[j]){
                 compteur++
             }else
                break;
         }
         if(compteur===3){
             this.menus.splice(i,1);
             break;
         }
     }
      this.calculTotal();
    },
  },
};
import "vuetify/dist/vuetify.min.css";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
table {
  border: 1px solid black;
  width: 100%;
  border-collapse: collapse;
}
#recapitulatif {
  border: 0px;
}
#recapitulatif td {
  border: 0px;
  /*background-color:*/
}
#recapitulatif tr {
  border: 0px;
  /*background-color:*/
}

tr,
td {
  border: 1px solid black;
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
.test {
  transform: scale(0.7);
  margin-top: -10px;

}
.md-table-cell-container {
  padding: 0px !important;
}
.md-table-cell {
  border-bottom: none;
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
  width: 80%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  &__backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  &__dialog {
    background-color: #ffffff;
    position: relative;
    width: 600px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 2;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }
  &__close {
    width: 30px;
    height: 30px;
  }
  &__header {
    padding: 20px 20px 10px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  &__body {
    padding: 10px 20px 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  &__footer {
    padding: 10px 20px 20px;
  }
}
</style>
