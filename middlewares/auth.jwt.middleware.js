const { Request, Response, NextFunction } = require("express");
const db = require("../models");
const customerService = require("../services/customer.service");
const { ErrorResponse } = require("../utils/error.response");
const jwt = require("../utils/jwt-utils");

//roles, contiendra un tableau avec les différents roles autorisés (ou ne sera pas existant si pas de role précisé et juste besoin d'être connecté)
const authJwt = (roles) => {
    /**
     * Middleware Pagination
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    return async (req, res, next) => {
        //Le token se trouvera (normalement) dans les headers de la requête, dans une propriété appelée Authorization et composée comme suis : 
        //   "Authorization" : "Bearer monsupertokentrestrestreslong"

        //étape 1 : Récupérer la valeur dans authorization
        const bearerToken = req.headers.authorization
        //console.log(req.headers);
        //console.log(bearerToken);
        //étape 2 : Découper ce qu'on vient de récupérer pour n'obtenir que le token
        //bearerToken.split(" ") va séparer la chaine là où il y a des espaces et renvoyer un tableau où chaque bout sera dans une case du tableau
        //première case : "Bearer"
        //deuxième case : "monsupertokentrestrestreslong"

        const token = bearerToken?.split(" ")[1];

        //Si pas de token -> l'utilisateur n'est pas connecté
        //On lui renvoie une erreur Unauthorized 401
        //TODO : Trouver meilleur fix pour token === 'undefined'
        if(!token || token === '' || token === 'undefined') {
            res.status(401).json(new ErrorResponse("Non autorisé : Vous devez être connecté", 401))
            return;
        }
        // console.log("HERE", token);

        //On essaie de décoder le token
        const payload = await jwt.decode(token);

        // console.log("PAYLOAD", payload);
        // console.log("ROLES", roles);

        //Si on a reçu un tableau de roles, on doit vérifier le role de l'utilisateur connecté pour voir s'il est présent dans le tableau
        if(roles){
            //#region explication pourquoi recherche db plutôt que sur payload.role
            //Nous avons accès dans payload.role, au rôle de l'utilisateur au moment où le token a été crée
            //Si la personne était admin à ce moment là, mais qu'on lui a retiré ce droit en db entre temps, elle aura accès à la requête alors qu'elle n'est pas sensée y avoir accès
            //On fera donc TOUJOURS une vérif db, plutôt que sur le payload
            //#endregion

            //Comme on a accès à l'id via payload.id, on peut faire une requête db, pour récupéré l'utilisateur
            const connectedUser = await customerService.getById(payload.id);
            if(!connectedUser){
                res.status(403).json(new ErrorResponse("PAYLOAD ID NOT FOUND", 403));
            }
            // console.log("CONNECTED USER", connectedUser);
            //Est-ce que le rôle de connectedUser est présent dans le tableau de rôles reçu en paramètre
            // tableau roles inclut le role user ?
            roles = roles.map(r => r.toLowerCase()); //On transforme le tableau de roles reçu en paramètre tout en minuscle comme ça on pourra comparer au role connectedUser converti en minuscle aussi (plus de soucis de casse)
            const canAccess = roles.includes(connectedUser.role.toLowerCase())
            //Si le role n'est pas dans le tableau de roles
            if(!canAccess) {
                //On renvoie une erreur Forbidden 403
                res.status(403).json(new ErrorResponse("Accès interdit", 403));
                return;
            }
        }
        
        req.user = payload

        next()

    }
}

module.exports = authJwt