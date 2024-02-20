import fastify, { FastifyInstance } from "fastify";
import cors from '@fastify/cors';
import 'dotenv/config';
import routes from "./routes/routes";

export const app: FastifyInstance = fastify({ logger: true });
app.register(routes);
app.register(cors, {});

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT) || 3000;

app.listen({
  host: HOST,
  port: PORT,
}, (err, _address) => {
  if (err) console.log(err);

  console.log(`Server is running http://${HOST}:${PORT}`);
});