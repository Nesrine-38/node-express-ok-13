import { User } from "../entities";
import { connection } from "./connection";

const collection = connection.db('first').collection<User>('user');

export const userRepository = {
    findByEmail(email:string) {
        return collection.findOne({email});
    },
    async persist(user:User) {
        const result= await collection.insertOne(user);
        user._id = result.insertedId; //On assigne l'id auto-généré à l'objet person
        return user;
    }
};