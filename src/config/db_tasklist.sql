DROP DATABASE db_tasklist; 

CREATE DATABASE db_tasklist
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE db_tasklist;

-- Configuração da tabela de usuários
CREATE TABLE tb_users(
  user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  user_status ENUM('active','blocked') DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  UNIQUE(email)
);

-- Configuração da tabela de perfis de acesso
CREATE TABLE tb_roles(
  role_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO tb_roles(nome) VALUES
('Administrador'),
('Usuário');

-- Tabela de associação entre Usuário x Perfil de acesso
CREATE TABLE tb_user_roles(
  user_id BIGINT NOT NULL,
  role_id SMALLINT NOT NULL,
  PRIMARY KEY(user_id, role_id),
  FOREIGN KEY(user_id) REFERENCES tb_users(user_id) ON DELETE CASCADE,
  FOREIGN KEY(role_id) REFERENCES tb_roles(role_id) ON DELETE RESTRICT
);

-- Configuração da tabella de tarefas
CREATE TABLE tb_tasks(
  task_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descricao TEXT,
  prioridade ENUM('low','medium','high','urgent') NOT NULL,
  task_status ENUM('to_do','in_progress','done','archived') DEFAULT 'to_do',
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by BIGINT NULL,
  updated_by BIGINT NULL,
  FOREIGN KEY(created_by) REFERENCES tb_users(user_id) ON DELETE SET NULL,
  FOREIGN KEY(updated_by) REFERENCES tb_users(user_id) ON DELETE SET NULL,
  INDEX (task_status),
  INDEX (prioridade),
  INDEX (created_by)
);

-- Configuração da tabela de atribuição de tarefas a usuários e sua responsabilidade
CREATE TABLE tb_task_assignments(
  task_id BIGINT,
  user_id BIGINT,
  permissao ENUM('owner','editor','viewer') NOT NULL,
  assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(task_id, user_id),
  FOREIGN KEY(task_id) REFERENCES tb_tasks(task_id) ON DELETE CASCADE,
  FOREIGN KEY(user_id) REFERENCES tb_users(user_id) ON DELETE CASCADE
);


-- CREATE DATABASE audit_db;
-- USE audit_db;