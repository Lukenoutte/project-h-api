import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import { jsonParse, authorization, rateLimit, subdomain } from '../middlewares';
import setupRoutes from './routes';

const app = express();

app.use(rateLimit);
app.use(jsonParse);
app.use(helmet());
app.use(xss());
app.use(authorization);
app.use(subdomain);
app.use(cors({ origin: 'http://dikarts.vendur.com.br:3000' }));

setupRoutes(app);

export default app;
