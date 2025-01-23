import fastify from 'fastify';
import { routes } from './routes';
import fastifyMultipart from '@fastify/multipart';

const app = fastify({ logger: true })

app.register(fastifyMultipart);
app.register(routes);

export default app;
