import { MongoClient } from "mongodb";

//Connexion à la base de données mongodb en se servant d'une variable d'environnement qui sera dans le .env
export const connection = new MongoClient(process.env.DATABASE_URL!);