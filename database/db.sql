CREATE DATABASE esayline;

USE esayline;

CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(150) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

CREATE TABLE service (
  id INT(11) NOT NULL,
  serviceName VARCHAR(150) NOT NULL,
  price VARCHAR(255) NOT NULL,
  description TEXT,
  created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE service
  ADD PRIMARY KEY (id);

ALTER TABLE service
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE service;


CREATE TABLE customer(
  id INT(11) NOT NULL,
  customerName VARCHAR(150) NOT NULL,
  serviceName VARCHAR(150) NOT NULL,
  description text,
  created_at timestamp NOT NULL DEFAULT current_timestamp

)

ALTER TABLE customer
  ADD PRIMARY KEY (id);


ALTER TABLE customer
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

