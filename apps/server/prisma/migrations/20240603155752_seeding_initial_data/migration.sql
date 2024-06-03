-- -------------------------------------------------------------
-- TablePlus 6.0.4(556)
--
-- https://tableplus.com/
--
-- Database: cookunity
-- Generation Time: 2024-06-03 11:38:00.9180
-- -------------------------------------------------------------

CREATE OR REPLACE FUNCTION execute_sql_on_dev_db() RETURNS VOID AS $$
BEGIN
  IF current_database() = 'dev-db' THEN
    INSERT INTO "public"."PokemonCard" ("id", "name", "hp", "types", "baseDamage") VALUES
    ('ex14-68', 'Treecko δ', 40, '{Psychic}', 10),
    ('si1-3', 'Onix', 90, '{Fighting}', 40),
    ('sm11-55', 'Pikachu', 60, '{Lightning}', 20),
    ('sm8-126', 'Scizor', 120, '{Metal}', 60),
    ('sv2-133', 'Sneasel', 70, '{Darkness}', 20),
    ('sv5-41', 'Feraligatr', 180, '{Water}', 160),
    ('xy2-11', 'Charizard-EX', 180, '{Fire}', 120);

    INSERT INTO "public"."Resistance" ("id", "type", "value", "cardId") VALUES
    ('clwx47sq10001qafgjw3xx6jw', 'Water', '-30', 'ex14-68'),
    ('clwx49ks40009qafgodt4yxu4', 'Metal', '-20', 'sm11-55'),
    ('clwy4udkr000543bmf989ix64', 'Psychic', '-20', 'sm8-126');

    INSERT INTO "public"."Weakness" ("id", "type", "value", "cardId") VALUES
    ('clwx47sq10000qafgmekld0a6', 'Fire', '×2', 'ex14-68'),
    ('clwx49ks40008qafgstc09h03', 'Fighting', '×2', 'sm11-55'),
    ('clwy4ss9s000043bmr7gr3evp', 'Water', '×2', 'xy2-11'),
    ('clwy4t6fz000143bmno9dr3fs', 'Grass', '×2', 'si1-3'),
    ('clwy4tirc000243bm3gjkhaax', 'Lightning', '×2', 'sv5-41'),
    ('clwy4tvni000343bmbv3184kn', 'Grass', '×2', 'sv2-133'),
    ('clwy4udkr000443bmwxchggks', 'Fire', '×2', 'sm8-126');
  END IF;
END;
$$ LANGUAGE plpgsql;

SELECT execute_sql_on_dev_db();

DROP FUNCTION execute_sql_on_dev_db();

