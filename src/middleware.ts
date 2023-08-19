import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

/**
 * Un middleware en express est une fonction qui va s'exécuter avant la fonction
 * d'une route, ici je lui dis de vérifier si le param id est une chaîne de caractère
 * valide pour être un ObjectId mongodb, si non on renvoit une erreur 400. Si oui,
 * alors on fait un next() pour poursuivre l'exécution normale du code 
 */
export const checkId = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id && !ObjectId.isValid(req.params.id)) {
        res.status(400).end('Invalid id');
    } else {
        next();
    }
}