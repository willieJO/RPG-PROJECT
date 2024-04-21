CREATE TABLE rolagem (
    `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `tipo_dado` varchar(250),
    `multiplicador` varchar(250), 
    `soma` varchar(250),
    `resultado` varchar(250),
    `resultado_modificacao` varchar(250),
    `jogada_numero` int(11),
    `add_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `usuario_id` INT(11),
	CONSTRAINT FK_Rolagem_Usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(Id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;