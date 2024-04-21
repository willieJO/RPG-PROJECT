CREATE TABLE Usuario (
    `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `Nome` varchar(250),
  `Senha` varchar(250),
  `Email` varchar(250) UNIQUE 
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


