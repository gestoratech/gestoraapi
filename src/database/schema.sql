CREATE DATABASE gestoradb;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE roles AS ENUM('Usuário', 'Administrador') DEFAULT 'Usuário';
CREATE TYPE sectors AS ENUM('Administrativo', 'Comercial', 'Contábil', 'Contábil II', 'Fiscal Contábil', 
                             'Controladoria', 'Diretoria', 'DP', 'Financeiro', 'Fiscal', 'Marketing',
                             'Qualidade', 'RH', 'Societário', 'TI', 'Indeterminado');


CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  ramal INT DEFAULT 0,
  role roles DEFAULT 'Usuário', 
  sector sectors DEFAULT 'Indeterminado'
);

CREATE TABLE IF NOT EXISTS inventories (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  username VARCHAR not null, -- usuário que está com a máquina
  sector varchar not null, -- setor onde está a máquina
  model VARCHAR NOT NULL, -- modelo da máquina
  brand VARCHAR NOT NULL, -- marca da máquina
  asset VARCHAR NOT NULL, -- número de patrimônio da máquina
  equipment varchar not null, -- código serial number equipamento
  keyboard varchar not null, -- código serial number teclado
  mouse varchar not null -- código serial number mouse
);
