import 'dotenv/config'; //Import nécessaire pour que les fichier .env soient pris en compte et charger dans le process.env
import express from 'express';
import cors from 'cors';
import { exampleController } from './controller/example-controller';
import { firstController } from './controller/first-controller';
import { personController } from './controller/person-controller';
import { authController } from './controller/auth-controller';
//On choisit le port sur lequel tournera l'application en indiquant 3000 par défaut mais modifiable par une variable d'environnement
const port = process.env.PORT || 3000;

//On crée l'application express
const app = express();
//On indique à notre application de convertir les body des requêtes JSON en objet js
app.use(express.json());
app.use(cors());

//Ici, on assigne notre contrôleur à la route /api/example, ce qui fait que toutes les routes définies dans le contrôleur seront préfixées par /api/example
app.use('/api/example', exampleController);
app.use('/api/first', firstController);
app.use('/api/person', personController);
app.use( authController);

//On dit à l'application d'écouter les requêtes http sur le port choisit
app.listen(port, () => {
    console.log('listening on http://localhost:'+port);
});