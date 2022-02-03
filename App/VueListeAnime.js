class VueListeAnime{
  constructor(){
    this.html = document.getElementById("html-vue-liste-cadeau").innerHTML;
    this.listeCadeauDonnee = null;
  }

  initialiserListeCadeau(listeCadeauDonnee){
    this.listeCadeauDonnee = listeCadeauDonnee;
  }

  afficher(){
    document.getElementsByTagName("body")[0].innerHTML = this.html;

    let listeCadeau = document.getElementById("liste-cadeau");
    const listeCadeauItemHTML = listeCadeau.innerHTML;
    let listeCadeauHTMLRemplacement = "";

    for(var numeroCadeau in this.listeCadeauDonnee){
      let listeCadeauItemHTMLRemplacement = listeCadeauItemHTML;
      listeCadeauItemHTMLRemplacement = listeCadeauItemHTMLRemplacement.replace("{Cadeau.id}",this.listeCadeauDonnee[numeroCadeau].id);
      listeCadeauItemHTMLRemplacement = listeCadeauItemHTMLRemplacement.replace("{Cadeau.nom}",this.listeCadeauDonnee[numeroCadeau].nom);
      listeCadeauHTMLRemplacement += listeCadeauItemHTMLRemplacement;
    }

    listeCadeau.innerHTML = listeCadeauHTMLRemplacement;
  }

}
