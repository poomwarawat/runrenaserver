CREATE TABLE users
(
  userId int NOT NULL
  AUTO_INCREMENT,
  firstname TEXT,
  lastname varchar
  (255),
  birthday DATE,
  address TEXT,
  city TEXT,
  password TEXT,
  token TEXT,
  profileurl TEXT,
  PRIMARY KEY
  (userId)
);



