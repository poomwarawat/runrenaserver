CREATE TABLE comments
(
  commentId int NOT NULL
  AUTO_INCREMENT,
  userId int NOT NULL,
  postId int NOT NULL,
  content TEXT,
  PRIMARY KEY
  (commentId)
);
