CREATE TABLE post
(
  postId int NOT NULL
  AUTO_INCREMENT,
  activity_title TEXT NOT NULL,
  total_distance DECIMAL
  (6,3),
  pace_average DECIMAL
  (6,3),
  created_time TIMESTAMP NOT NULL,
  userId int NOT NULL,
  PRIMARY KEY
  (postId)
);




