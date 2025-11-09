# Exemplos de Uso da API

## Pré-requisitos

O servidor deve estar rodando:

```bash
cd backend
npm run dev
```

Deixei o servidor disponível em `http://localhost:3001`

## Exemplos com cURL

### 1. Health Check

```bash
curl http://localhost:3001/health
```

**Resposta esperada:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "macktest-backend"
}
```

### 2. Listar todas as turmas

```bash
curl http://localhost:3001/api/classes
```

### 3. Filtrar por segmento

```bash
curl "http://localhost:3001/api/classes?segmento=Ensino%20Médio"
```

### 4. Filtrar por ano/série

```bash
curl "http://localhost:3001/api/classes?ano=1ª%20Série"
```

### 5. Filtrar por tipo

```bash
curl "http://localhost:3001/api/classes?tipo=Regular"
```

### 6. Filtros combinados

```bash
curl "http://localhost:3001/api/classes?segmento=Ensino%20Médio&ano=1ª%20Série&tipo=Regular"
```

### 7. Buscar por nome

```bash
curl "http://localhost:3001/api/classes?search=Turma%20A"
```

### 8. Buscar turma por ID

```bash
curl http://localhost:3001/api/classes/1
```

### 9. Obter opções de filtros

```bash
curl http://localhost:3001/api/filters
```

**Resposta esperada:**

```json
{
  "segments": ["Ensino Fundamental", "Ensino Médio"],
  "years": ["1ª Série", "2ª Série", "3ª Série", "6º Ano", "7º Ano"],
  "types": ["Mista", "Regular", "Trilha"]
}
```

### 10. Obter estatísticas

```bash
curl http://localhost:3001/api/stats
```

**Resposta esperada:**

```json
{
  "studentsWithoutClass": 236,
  "classesWithIssues": 3
}
```

## Testando Pendências

A API identifica pendências nas turmas. Exemplos de turmas com pendências no arquivo mock data que deixei em repositories:

1. **Turma com tipo desconhecido** (ID: 2)

   - Type: `a`
   - Issue: `invalid_type`

2. **Turma sem tipo** (ID: 3)

   - Type: `null`
   - Issue: `no_type`

3. **Turma com nome inválido** (ID: 11)

   - Nome: `&Åbcdef 78/`
   - Issue: `invalid_name`

4. **Turma sem professores** (ID: 13)
   - TeacherCount: `0`
   - Issue: `no_teachers`

Para ver essas pendências:

```bash
curl http://localhost:3001/api/classes/11
curl http://localhost:3001/api/classes/12
curl http://localhost:3001/api/classes/13
```

## Resposta de Erro

Em caso de erro, a API retorna:

```json
{
  "error": "Mensagem de erro",
  "message": "Detalhes adicionais"
}
```

Exemplo (turma não encontrada):

```bash
curl http://localhost:3001/api/classes/999
```

**Resposta:**

```json
{
  "error": "Turma não encontrada"
}
```
