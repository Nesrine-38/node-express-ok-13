
import { ObjectId } from "mongodb";
import { Person } from "../entities";
import { connection } from "./connection"

const collection = connection.db('first').collection<Person>('person');

export const personRepository = {
    findAll(){
        return collection.find().toArray();
    },
    findById(_id:string) {
        return collection.findOne(new ObjectId(_id));
    },
    async persist(person:Person) {
        const result= await collection.insertOne(person);
        person._id = result.insertedId; //On assigne l'id auto-généré à l'objet person
        return person;
    },
    remove(_id:string) {
        return collection.deleteOne({_id:new ObjectId(_id)});
    },
    update(_id:string, person:Person) {
        return collection.updateOne({_id:new ObjectId(_id)}, {$set:person});
    }
}
