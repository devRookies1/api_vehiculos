import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import rutasVehiculo from './views/vehiculos/rutas.js';
import rutasUsuario from './views/usuarios/rutas.js';
import rutasVenta from './views/ventas/rutas.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVehiculo);
app.use(rutasUsuario);
app.use(rutasVenta);

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://devrookies-vehiculos.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'api-autenticacion-vehiculos',
  issuer: 'https://devrookies-vehiculos.us.auth0.com/',
  algorithms: ['RS256'],
});

app.use(jwtCheck);


const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
  });
};

conectarBD(main);