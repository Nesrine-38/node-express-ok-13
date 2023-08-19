import { Router } from "express";
import { connection } from "../repository/connection";

//Un Router express est un peu l'équivalent d'une classe Controller en Symfony, il servira à regrouper les routes/méthodes thématiquement liées
export const exampleController = Router();

//accessible sur http://localhost:3000/api/example en GET
exampleController.get('/', async (req,res)=> {
    const db = connection.db('first');
    const collection  =db.collection('person');
    const list = await collection.find().toArray();
    res.json(list);



})
//accessible sur http://localhost:3000/api/example/bloup en GET
exampleController.get('/bloup', (req,res) => {
    res.send('yes, bloup')
})

