//Import de jsonwebtoken pour pouvoir utiliser la librairie et les méthodes associées
const jsonwebtoken = require('jsonwebtoken')
//https://www.npmjs.com/package/jsonwebtoken

const { JWT_SECRET, JWT_AUDIENCE, JWT_ISSUER } = process.env

const jwt = {
    //Génération d'un token à partir des infos du user, d'options et d'un secret
    generate : ({user_id, user_role}) => {
        //La génération de token pouvant potentiellement échouer, on va renvoyer une promesse lors de la génération pour gérer les erreurs
        return new Promise((resolve, reject) => {

            //#region Explications payload, secret, headers (options)
            //La méthode sign de jsonwebtoken, nous permet de créer un token à partir de plusieurs informations
            // sign(payload, secret, options/headers)
            // payload : Les informations qui proviennent de l'utilisateur, qu'on veut aller stocker dans notre token
            // secret : Une chaine de caractères qui va servir pour le hash, souvent généré aléatoirement. C'est l'API qui détient ce secret pour encoder et décoder le token et cette information ne doit donc JAMAIS apparaître en clair dans le code et sur git (on utilisera les variables d'environnement ET ON OUBLIE PAS LE GITIGNORE)
            // options/headers : Les deux noms sont souvent rencontrés, contiendra toutes les options qu'on veut fournir pour créer le token, nous allons utiliser :
            //algorithm : méthode de hash
            //expireIn : la durée de vie du token
            //issuer : "MusicApi" -> De qui provient le token (notre application API)
            //audience : "AngularSpotify" -> A qui est destiné le token (la ou les appli qui vont l'utiliser) peut être, une chaine (si 1 appli ), un tableau (si plein d'appli) 
            //#endregion
            const payload = { user_id, user_role }
            // console.log("JWT UTILS PAYLOAD GENERATE", payload);
            const secret = JWT_SECRET
            const options = {
                algorithm : "HS512", //'HS256', 'HS384', 'HS512' (default HS512)
                expiresIn : "365d", //https://github.com/vercel/ms
                issuer : JWT_ISSUER,
                audience : JWT_AUDIENCE,
            }

            //En plus du payload, secret, options, on aura en 4ème paramètre, un callback avec gestion d'erreur ou token si pas d'erreur
            jsonwebtoken.sign(payload, secret, options, (error, token) => {
                //Si y'a une erreur
                if(error) {
                    //On reject la promesse en envoyant les erreurs
                    reject(error)
                }
                //Sinon, on resolve en renvoyant le token
                resolve(token)
            })
        })
    },

    //Renvoie des infos du user (payload), à partir d'un token (décodé), d'options et d'un secret
    decode : (token) => {
        //Si pas géré par le muser_iddleware :
        // //Si token est null ou undefined
        // if(!token || token === ''){
        //     //On envoie directement une promesse rejetée
        //     return Promise.reject("No Token")
        // }

        //Si on a vraiment token, là, on renvoie une promesse dans laquelle on promet de faire la vérification
        return new Promise((resolve, reject) => {

            const options = {
                issuer : JWT_ISSUER,
                audience : JWT_AUDIENCE
            }
            //verify(token, secret, header)
            //en 4ème paramètre, une méthode avec error ou payload,
            jsonwebtoken.verify(token, JWT_SECRET, options, (error, payload) => {
                //Si error, on reject
                if(error) {
                    reject(error)
                }
                // console.log("JWT UTILS PAYLOAD DECODE", payload);
                //Si pas d'erreur, on résoud la promesse en renvoyant le payload (données user)
                resolve(payload)


            } )
        })
    }
}

module.exports = jwt