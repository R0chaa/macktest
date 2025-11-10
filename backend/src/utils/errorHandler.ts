import { FastifyReply, FastifyRequest } from "fastify";

export interface ApiError {
  error: string;
  message: string;
}

export class HttpStatus {
  static readonly OK = 200;
  static readonly CREATED = 201;
  static readonly NO_CONTENT = 204;
  static readonly NOT_FOUND = 404;
  static readonly INTERNAL_SERVER_ERROR = 500;
}

export class ErrorMessages {
  static readonly CLASSES_FETCH_ERROR = "Erro ao buscar turmas";
  static readonly CLASS_FETCH_ERROR = "Erro ao buscar turma";
  static readonly CLASS_NOT_FOUND = "Turma não encontrada";
  static readonly CLASS_CREATE_ERROR = "Erro ao criar turma";
  static readonly CLASS_UPDATE_ERROR = "Erro ao atualizar turma";
  static readonly CLASS_DELETE_ERROR = "Erro ao deletar turma";
  static readonly FILTERS_FETCH_ERROR = "Erro ao buscar filtros";
  static readonly STATS_FETCH_ERROR = "Erro ao buscar estatísticas";
  static readonly UNKNOWN_ERROR = "Erro desconhecido";
}

export function handleError(
  error: unknown,
  reply: FastifyReply,
  errorMessage: string
): FastifyReply {
  const message =
    error instanceof Error ? error.message : ErrorMessages.UNKNOWN_ERROR;
  return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({
    error: errorMessage,
    message,
  });
}

export function sendNotFound(
  reply: FastifyReply,
  message: string
): FastifyReply {
  return reply.code(HttpStatus.NOT_FOUND).send({
    error: message,
  });
}

export function sendSuccess<T>(
  reply: FastifyReply,
  data: T,
  statusCode: number = HttpStatus.OK
): FastifyReply {
  if (statusCode === HttpStatus.NO_CONTENT) {
    return reply.code(statusCode).send();
  }
  return reply.code(statusCode).send(data);
}
