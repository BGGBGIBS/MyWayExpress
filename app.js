require('dotenv').config();
var express = require('express');
var {AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL, AUTH0_TOKEN_SIGNING_ALG, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET} = process.env;

var app = express();
var cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
require('express-async-errors');
var db = require('./models');

const dotenv = require('dotenv');


// Charge les variables d'environnement en fonction du mode d'exécution
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
  } else {
    dotenv.config({ path: '.env' });
  }

app.use(cors());
db.sequelize.authenticate()
.then(() => console.log('Connection DB successfull'))
.catch((err) => console.log('Connection DB failed : ', err))

if (process.env.NODE_ENV === 'development') {
    // db.sequelize.sync({ force : true }); 
    // ↑ Force comme un bourrin, supprime les tables et recréer tout à chaque sync
    // db.sequelize.sync({ alter : { drop : false} });
    // ↑ Regared l'état actuel de la db, ajoute ce qui peut être ajouté, modifie les colonnes, suppression de colonnes et/ou tables interdite
    // db.institution.sync({ alter : { drop : false }}); // ← Pour synchroniser juste un model
}

app.use(express.json());
app.use(express.static('public'));

var router = require('./routes');
app.use('/api', router);



// const jwtCheck = auth({
//   audience: AUTH0_AUDIENCE,
//   issuerBaseURL: AUTH0_ISSUER_BASE_URL,
//   tokenSigningAlg: AUTH0_TOKEN_SIGNING_ALG
// });

// app.use(jwtCheck);



// var request = require("request");

// var options = { method: 'POST',
//   url: `${AUTH0_ISSUER_BASE_URL}oauth/token`,
//   headers: { 'content-type': 'application/json' },
//   body: JSON.stringify({"client_id":AUTH0_CLIENT_ID,"client_secret":AUTH0_CLIENT_SECRET,"audience":AUTH0_AUDIENCE,"grant_type":"client_credentials"}) };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//   console.log("BODY : ",body);
// });


app.listen(process.env.PORT, () => {
    console.log(`Server API started on port:${process.env.PORT}`);
})