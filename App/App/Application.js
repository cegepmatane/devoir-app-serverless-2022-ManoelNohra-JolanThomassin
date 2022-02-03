class Application {
  constructor(window, vueListeCadeau, vueCadeau, vueAjouterCadeau, cadeauDAO){

    this.window = window;

    this.vueListeCadeau = vueListeCadeau;

    this.vueCadeau = vueCadeau;

    this.vueAjouterCadeau = vueAjouterCadeau;
    // C'est l'équivalent de function(cadeau){this.ajouterCadeau(cadeau)}
    this.vueAjouterCadeau.initialiserAjouterCadeau(cadeau =>this.ajouterCadeau(cadeau));

    this.cadeauDAO = cadeauDAO;

    // C'est l'équivalent de function(){this.naviguer()}
    this.window.addEventListener("hashchange", () =>this.naviguer());

    this.naviguer();
  }

  naviguer(){
    let hash = window.location.hash;

    if(!hash){

      this.cadeauDAO.lister((listeCadeau) => this.afficherNouvelleListeCadeau(listeCadeau));

    }else if(hash.match(/^#ajouter-cadeau/)){

      this.vueAjouterCadeau.afficher();

    }else{

      let navigation = hash.match(/^#cadeau\/([0-9]+)/);
      let idCadeau = navigation[1];

      this.cadeauDAO.chercher(idCadeau, (cadeau) => this.afficherNouveauCadeau(cadeau));
    }
  }

  afficherNouvelleListeCadeau(listeCadeau){

    console.log(listeCadeau);
    this.vueListeCadeau.initialiserListeCadeau(listeCadeau);
    this.vueListeCadeau.afficher();
  }

  afficherNouveauCadeau(cadeau){
    console.log(cadeau);
    this.vueCadeau.initialiserCadeau(cadeau);
    this.vueCadeau.afficher();
  }

  ajouterCadeau(cadeau){
    this.cadeauDAO.ajouter(cadeau, () => this.afficherListeCadeau());
  }

  afficherListeCadeau(){
    this.window.location.hash = "#";
  }
}

new Application(window, new VueListeCadeau(), new VueCadeau(), new VueAjouterCadeau(), new CadeauDAO());

