import Fastify from "fastify";
import cors from "@fastify/cors";
import { classesRoutes } from "./routes/classes";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const HOST = process.env.HOST || "0.0.0.0";

async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: "info",
    },
  });

  // CORS para permitir requisições do front
  await fastify.register(cors, {
    origin: true,
    credentials: true,
  });

  // Health check pra saber se o server esta ok
  fastify.get("/health", async (req, res) => {
    return res.code(200).send({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "macktest-backend",
    });
  });

  // Registra rotas
  await fastify.register(classesRoutes);

  return fastify;
}

async function start() {
  try {
    const server = await buildServer();
    await server.listen({ port: PORT, host: HOST });

    console.log(`
  URL: http://localhost:${PORT}
  Endpoints disponíveis:
   - GET /health
   - GET /api/classes
   - GET /api/classes/:id
   - GET /api/filters
   - GET /api/stats
    `);
  } catch (err) {
    console.error("Erro ao iniciar servidor:", err);
    process.exit(1);
  }
}

start();
