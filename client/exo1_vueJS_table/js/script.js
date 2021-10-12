import _ from "lodash"
window.onload=init;

function init() {
  
    new Vue({
        el: "#app",
        data: {
            restaurants: [],
            nom: '',
            search:null,
            cuisine: '',
            nbRestaurantsTotal:0,
            page:0,
            pagesize:10,
            nbPagesTotal:0,
            msg:"",
            nomRestauRecherche:"",

        },
        mounted(){
            console.log("AVANT AFFICHAGE");
            this.getRestaurantsFromServer();
        },
        methods: {
            pagePrecedente(){
                if(this.page===0) return;
                this.page--;
                this.getRestaurantsFromServer();
            },
            pageSuivante(){
                if(this.page===this.dernierePage) return;
                this.page++;
                this.getRestaurantsFromServer();
            },  searchOnTable: function searchOnTable() {
                this.searched = searchByName(this.restaurants, this.search);
                _.debounce(function(){
                    this.getRestaurantsFromServer();
                },300)
              },
            
            getRestaurantsFromServer(){
                let url="http://localhost:8080/api/restaurants?";
                url+="page="+this.page;
                url+="&pagesize="+this.pagesize;
                url+="&name="+this.nomRestauRecherche;
                //url+="&name="+this.nomRestaurantRechercher;
                fetch(url)
                .then((responseJSON)=>{
                    responseJSON.json().then((resJS)=>{
                    //afficheResponseGET(res);
                    //console.log(resJS)
                    this.restaurants=resJS.data;
                    this.nbRestaurantsTotal=resJS.count;
                    this.nbPagesTotal=Math.round(this.nbRestaurantsTotal/this.pagesize);
                    })
                })
            },
            supprimerRestaurant(r) {
                //this.restaurants.splice(index, 1);
                let url = "http://localhost:8080/api/restaurants/"+r._id;

                fetch(url, {
                    method: "DELETE",
                })
                .then(responseJSON=>{
                    responseJSON.json()
                        .then(resJS=> {
                            // Maintenant res est un vrai objet JavaScript
                            //afficheReponsePOST(res);
                            this.msg=resJS.msg;
                            this.getRestaurantsFromServer();
                        });
                    })
                    .catch(err=> {
                        console.log(err);
                });

            },
            chercherRestaurants:
            _.debounce(function(){
                this.getRestaurantsFromServer();
            },300),
            ajouterRestaurant(event) {
                // eviter le comportement par defaut
                //event.preventDefault();
                let form = event.target;

                // Récupération des valeurs des champs du formulaire
                // en prévision d'un envoi multipart en ajax/fetch
                let donneesFormulaire = new FormData(form);
            
                let url = "http://localhost:8080/api/restaurants";
            
                fetch(url, {
                    method: "POST",
                    body: donneesFormulaire
                })
                .then(responseJSON=>{
                    responseJSON.json()
                        .then(resJS=> {
                            // Maintenant res est un vrai objet JavaScript
                            //afficheReponsePOST(res);
                            this.msg=resJS.msg;
                            this.getRestaurantsFromServer();
                        });
                    })
                    .catch(err=> {
                        console.log(err);
                });
                this.nom = "";
                this.cuisine = "";
            },
            getColor(index) {
                return (index % 2) ? 'lightBlue' : 'pink';
            }
        }
    })
}
