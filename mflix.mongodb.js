use('mflix')
//Afficher les films dont le imdb rating est supérieur ou égal à 8.5
db.movies.find({'imdb.rating': {$gte:8.5}})
//Afficher les films réalisés par Sofia Coppola
db.movies.find({directors: 'Sofia Coppola'})
//Afficher les films qui ont dans leur cast Brendan Fraser
db.movies.find({cast: 'Brendan Fraser'}, {title:true})
//Afficher les films qui ont le français comme langue et qui sont sortie avant l'année 2000
db.movies.find({languages: 'French', year: {$lt: 2000}})
//Afficher les films dont les genres contiennent et Sci-Fi et Action
db.movies.find({genres: {$all:['Sci-Fi', 'Action']}})
// db.movies.find({$and:[{genres:'Action'}, {genres:'Sci-Fi'}]})
//Afficher les films dont le titre ou le plot contient le mot "moon"
db.movies.find({$or:[{title:{$regex:'moon'}}, {plot:{$regex:'moon'}}]}, {title:true})
//Afficher les films de plus de 2H en Russian
db.movies.find({languages:['Russian'], runtime:{$gt:120}})
//Afficher les films avec plus de 1 directors 
db.movies.find({'directors.1':{$exists:true}})
// db.movies.find({$expr:{$gt:[{$size:'$directors'}, 1]}})


db.movies.aggregate(
{
    $group:{
        _id:'$year', 
        moviePerYear:{
            $count:{}
        },
        avgRating:{
            $avg:'$imdb.rating'
        }
    }
},
{
    $match: {moviePerYear:{$gt:3}}
},
{
    $project: {
        moviePerYear: true,
        avgRating: {$round:['$avgRating', 1]}
    }
},
{ 
    $sort:{
        avgRating:-1
    }
}
);
//On "déballe" le tableau cast pour faire en sorte d'avoir un acteur unique par film (mais le film répété pour chaque membre du cast)
//On regroupe les document par le cast, donc par acteur, et on compte combien de document est associé à chaque acteur
//On fait un match pour filtrer uniquement les documents/acteurs qui ont joués dans 20 films ou plus
db.movies.aggregate(
    {
        $unwind: '$cast'
    },
    {
        $group: {
            _id:'$cast',
            moviePlayedIn: {$count:{}}
        }
    },
    {
        $match: {moviePlayedIn:{$gte:20}}
    }
    )