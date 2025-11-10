CREATE TABLE IF NOT EXISTS classes (
  id TEXT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  segment VARCHAR(255) NOT NULL,
  year VARCHAR(50) NOT NULL,
  type VARCHAR(50),
  teacher_count INTEGER NOT NULL DEFAULT 0,
  student_count INTEGER NOT NULL DEFAULT 0,
  is_new BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_classes_segment ON classes(segment);
CREATE INDEX IF NOT EXISTS idx_classes_year ON classes(year);
CREATE INDEX IF NOT EXISTS idx_classes_type ON classes(type);
CREATE INDEX IF NOT EXISTS idx_classes_name ON classes(name);

INSERT INTO classes (id, name, segment, year, type, teacher_count, student_count, is_new) VALUES
  ('1', 'Turma A', 'Ensino Médio', '1ª Série', 'Regular', 7, 26, true),
  ('2', 'Turma B', 'Ensino Médio', '1ª Série', 'a', 7, 26, true),
  ('3', 'Turma C', 'Ensino Médio', '1ª Série', '', 7, 26, false),
  ('4', 'Turma D', 'Ensino Médio', '1ª Série', 'Trilha', 7, 26, true),
  ('5', 'Turma E', 'Ensino Médio', '2ª Série', 'Mista', 6, 24, true),
  ('6', 'Turma F', 'Ensino Médio', '2ª Série', 'Regular', 5, 22, false),
  ('7', 'Turma G', 'Ensino Médio', '3ª Série', 'Trilha', 8, 28, true),
  ('8', 'Turma H', 'Ensino Médio', '3ª Série', 'Regular', 7, 25, false),
  ('9', 'Turma I', 'Ensino Médio', '1ª Série', 'Regular', 5, 20, true),
  ('10', 'Turma J', 'Ensino Médio', '1ª Série', 'Mista', 6, 23, false),
  ('11', '&Åbcdef 78/', 'Ensino Médio', '1ª Série', 'Regular', 7, 26, true),
  ('12', 'Turma L', 'Ensino Médio', '1ª Série', NULL, 7, 26, false),
  ('13', 'Turma M', 'Ensino Médio', '2ª Série', 'Regular', 0, 26, true),
  ('14', 'Turma N', 'Ensino Médio', '1ª Série', 'Mista', 7, 26, true)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON classes;
CREATE POLICY "Allow public read access" ON classes
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow service role full access" ON classes;
CREATE POLICY "Allow service role full access" ON classes
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_classes_updated_at ON classes;
CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON classes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();