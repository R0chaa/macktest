import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ClassService } from "../services/ClassService";
import { FilterService } from "../services/FilterService";
import { StatsService } from "../services/StatsService";
import { FilterOptions, ClassesResponse } from "../types";

interface ClassesQuery {
  segmento?: string;
  ano?: string;
  tipo?: string;
  search?: string;
}

export async function classesRoutes(fastify: FastifyInstance) {
  const classService = new ClassService();
  const filterService = new FilterService();
  const statsService = new StatsService();

  // GET /api/classes
  // Lista todas as turmas com filtros opcionais

  fastify.get<{
    Querystring: ClassesQuery;
  }>(
    "/api/classes",
    async (
      request: FastifyRequest<{ Querystring: ClassesQuery }>,
      reply: FastifyReply
    ) => {
      try {
        const { segmento, ano, tipo, search } = request.query;

        const filters: FilterOptions = {};
        if (segmento) filters.segmento = segmento;
        if (ano) filters.ano = ano;
        if (tipo) filters.tipo = tipo;
        if (search) filters.search = search;

        const classes = await classService.getClasses(filters);
        const availableFilters = filterService.getAvailableFilters();

        const response: ClassesResponse = {
          classes,
          total: classes.length,
          filters: availableFilters,
        };

        return reply.code(200).send(response);
      } catch (error) {
        fastify.log.error(error);
        return reply.code(500).send({
          error: "Erro ao buscar turmas",
          message: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }
  );

  // GET /api/classes/:id
  // Busca uma turma específica por ID
  fastify.get<{
    Params: { id: string };
  }>(
    "/api/classes/:id",
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const { id } = request.params;
        const classData = await classService.getClassById(id);

        if (!classData) {
          return reply.code(404).send({
            error: "Turma não encontrada",
          });
        }

        return reply.code(200).send(classData);
      } catch (error) {
        fastify.log.error(error);
        return reply.code(500).send({
          error: "Erro ao buscar turma",
          message: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }
  );

  // GET /api/filters
  // Retorna opções disponíveis para filtros
  fastify.get(
    "/api/filters",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const filters = filterService.getAvailableFilters();
        return reply.code(200).send(filters);
      } catch (error) {
        fastify.log.error(error);
        return reply.code(500).send({
          error: "Erro ao buscar filtros",
          message: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }
  );

  // GET /api/stats
  // Retorna estatísticas do sistema
  fastify.get(
    "/api/stats",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const stats = statsService.getStats();
        return reply.code(200).send(stats);
      } catch (error) {
        fastify.log.error(error);
        return reply.code(500).send({
          error: "Erro ao buscar estatísticas",
          message: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }
  );
}
