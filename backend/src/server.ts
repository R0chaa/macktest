import Fastify from "fastify";
import cors from "@fastify/cors";
import { classesRoutes } from "@/routes/classes";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const HOST = process.env.HOST || "0.0.0.0";

async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: "info",
    },
  });

  await fastify.register(cors, {
    origin: true,
    credentials: true,
  });

  fastify.get("/health", async (_req, res) => {
    return res.code(200).send({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "macktest-backend",
    });
  });

  await fastify.register(classesRoutes);

  return fastify;
}

async function start() {
  try {
    const server = await buildServer();
    await server.listen({ port: PORT, host: HOST });

    console.log(`
  URL: http://localhost:${PORT}
  Fonte de dados: Dados mockados

  Endpoints disponíveis:
   - GET /health
   - GET /api/classes
   - GET /api/classes/:id
   - GET /api/filters
   - GET /api/stats
   - POST /api/classes
   - PUT /api/classes/:id
   - DELETE /api/classes/:id
    `);
  } catch (err) {
    console.error("Erro ao iniciar servidor:", err);
    process.exit(1);
  }
}

start();
