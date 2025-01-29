import fastify from 'fastify';
import { routes } from './routes';
import fastifyMultipart from '@fastify/multipart';
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static';
import path from 'path'

const app = fastify({ logger: true })

app.register(fastifyMultipart);
app.register(routes);
app.register(cors);

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'uploads'),
  prefix: '/uploads'
})

export default app;
