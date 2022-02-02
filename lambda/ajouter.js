console.log('Loading function');

var AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const querystring = require('querystring');

exports.handler = async (event) => {
  const postdata = querystring.parse(event.body);
  
  let anime = null;
  let animejson = postdata["animejson"];
  if(animejson){
    anime = JSON.parse(animejson);
  }
  
  let response = {
    statusCode: 400,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    body : "Pas d'animé reçu",
  };
  
  if (anime == null) {
    return response;
  }

  anime.id = Date.now();

  const params = {
      Bucket: "app-anime",
      Key: "liste-anime.json",
  };

  let data = await s3.getObject(params).promise();
  let listeAnimeJson = data.Body.toString('utf-8');
  const listeAnime = JSON.parse(listeAnimeJson);
  listeAnime.push(anime);
  listeAnimeJson = JSON.stringify(listeAnime);
  params.Body  = listeAnimeJson;
  data = await s3.putObject(params).promise();

  response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: anime.id
  };

  return response;
};
