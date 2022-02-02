console.log('Loading function');

var AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

exports.handler = async (event) => {
  const id = event.queryStringParameters && event.queryStringParameters.id;

  let response = {
    statusCode: 400,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    }, 
    body: 'Vous devez donner un id d\'animé'
  };
  if (id == null) {
    return response;
  }

  const params = {
      Bucket: "app-anime",
      Key: "liste-anime.json",
  };

  const data = await s3.getObject(params).promise();
  console.log("Raw text:\n" + data.Body.toString('utf-8'));
  const listeAnimeJson = data.Body.toString('utf-8');
  const listeAnime = JSON.parse(listeAnimeJson);

  let anime = listeAnime.find(anime => anime.id == id);

  response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      }, 
      body: JSON.stringify(anime).toString('utf-8')
  };
  
  return response;
};

