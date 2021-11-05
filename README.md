# ProjetJS

Vidéo YouTube: https://www.youtube.com/watch?v=WZRuddHyPbY

Avant de commencer importer le fichier plats.json sur mongoDB -> https://github.com/Yessine-iut/ProjetJS/blob/main/plats.json 

## Ergonomie

On a utilisé vue-material pour que le site soit plus érgonome.

## Les informations du restaurant

Pour chaque restaurant on a affiché en plus du TP, la ville, la moyenne des différents scores.
Quand il y a 0 restaurant qui correspond à notre recherche le site web affiche qu'il y a pas de restaurant correspondant à la recherche

## Détail du restaurant

On a un bouton détail pour chaque ligne du tableau permettant de naviguer un autre composant affichant les détails d'un restaurant.
Pour chaque restaurant nous avons une image qu'on récupère grâce à une API se nommant Pexels. Notre recherche se fait par les mots clés "restaurant" et le nom du restaurant. Pour la vidéo on utilise également Pexels. (Anciennement Pixabay, sur la vidéo on a dit qu'on utilisait Pixabay car à ce moment là on n'avait pas changé mais nous ayant lâché le lendemain nous avons décidé de changer d'API).
Chaque restaurant possède une map qui change par rapport aux coordonnées présent dans la BD. L'API utilisé est Leaflet.

  ### Carte plats
  Chaque restaurant possède 9 plats générés aléatoirement (Mais nous avons que 9 plats sur la BD, il faudrait en ajouter plus pour avoir plus de variations), dans ces   plats il y a des entrées, des plats du jour et des déssert.
   
  ### Menu Restaurant
  Chaque restaurant possède 2 menus. Un menu gastronomique et un menu du midi. Chaque menu est généré aléatoirement, un menu c'est une entrée, un plat du jour et un     déssert. Le prix du menu vaut 0.8 * l'addition des prix des différents plats.
  
  ### Panier
  
  Nous avons un panier pour chaque restaurant, dès que nous ajoutons un plat ou un menu, celui-ci s'affiche dans le panier et met à jour le montant.
  On peut enlever un plat ou un menu du panier. Dès qu'on clique sur commander, une pop-up arrive est dit que cela a bien été commandé et remet le panier à son état     initial (On simule le paiement de l'utilisateur).
  





