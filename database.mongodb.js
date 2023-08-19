

use('first');

//Afficher les persons qui s'appellent Paul 
db.person.find({name:'Paul'})
//Afficher les persons qui s'appellent Jean et qui ont plus de 10 ans
db.person.find({name:'Jean', age:{$gt:10}})
//Afficher les persons qui ont 35 ou 45 ans
db.person.find({$or:[{age:45}, {age:31}]})
//Ou bien, vu qu'on ne cherche que pour un seul champ, on peut utiliser $in
db.person.find({age:{$in:[31,45]}})
//Afficher les persons qui habitent à Grenoble
db.person.find({'address.city': 'Grenoble'})
//Afficher les persons qui n'habitent pas à Lyon
db.person.find({'address.city': {$ne:'Lyon'}})
//Afficher le nombre de persons qui habitent à Grenoble
db.person.find({'address.city': 'Grenoble'}).count()

//faire une "projection" qui ne renverra que le name dans les résultats
db.person.find({}, {name:true})

//Recherche un élément par son _id
//db.person.findOne(ObjectId('64b6567a6d7cc7e7ff0c8421'))
//Le findOneAndReplace recherche un document qui match la recherche en premier argument et le remplace complètement par l'objet en deuxième argument
db.person.findOneAndReplace({_id:ObjectId('64b6567a6d7cc7e7ff0c8421')}, {age: 78, name:'Jean', address: {}})
//Tandis que le findOneAndUpdate va commencer de la même manière mais permettra de mettre à jour un seul champ (ou plusieurs, comme on veut) avec un $set ou un $inc ou autre
db.person.findOneAndUpdate({_id:ObjectId('64b6567a6d7cc7e7ff0c8421')}, {$set:{age: 78}})
 db.person.insertMany([
     {
         name: 'Paul',
         age: 25,
        address: {
             number: '54',
            street: 'rue du truc',
             city: 'Grenoble',
             country:'France'
         }
     },
     {
         name: 'Soumia',
         age: 45,
         address: {
             number: '14',
             street: 'rue du truc',
             city: 'Grenoble',
             country:'France'
         }
     },
     {
        name: 'Ahmed',
         age: 15,
         address: {
             number: '43',
             street: 'rue du truc',
             city: 'Lyon',
             country:'France'
         }
     },
     {
         name: 'Ling',
         age: 55,
         address: {
             number: '54',
             street: 'rue du truc',
             city: 'Lyon',
             country:'France'
         }
     },
     {
         name: 'Jean',
         age: 31,
         address: {
             number: '54',
             street: 'rue du truc',
            city: 'Lyon',
             country:'France'
         }
    },
    {
        name: 'Paul',
         age: 65,
        address: {
             number: '12',
             street: 'rue du truc',
             city: 'Chambéry',
             country:'France'
         }
     },
     {
        name: 'Leslie',
         age: 77,
         address: {
             number: '54',
             street: 'rue du truc',
             city: 'Chambéry',
             country:'France'
         }
     }
 ])

//On peut ajouter de nouveaux documents avec la fonction insertOne ou insertMany pour en rajouter plusieurs
//Les collections mongodb n'ont pas de structure définie, c'est donc à nous de faire en sorte d'avoir une concordance des données
// db.person.insertOne({
//     name: 'Jon',
//     age: 35,
//     address: {
//         street: 'rue je sais pas quoi',
//         number: ''24'',
//         city: 'Grenoble',
//         country: 'France'
//     }
// })

//Le deleteMany est comme le DELETE FROM, si on ne lui dit pas ce qu'on veut remove, il dégage tout. Pour supprimer
//Un seul élément on utilise deleteOne()
// db.person.deleteMany({})
