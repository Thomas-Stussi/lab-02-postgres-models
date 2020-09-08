DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS spells;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS monsters;

CREATE TABLE characters (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  level INT CHECK (level > 0),
  class TEXT NOT NULL,
  race TEXT NOT NULL
);

-- CREATE TABLE spells (
--   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   name TEXT NOT NULL,
--   school TEXT NOT NULL,
--   level INT CHECK (level > 0, level < 10)
-- );

-- CREATE TABLE skills (
--   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   name TEXT NOT NULL,
--   ability TEXT CHECK (ability = ANY('{strength,dexterity,constitution,intelligence,wisdom,charisma}'))
-- );

-- CREATE TABLE items (
--   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   name TEXT NOT NULL,
--   type TEXT CHECK (type = ANY('{weapon,armor,wondrous}')),
--   rarity TEXT CHECK (rarity = ANY('{common,uncommon,rare,legendary}'))
-- );

-- CREATE TABLE monsters (
--   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   name TEXT NOT NULL,
--   type TEXT CHECK (type = ANY('{aberration,humanoid,beast,fiend}')),
--   challenge INT CHECK (challenge > 0)
-- );
