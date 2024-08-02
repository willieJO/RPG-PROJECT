CREATE TABLE rolagem (
    id SERIAL PRIMARY KEY,
    tipo_dado VARCHAR(250),
    multiplicador VARCHAR(250), 
    soma VARCHAR(250),
    resultado VARCHAR(250),
    resultado_modificacao VARCHAR(250),
    jogada_numero INT,
    add_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT,
    CONSTRAINT FK_Rolagem_Usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(Id)
);
