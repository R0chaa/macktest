-- 1. Verificar se a tabela existe e quantos registros tem
SELECT 
  COUNT(*) as total_turmas,
  COUNT(DISTINCT segment) as total_segmentos,
  COUNT(DISTINCT year) as total_anos,
  COUNT(DISTINCT type) as total_tipos
FROM classes;

-- 2. Listar todas as turmas
SELECT 
  id,
  name,
  segment,
  year,
  type,
  teacher_count,
  student_count,
  is_new,
  created_at
FROM classes
ORDER BY id;

-- 3. Testar filtro por segmento
SELECT 
  id,
  name,
  segment,
  year,
  type
FROM classes
WHERE segment = 'Ensino Médio'
ORDER BY name;

-- 4. Testar filtro por ano/série
SELECT 
  id,
  name,
  segment,
  year,
  type
FROM classes
WHERE year = '1ª Série'
ORDER BY name;

-- 5. Testar filtro por tipo
SELECT 
  id,
  name,
  segment,
  year,
  type
FROM classes
WHERE type = 'Regular'
ORDER BY name;

-- 6. Testar busca por nome
SELECT 
  id,
  name,
  segment,
  year,
  type
FROM classes
WHERE name ILIKE '%Turma A%'
ORDER BY name;

-- 7. Testar múltiplos filtros combinados
SELECT 
  id,
  name,
  segment,
  year,
  type,
  teacher_count,
  student_count
FROM classes
WHERE segment = 'Ensino Médio'
  AND year = '1ª Série'
  AND type = 'Regular'
ORDER BY name;

-- 8. Verificar turmas com is_new = true
SELECT 
  id,
  name,
  is_new
FROM classes
WHERE is_new = true
ORDER BY name;

-- 9. Teste de busca combinada (simulando a API)
SELECT 
  id,
  name,
  segment,
  year,
  type,
  teacher_count,
  student_count,
  is_new
FROM classes
WHERE 
  (segment = 'Ensino Médio' OR segment IS NULL)
  AND (year = '1ª Série' OR year IS NULL)
  AND (name ILIKE '%Turma%' OR name IS NULL)
ORDER BY name
LIMIT 10;