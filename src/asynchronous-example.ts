
/**
 * Un code synchrone est la manière par défaut de la plupart des langage d'exécuter du code :
 * l'exécution attend qu'une instruction soit terminée avant d'exécuter l'instruction suivante
 * A l'inverse, un code asynchrone va s'exécuter sans bloquer l'exécution de la suite
 * des instructions, il a donc fallu trouver des stratégie pour pouvoir faire quelque
 * chose avec le résultat d'un code asynchrone ou juste pour ajouter un comportement une fois
 * la tâche asynchrone terminée
 */
function synchrone() {
    let result=0;
    for(let i = 0; i < 100000000000; i++){
        result += i*i*i*i*i;
    }
    return result;
}
/**
 * Une des premières manière de gérer l'asynchrone est les "callback". La fonction asynchrone
 * attend en argument une fonction et cette fonction sera lancée une fois l'exécution de
 * la partie asynchrone terminée (à noter qu'ici, le code n'est pas vraiment asynchrone, c'est plus pour illustrer)
 * Cette stratégie devient assez difficile à gérer à partir du moment où on a plusieurs fonctions
 * asynchrone à utiliser en même temps, la gestion d'erreur est difficile et on peut vite se retrouver en
 * se retrouver en "callback hell" : une fonction dans une fonction dans une fonction dans une fonction dans une fonction....
 */
function asyncWithCallback(callback) {
    let result=0;
    for(let i = 0; i < 100000000000; i++){
        result += i*i*i*i*i;
    }
    callback(result);
}
/**
 * La manière la plus présente actuellement dans les fonctions asynchrone est la Promise.
 * La fonction renvoie un objet de type Promise sur lequel on peut lancer un .then en cas de succès ou un .catch en cas d'erreur
 * Le .then sera lancé une fois l'exécution de la méthode asynchrone terminée. Les Promises ont
 * la possibilité de s'enchaîner plus facilement que les callback et de pouvoir centraliser la gestion
 * des erreurs dans un seul .catch ce qui en fait un outil plus versatile et scallable
 */
function asyncWithPromise() {
    return new Promise((resolve) => {
        let result=0;
        for(let i = 0; i < 100000000000; i++){
            result += i*i*i*i*i;
        }
        resolve(result);
    } );
}

const result = synchrone();
console.log(result);

asyncWithCallback((result) => console.log(result));

asyncWithPromise().then(result => console.log(result));
/**
 * Depuis quelques version du JS, les fonctions qui utilisent des Promises peuvent
 * simplifier la syntaxe en remplaçant le .then par un async-await
 * Le code dans le doStuff correspond très exactement au code juste au dessus avec le
 * .then, mais le await remplace le then et rend la lecture du code plus simple
 */
async function doStuff() {
    const result = await asyncWithPromise();
    console.log(result);
}