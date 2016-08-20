CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  P_Id INT NOT NULL,
  Username varchar(255),
  Txt varchar(255),
  Room varchar(255),
  Created_At Datetime,
  U_Id INT, 
  R_Id INT,
  PRIMARY KEY (P_Id),
  FOREIGN KEY (U_Id) REFERENCES users(Id) ON DELETE CASCADE,
  FOREIGN KEY (R_Id) REFERENCES rooms(Id) ON DELETE CASCADE
);

CREATE TABLE users (
  Id INT NOT NULL,
  Name varchar(255),
  PRIMARY KEY(Id)  
);

CREATE TABLE rooms (
  Id int NOT NULL,
  RoomName varchar(255),
  PRIMARY KEY(Id)
);

CREATE TABLE friends (
  Id int NOT NULL,
  User1 int,
  User2 int,
  PRIMARY KEY (Id),
  FOREIGN KEY (User1) REFERENCES users (Id) ON DELETE CASCADE,
  FOREIGN KEY (User2) REFERENCES users (Id) ON DELETE CASCADE
);
/* Create other tables and define schemas f----------or them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

