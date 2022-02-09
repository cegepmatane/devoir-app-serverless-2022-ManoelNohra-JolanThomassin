class AnimeDAO{
  lister(action){
    fetch("https://pji4gfywn9.execute-api.us-east-1.amazonaws.com/default/lister", {mode:'cors'})
      .then(response => response.json())
      .then(data =>
        {
          console.log(data);
          let listeAnime = [];
          for(let position in data){
            let anime = new Anime(data[position].titre,
                                    data[position].annee,
                                    data[position].genre,
                                    data[position].id,
                                    data[position].studio);
            console.log(anime);
            listeAnime.push(anime);
          }
          action(listeAnime);
        });
  }
  chercher(id, action){
    fetch("https://lzkppvwgh4.execute-api.us-east-1.amazonaws.com/default/chercher-par-id?id=" + id , {mode:'cors'})
      .then(response => response.json())
      .then(data =>
        {
          console.log(data);
          let anime = new Anime(data.titre,
                                  data.annee,
                                  data.genre,
                                  data.id,
                                  data.studio);
          action(anime);
        });
  }
  ajouter(anime, action){
    fetch("https://5lwcfrses5.execute-api.us-east-1.amazonaws.com/default/ajouter",
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded'
        },
        body: "animejson=" + JSON.stringify(anime),
        mode:'cors',
      })
      .then(response => response.text())
      .then(data =>
        {
          console.log('Détail:', data);
          action();
        });
  }
}

