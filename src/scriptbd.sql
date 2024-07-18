-- Active: 1720835792218@@mysql-boss-tarefaboss.a.aivencloud.com@11138@usuariocomumdb
CREATE TABLE
IF NOT EXISTS usuario_comum
(
    email_com VARCHAR
(70) NOT NULL,
    ocupacao VARCHAR
(90) NOT NULL,
    pais_origem VARCHAR
(90) NOT NULL,
    PRIMARY KEY
(email_com)
);

-- Tabela badge
CREATE TABLE
IF NOT EXISTS badge
(
    email_com VARCHAR
(70) NOT NULL,
    email_empr VARCHAR
(70) NOT NULL,
    id_badge INT NOT NULL,
    dt_emissao DATE NOT NULL,
    dt_vencimento DATE NULL,
    imagem_b VARCHAR
(70) NOT NULL,
    PRIMARY KEY
(email_com, email_empr, id_badge),
    FOREIGN KEY
(email_com) REFERENCES usuario_comum
(email_com)
    -- As chaves estrangeiras para `usuario_empresarial` e `modelo_badge` são assumidas como existentes em outras instâncias
);

-- Tabela usuarioc_testec
CREATE TABLE
IF NOT EXISTS usuarioc_testec
(
    email_com VARCHAR
(70) NOT NULL,
    id_teste INT NOT NULL,
    nota_teste TINYINT NOT NULL,
    dt_realizacao DATE NOT NULL,
    PRIMARY KEY
(email_com, id_teste),
    FOREIGN KEY
(email_com) REFERENCES usuario_comum
(email_com),
    CHECK
(nota_teste >= 0 AND nota_teste <= 100)
);
