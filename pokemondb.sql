-- ================================
-- DATABASE
-- ================================
DROP DATABASE IF EXISTS pokemondb;
CREATE DATABASE pokemondb
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE pokemondb;

-- Forzar charset y collation compatibles
SET NAMES utf8mb4 COLLATE utf8mb4_general_ci;
SET FOREIGN_KEY_CHECKS = 0;

-- ================================
-- TABLE: games
-- ================================
DROP TABLE IF EXISTS games;
CREATE TABLE games (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT DEFAULT NULL,
  win INT DEFAULT NULL,
  lose INT DEFAULT NULL,
  date TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

-- ================================
-- TABLE: pokemons
-- ================================
DROP TABLE IF EXISTS pokemons;
CREATE TABLE pokemons (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) DEFAULT NULL,
  image VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

-- ================================
-- TABLE: users
-- ================================
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) DEFAULT NULL,
  lastname VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  password VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

-- ================================
-- DATA: users
-- ================================
INSERT INTO users (name, lastname, email, password) VALUES
('Angel Arturo','rangel','rangelvasquezangelarturo81@gmail.com','12345'),
('Daila','rangel','dailarangel@gmail.com','67456');

SET FOREIGN_KEY_CHECKS = 1;