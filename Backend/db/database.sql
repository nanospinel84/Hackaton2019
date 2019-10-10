CREATE DATABASE IF NOT EXISTS HACKATHON;

USE HACKATHON;

CREATE TABLE USER (
  ID INT(11) NOT NULL AUTO_INCREMENT,
  USER_NAME VARCHAR(45) DEFAULT NULL,
  EMAIL VARCHAR(45) DEFAULT NULL,
  COMPANY VARCHAR(45) DEFAULT NULL,
  PASSWORD VARCHAR(45) DEFAULT NULL,
  IDENTITY_HASH VARCHAR(120) DEFAULT NULL, 
  PRIMARY KEY(ID)
);

DESCRIBE USER;

INSERT INTO USER values (null, 'rafael.espinel', 'rafael.espinel@davivienda.com', 'Davivienda', '12345', null),
  (null, 'diego.quintero', 'diego.quintero@davivienda.com', 'Davivienda', '12345', null),
  (null, 'charly.agudelo', 'charly.agudelo@davivienda.com', 'Davivienda', '12345', null);
SELECT * FROM user;
