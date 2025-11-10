import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ClassService } from "@/services/ClassService";
import { FilterService } from "@/services/FilterService";
import { StatsService } from "@/services/StatsService";
import { ClassesResponse, Class } from "@/types";
import {
  handleError,
  sendNotFound,
  sendSuccess,
  HttpStatus,
  ErrorMessages,
} from "@/utils/errorHandler";
import { buildFiltersFromQuery } from "@/utils/filterBuilder";

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

  fastify.get<{
    Querystring: ClassesQuery;
  }>(
    "/api/classes",
    async (
      request: FastifyRequest<{ Querystring: ClassesQuery }>,
      reply: FastifyReply
    ) => {
      try {
        const filters = buildFiltersFromQuery(request.query);
        const classes = await classService.getClasses(filters);
        const availableFilters = await filterService.getAvailableFilters();

        const response: ClassesResponse = {
          classes,
          total: classes.length,
          filters: availableFilters,
        };

        return sendSuccess(reply, response);
      } catch (error) {
        fastify.log.error(error);
        return handleError(error, reply, ErrorMessages.CLASSES_FETCH_ERROR);
      }
    }
  );

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
          return sendNotFound(reply, ErrorMessages.CLASS_NOT_FOUND);
        }

        return sendSuccess(reply, classData);
      } catch (error) {
        fastify.log.error(error);
        return handleError(error, reply, ErrorMessages.CLASS_FETCH_ERROR);
      }
    }
  );

  fastify.get(
    "/api/filters",
    async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const filters = await filterService.getAvailableFilters();
        return sendSuccess(reply, filters);
      } catch (error) {
        fastify.log.error(error);
        return handleError(error, reply, ErrorMessages.FILTERS_FETCH_ERROR);
      }
    }
  );

  fastify.get(
    "/api/stats",
    async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const stats = await statsService.getStats();
        return sendSuccess(reply, stats);
      } catch (error) {
        fastify.log.error(error);
        return handleError(error, reply, ErrorMessages.STATS_FETCH_ERROR);
      }
    }
  );

  fastify.post<{
    Body: Omit<Class, "issues" | "id">;
  }>(
    "/api/classes",
    async (
      request: FastifyRequest<{ Body: Omit<Class, "issues" | "id"> }>,
      reply: FastifyReply
    ) => {
      try {
        const classData = request.body;
        const newClass = await classService.createClass(classData);
        return sendSuccess(reply, newClass, HttpStatus.CREATED);
      } catch (error) {
        fastify.log.error(error);
        return handleError(error, reply, ErrorMessages.CLASS_CREATE_ERROR);
      }
    }
  );

  fastify.put<{
    Params: { id: string };
    Body: Partial<Omit<Class, "issues" | "id">>;
  }>(
    "/api/classes/:id",
    async (
      request: FastifyRequest<{
        Params: { id: string };
        Body: Partial<Omit<Class, "issues" | "id">>;
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { id } = request.params;
        const updates = request.body;
        const updated = await classService.updateClass(id, updates);

        if (!updated) {
          return sendNotFound(reply, ErrorMessages.CLASS_NOT_FOUND);
        }

        return sendSuccess(reply, updated);
      } catch (error) {
        fastify.log.error(error);
        return handleError(error, reply, ErrorMessages.CLASS_UPDATE_ERROR);
      }
    }
  );

  fastify.delete<{
    Params: { id: string };
  }>(
    "/api/classes/:id",
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const { id } = request.params;
        const deleted = await classService.deleteClass(id);

        if (!deleted) {
          return sendNotFound(reply, ErrorMessages.CLASS_NOT_FOUND);
        }

        return sendSuccess(reply, null, HttpStatus.NO_CONTENT);
      } catch (error) {
        fastify.log.error(error);
        return handleError(error, reply, ErrorMessages.CLASS_DELETE_ERROR);
      }
    }
  );
}
